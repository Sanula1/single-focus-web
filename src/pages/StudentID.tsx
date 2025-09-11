import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, 
  Button,
  Alert, AlertDescription
} from '@/components/ui/alert';
import { 
  Wifi, 
  Smartphone, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Hash, 
  Shield, 
  Zap,
  CreditCard,
  Nfc,
  QrCode,
  Download,
  Share2,
  Eye,
  Settings,
  Star,
  CheckCircle,
  Radio,
  Globe,
  Copy,
  ExternalLink
} from 'lucide-react';

const StudentIDCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isNfcActive, setIsNfcActive] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Student data - this would come from your LMS database
  const studentData = {
    id: "SLK-2024-CS-0847",
    name: "Amara Dilshan",
    email: "amara.dilshan@surakshalms.edu.lk",
    phone: "+94 77 234 5678",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    faculty: "Faculty of Computing",
    university: "SurakshaLMS Institute",
    validUntil: "Dec 2026",
    issueDate: "Jan 2024",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    cardImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop", // Credit card style background
    nfcId: "NFC_847_2024",
    status: "active",
    permissions: ["library", "cafeteria", "lab_access", "parking", "gym"],
    studentUrl: `${window.location.origin}/student/amara-dilshan-847`
  };

  // Simulate NFC tap
  const handleNfcTap = () => {
    setTapCount(prev => prev + 1);
    setIsNfcActive(true);
    setGlowEffect(true);
    
    setTimeout(() => {
      setIsNfcActive(false);
      setGlowEffect(false);
    }, 2000);

    // Simulate NFC verification
    setTimeout(() => {
      alert('✅ Student verified successfully!\nAccess granted to campus facilities.');
    }, 500);
  };

  const copyStudentUrl = () => {
    navigator.clipboard.writeText(studentData.studentUrl);
    alert('Student URL copied to clipboard!');
  };

  const downloadCard = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = studentData.cardImage;
    link.download = `${studentData.name.replace(' ', '_')}_Student_ID.png`;
    link.click();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowEffect(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              SurakshaLMS Digital ID
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Next-Generation Student Identification System</p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Student ID Card Display */}
          <div className="relative">
            <div className="perspective-1000">
              <div 
                className={`relative w-full max-w-md mx-auto transition-transform duration-700 preserve-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                } ${glowEffect ? 'animate-pulse' : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                
                {/* Front of Card */}
                <div className={`relative backface-hidden ${glowEffect ? 'ring-4 ring-blue-400/50 ring-offset-4 ring-offset-slate-900' : ''}`}>
                  <div className="relative">
                    {/* Card Background Image */}
                    <img 
                      src={studentData.cardImage}
                      alt="Student ID Card"
                      className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    />
                    
                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent rounded-2xl p-6 flex flex-col justify-between">
                      
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <img 
                            src={studentData.photo}
                            alt={studentData.name}
                            className="w-12 h-12 rounded-full border-2 border-white/50 object-cover"
                          />
                          <div>
                            <h3 className="text-white font-bold text-lg">{studentData.name}</h3>
                            <p className="text-white/80 text-sm">{studentData.course}</p>
                          </div>
                        </div>
                        
                        {/* NFC Icon */}
                        <div className={`p-2 rounded-full transition-all duration-300 ${
                          isNfcActive ? 'bg-green-500 animate-ping' : 'bg-white/20 hover:bg-white/30'
                        }`}>
                          <Nfc className={`w-5 h-5 ${isNfcActive ? 'text-white' : 'text-white/80'}`} />
                        </div>
                      </div>

                      {/* Card Number Style */}
                      <div className="text-center">
                        <div className="text-white font-mono text-xl tracking-widest mb-2">
                          {studentData.id.replace(/-/g, ' ')}
                        </div>
                        <div className="text-white/60 text-sm">
                          Valid Until {studentData.validUntil}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/60 text-xs uppercase">Faculty</p>
                          <p className="text-white font-medium text-sm">{studentData.faculty}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-xs uppercase">Year</p>
                          <p className="text-white font-bold text-lg">{studentData.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="w-full h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 flex flex-col justify-center">
                    <div className="text-center mb-6">
                      <h3 className="text-white font-bold text-lg mb-2">Access Permissions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {studentData.permissions.map((permission, index) => (
                          <Badge key={index} className="bg-green-500/20 text-green-300 border-green-500/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* QR Code Placeholder */}
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-black" />
                      </div>
                    </div>
                    
                    <p className="text-center text-white/60 text-xs mt-2">
                      Scan for quick verification
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tap Counter */}
            <div className="text-center mt-4">
              <p className="text-white/60 text-sm">
                NFC Taps: <span className="text-green-400 font-bold">{tapCount}</span>
              </p>
            </div>
          </div>

          {/* Student Information & Controls */}
          <div className="space-y-6">
            
            {/* Student Info Card */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-400" />
                  Student Profile
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">ID:</span>
                    <span className="font-mono">{studentData.id}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Email:</span>
                    <span>{studentData.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Phone:</span>
                    <span>{studentData.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Course:</span>
                    <span>{studentData.course}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Valid Until:</span>
                    <span>{studentData.validUntil}</span>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active Status
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* NFC Tap Button */}
              <Button 
                onClick={handleNfcTap}
                className={`relative overflow-hidden transition-all duration-300 ${
                  isNfcActive 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                }`}
                size="lg"
              >
                {isNfcActive && (
                  <div className="absolute inset-0 bg-white/20 animate-ping" />
                )}
                <Radio className={`w-5 h-5 mr-2 ${isNfcActive ? 'animate-spin' : ''}`} />
                {isNfcActive ? 'Verifying...' : 'NFC Tap'}
              </Button>

              {/* Download Card */}
              <Button 
                onClick={downloadCard}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>

              {/* Show QR Code */}
              <Button 
                onClick={() => setShowQR(!showQR)}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                size="lg"
              >
                <QrCode className="w-5 h-5 mr-2" />
                QR Code
              </Button>

              {/* Share Profile */}
              <Button 
                onClick={copyStudentUrl}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                size="lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Student URL Display */}
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Globe className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">{studentData.studentUrl}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={copyStudentUrl}
                    className="text-blue-300 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            {/* QR Code Display */}
            {showQR && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-black" />
                  </div>
                  <p className="text-white/80 text-sm">
                    Scan to verify student identity
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Features List */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Digital ID Features
                </h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Nfc className="w-4 h-4 text-blue-400" />
                    <span>NFC Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-green-400" />
                    <span>QR Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    <span>Secure Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>Mobile Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Web Portal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Instant Verify</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60">
            Powered by <span className="text-blue-400 font-semibold">SurakshaLMS</span> - 
            Next Generation Learning Management System
          </p>
        </footer>
      </div>

      {/* Custom CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default StudentIDCard;