import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Camera, QrCode, UserCheck, CheckCircle, MapPin, X, BarChart3, Smartphone, AlertCircle } from 'lucide-react';
import QrScanner from 'qr-scanner';
import { childAttendanceApi, MarkAttendanceByCardRequest, MarkAttendanceRequest } from '@/api/childAttendance.api';

interface AttendanceAlert {
  id: string;
  type: 'success' | 'error';
  studentName?: string;
  studentId?: string;
  status?: 'present' | 'absent' | 'late';
  message: string;
  timestamp: Date;
}

const QRAttendance = () => {
  const { selectedInstitute, currentInstituteId, user } = useAuth();
  const { toast } = useToast();
  
  const [studentId, setStudentId] = useState('');
  const [markedCount, setMarkedCount] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address: string } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [status, setStatus] = useState<'present' | 'absent' | 'late'>('present');
  const [attendanceAlerts, setAttendanceAlerts] = useState<AttendanceAlert[]>([]);
  const [showMethodDialog, setShowMethodDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'qr' | 'barcode' | 'rfid/nfc'>('qr');
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  // Check if user has permission - InstituteAdmin only
  const hasPermission = user?.role === 'InstituteAdmin';

  useEffect(() => {
    fetchLocation();

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
  }, [selectedInstitute]);

  // Auto remove alerts after 10 seconds
  useEffect(() => {
    if (attendanceAlerts.length > 0) {
      const timer = setTimeout(() => {
        setAttendanceAlerts(prev => prev.slice(1));
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [attendanceAlerts]);

  const addAlert = (alert: Omit<AttendanceAlert, 'id' | 'timestamp'>) => {
    const newAlert: AttendanceAlert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setAttendanceAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAttendanceAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const fetchLocation = async () => {
    setLocationLoading(true);
    console.log('Fetching location...');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('GPS coordinates:', { latitude, longitude });
          
          try {
            const address = await reverseGeocode(latitude, longitude);
            setLocation({ latitude, longitude, address });
            console.log('Location set:', { latitude, longitude, address });
          } catch (error) {
            console.log('Reverse geocoding failed, using generated address');
            const address = generateAddress();
            setLocation({ latitude, longitude, address });
          }
          setLocationLoading(false);
        },
        (error) => {
          console.log('Location access error:', error);
          const address = generateAddress();
          setLocation({ latitude: 0, longitude: 0, address });
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      console.log('Geolocation not supported');
      const address = generateAddress();
      setLocation({ latitude: 0, longitude: 0, address });
      setLocationLoading(false);
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      
      if (data && data.display_name) {
        return data.display_name;
      }
      throw new Error('No address found');
    } catch (error) {
      console.log('Reverse geocoding failed:', error);
      return generateAddress();
    }
  };

  const generateAddress = (): string => {
    let address = selectedInstitute?.name || 'Unknown Institute';
    address += ' - Gate Scanner - Main Entrance';
    return address;
  };

  const startCameraWithMethod = () => {
    setShowMethodDialog(true);
  };

  const startCameraForMethod = async (method: 'qr' | 'barcode' | 'rfid/nfc') => {
    setSelectedMethod(method);
    setShowMethodDialog(false);
    setIsScanning(true);
    
    // Wait for video element to be rendered
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  const startCamera = async () => {
    try {
      console.log('Starting camera...');
      setCameraError(null);
      
      if (!videoRef.current) {
        console.log('Video element not found, waiting...');
        setTimeout(() => startCamera(), 100);
        return;
      }

      if (qrScannerRef.current) {
        console.log('Stopping existing scanner...');
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }

      const hasCamera = await QrScanner.hasCamera();
      console.log('Camera available:', hasCamera);
      
      if (!hasCamera) {
        throw new Error('No camera found on this device');
      }

      console.log('Initializing QR Scanner...');

      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('QR/Barcode detected:', result.data);
          handleMarkAttendanceByCard(result.data);
        },
        {
          returnDetailedScanResult: true,
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 3,
          calculateScanRegion: (video) => {
            const smallerDimension = Math.min(video.videoWidth, video.videoHeight);
            const scanRegionSize = Math.round(0.7 * smallerDimension);
            return {
              x: Math.round((video.videoWidth - scanRegionSize) / 2),
              y: Math.round((video.videoHeight - scanRegionSize) / 2),
              width: scanRegionSize,
              height: scanRegionSize,
            };
          },
        }
      );

      console.log('Starting QR scanner...');
      await qrScannerRef.current.start();
      
      setCameraError(null);
      console.log('QR Scanner started successfully');

      addAlert({
        type: 'success',
        message: `Camera started - Point at ${selectedMethod.toUpperCase()} code to scan`
      });

    } catch (error) {
      console.error('Camera start error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown camera error';
      setCameraError(errorMessage);
      setIsScanning(false);
      
      addAlert({
        type: 'error',
        message: `Camera failed: ${errorMessage}`
      });
    }
  };

  const stopCamera = () => {
    try {
      console.log('Stopping camera...');
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
      
      setIsScanning(false);
      setCameraError(null);
      console.log('Camera stopped successfully');
    } catch (error) {
      console.error('Error stopping camera:', error);
    }
  };

  const handleMarkAttendanceByCard = async (studentCardId: string) => {
    if (!studentCardId.trim() || !currentInstituteId || !selectedInstitute?.name) {
      addAlert({
        type: 'error',
        message: 'Missing information - ensure student card ID and institute are selected'
      });
      return;
    }

    if (!location) {
      addAlert({
        type: 'error',
        message: 'Location required - please allow location access'
      });
      return;
    }

    try {
      const request: MarkAttendanceByCardRequest = {
        studentCardId: studentCardId.trim(),
        instituteId: currentInstituteId,
        instituteName: selectedInstitute.name,
        address: location.address,
        markingMethod: selectedMethod,
        status: status
      };

      console.log('Marking attendance by card with request:', request);

      const result = await childAttendanceApi.markAttendanceByCard(request);

      if (result.success) {
        setMarkedCount(prev => prev + 1);
        
        addAlert({
          type: 'success',
          studentName: result.studentName,
          studentId: result.studentId,
          status: status,
          message: `${result.studentName} marked as ${status}`
        });

        // Briefly pause scanning to prevent duplicate scans
        if (qrScannerRef.current) {
          qrScannerRef.current.stop();
          setTimeout(() => {
            if (qrScannerRef.current && isScanning) {
              qrScannerRef.current.start();
            }
          }, 2000);
        }
      } else {
        throw new Error(result.message || 'Failed to mark attendance');
      }
    } catch (error) {
      console.error('Failed to mark attendance by card:', error);
      addAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to mark attendance'
      });
    }
  };

  const handleManualMarkAttendance = async () => {
    if (!studentId.trim() || !currentInstituteId || !selectedInstitute?.name) {
      addAlert({
        type: 'error',
        message: 'Please enter student ID and ensure institute is selected'
      });
      return;
    }

    if (!location) {
      addAlert({
        type: 'error',
        message: 'Location required - please allow location access'
      });
      return;
    }

    try {
      const request: MarkAttendanceRequest = {
        studentId: studentId.trim(),
        instituteId: currentInstituteId,
        instituteName: selectedInstitute.name,
        classId: "CLS001",
        className: "General",
        subjectId: "SUB001",
        subjectName: "General",
        address: location.address,
        markingMethod: 'manual',
        status: status
      };

      console.log('Marking attendance manually with request:', request);

      const result = await childAttendanceApi.markAttendance(request);

      if (result.success) {
        setMarkedCount(prev => prev + 1);
        setStudentId('');
        
        addAlert({
          type: 'success',
          studentName: `Student ${studentId}`,
          studentId: studentId,
          status: status,
          message: `Student ${studentId} marked as ${status}`
        });

        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      } else {
        throw new Error(result.message || 'Failed to mark attendance');
      }
    } catch (error) {
      console.error('Failed to mark attendance manually:', error);
      addAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to mark attendance'
      });
    }
  };

  const handleBack = () => {
    stopCamera();
    window.history.back();
  };

  if (!hasPermission) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Access Denied</h3>
            <p className="text-muted-foreground">
              You don't have permission to mark attendance. This feature is only available for Institute Admins.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedInstitute) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Institute Selection Required</h3>
            <p className="text-muted-foreground">
              Please select an institute first to mark attendance.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Attendance Alerts */}
      <div className="fixed top-4 left-4 right-4 z-50 space-y-2 max-w-md mx-auto">
        {attendanceAlerts.map((alert) => (
          <Alert 
            key={alert.id}
            className={`shadow-lg animate-in slide-in-from-top-5 ${
              alert.type === 'success' 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${
                alert.type === 'success' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'
              }`}>
                {alert.type === 'success' ? (
                  <CheckCircle className={`h-5 w-5 ${alert.type === 'success' ? 'text-green-600 dark:text-green-200' : 'text-red-600 dark:text-red-200'}`} />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-200" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-semibold ${
                    alert.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                    {alert.type === 'success' ? 'Success' : 'Error'}
                  </h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => removeAlert(alert.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <AlertDescription className={`${
                  alert.type === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                } mt-1`}>
                  <div className="text-sm">{alert.message}</div>
                  {alert.studentName && (
                    <div className="text-xs mt-1 flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {alert.status}
                      </Badge>
                      <span className="opacity-75">
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </div>

      <div className="container mx-auto p-4 space-y-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">QR Scanner</h1>
            <p className="text-muted-foreground text-sm">
              Scan QR codes to mark student attendance
            </p>
          </div>
        </div>

        {/* Current Selection Card */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100 text-lg">
              <QrCode className="h-5 w-5" />
              Current Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Institute</p>
                <p className="text-blue-900 dark:text-blue-100">{selectedInstitute?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Status</p>
                <Select value={status} onValueChange={(value) => setStatus(value as 'present' | 'absent' | 'late')}>
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {location && (
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Location</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 break-words">{location.address}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Today's Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{markedCount}</p>
                <p className="text-sm text-muted-foreground">Marked</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{status}</p>
                <p className="text-sm text-muted-foreground">Current Status</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{selectedMethod.toUpperCase()}</p>
                <p className="text-sm text-muted-foreground">Method</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Scanner Section - Made Much Bigger */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Camera className="h-7 w-7" />
              Scan QR
            </CardTitle>
            <CardDescription className="text-lg">
              Position code within the frame
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isScanning ? (
              <div className="space-y-6">
                <div className="text-center py-16">
                  <Camera className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
                  <p className="text-xl font-medium mb-3">Ready to Scan</p>
                  <p className="text-muted-foreground mb-8 text-lg">Start camera to begin scanning QR codes</p>
                  <Button 
                    onClick={startCameraWithMethod} 
                    className="w-full max-w-sm text-lg py-6"
                    size="lg"
                  >
                    <Camera className="h-6 w-6 mr-3" />
                    Start Camera
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* Mobile Responsive Camera View */}
                <div className="relative w-full h-[70vh] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />
                  {cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-center text-white p-4 sm:p-8">
                        <AlertCircle className="h-8 w-8 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-6" />
                        <p className="text-base sm:text-xl">{cameraError}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Mobile Responsive Scanning Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {/* Mobile: smaller frame, Desktop: larger frame */}
                      <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 border-2 sm:border-4 border-white/70 rounded-2xl sm:rounded-3xl shadow-lg">
                        {/* Corner indicators - responsive sizes */}
                        <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-12 sm:h-12 border-t-4 border-l-4 sm:border-t-8 sm:border-l-8 border-white rounded-tl-2xl sm:rounded-tl-3xl"></div>
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-12 sm:h-12 border-t-4 border-r-4 sm:border-t-8 sm:border-r-8 border-white rounded-tr-2xl sm:rounded-tr-3xl"></div>
                        <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-12 sm:h-12 border-b-4 border-l-4 sm:border-b-8 sm:border-l-8 border-white rounded-bl-2xl sm:rounded-bl-3xl"></div>
                        <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-12 sm:h-12 border-b-4 border-r-4 sm:border-b-8 sm:border-r-8 border-white rounded-br-2xl sm:rounded-br-3xl"></div>
                        
                        {/* Center crosshair - responsive sizes */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-4 h-0.5 sm:w-8 sm:h-1 bg-white/90 rounded-full"></div>
                          <div className="w-0.5 h-4 sm:w-1 sm:h-8 bg-white/90 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Instruction text - responsive positioning and sizing */}
                    <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center px-4">
                      <div className="bg-black/70 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl mx-auto max-w-fit">
                        <p className="text-sm sm:text-lg font-medium">Position QR code within the frame</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center px-4">
                  <Button 
                    onClick={stopCamera} 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto sm:min-w-[250px] text-base sm:text-lg py-4 sm:py-6"
                  >
                    Stop Camera
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Entry - Separate section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Manual Entry
            </CardTitle>
            <CardDescription>
              Enter student ID manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                ref={inputRef}
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleManualMarkAttendance();
                  }
                }}
              />
            </div>
            
            <Button 
              onClick={handleManualMarkAttendance}
              className="w-full"
              disabled={!studentId.trim()}
              size="lg"
            >
              <UserCheck className="h-5 w-5 mr-2" />
              Mark Attendance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Method Selection Dialog */}
      <Dialog open={showMethodDialog} onOpenChange={setShowMethodDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Scanning Method</DialogTitle>
            <DialogDescription>
              Choose the type of code you want to scan
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3">
            <Button 
              onClick={() => startCameraForMethod('qr')}
              variant="outline"
              className="justify-start h-auto p-4"
            >
              <QrCode className="h-8 w-8 mr-3" />
              <div className="text-left">
                <div className="font-medium">QR Code</div>
                <div className="text-sm text-muted-foreground">Scan QR codes</div>
              </div>
            </Button>
            <Button 
              onClick={() => startCameraForMethod('barcode')}
              variant="outline"
              className="justify-start h-auto p-4"
            >
              <BarChart3 className="h-8 w-8 mr-3" />
              <div className="text-left">
                <div className="font-medium">Barcode</div>
                <div className="text-sm text-muted-foreground">Scan barcodes</div>
              </div>
            </Button>
            <Button 
              onClick={() => startCameraForMethod('rfid/nfc')}
              variant="outline"
              className="justify-start h-auto p-4"
            >
              <Smartphone className="h-8 w-8 mr-3" />
              <div className="text-left">
                <div className="font-medium">RFID/NFC</div>
                <div className="text-sm text-muted-foreground">Scan RFID or NFC tags</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRAttendance;