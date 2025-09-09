import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Users, MapPin, Calendar, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DataTable from '@/components/ui/data-table';
import { instituteStudentsApi, StudentAttendanceRecord, StudentAttendanceResponse } from '@/api/instituteStudents.api';
import { childAttendanceApi, ChildAttendanceRecord } from '@/api/childAttendance.api';

const Attendance = () => {
  const { selectedInstitute, selectedClass, selectedSubject, currentInstituteId, currentClassId, currentSubjectId, user } = useAuth();
  const { toast } = useToast();
  
  const [studentAttendanceRecords, setStudentAttendanceRecords] = useState<StudentAttendanceRecord[]>([]);
  const [childAttendanceRecords, setChildAttendanceRecords] = useState<ChildAttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Check permissions and get view type based on role and context
  const getPermissionInfo = () => {
    const userRole = user?.userType;
    
    // Student - View their own attendance
    if (userRole === 'STUDENT') {
      return {
        hasPermission: true,
        title: 'My Attendance Records',
        viewType: 'student',
        description: 'View your attendance records'
      };
    }
    
    // 1. InstituteAdmin only - Institute level attendance (Institute only selected)
    if (userRole === 'INSTITUTE_ADMIN' && currentInstituteId && !currentClassId) {
      return {
        hasPermission: true,
        title: 'Institute Student Attendance Overview',
        viewType: 'institute',
        description: 'View all students attendance records for the selected institute'
      };
    }
    
    // 2. InstituteAdmin and Teacher - Class attendance (Institute + Class selected)
    if ((userRole === 'INSTITUTE_ADMIN' || userRole === 'TEACHER') && 
        currentInstituteId && currentClassId && !currentSubjectId) {
      return {
        hasPermission: true,
        title: 'Class Student Attendance Overview',
        viewType: 'class',
        description: 'View student attendance records for the selected class'
      };
    }
    
    // 3. InstituteAdmin and Teacher - Subject attendance (Institute + Class + Subject selected)
    if ((userRole === 'INSTITUTE_ADMIN' || userRole === 'TEACHER') && 
        currentInstituteId && currentClassId && currentSubjectId) {
      return {
        hasPermission: true,
        title: 'Subject Student Attendance Overview',
        viewType: 'subject',
        description: 'View student attendance records for the selected subject'
      };
    }
    
    return {
      hasPermission: false,
      title: 'Student Attendance Records',
      viewType: 'none',
      description: 'Select the required context to view attendance records'
    };
  };

  const { hasPermission, title, viewType, description } = getPermissionInfo();

  const loadStudentAttendanceData = async () => {
    if (!hasPermission) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view attendance records or required selections are missing.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log('Loading attendance data for view type:', viewType);
    
    try {
      if (viewType === 'student' && user?.id) {
        // Load student's own attendance
        const result = await childAttendanceApi.getChildAttendance({
          studentId: user.id,
          startDate: '2025-09-01',
          endDate: '2025-09-07',
          page: currentPage,
          limit: itemsPerPage
        });

        console.log('Child attendance data loaded successfully:', result);
        
        setChildAttendanceRecords(result.data || []);
        setTotalItems(result.pagination.totalRecords || 0);
        setTotalPages(result.pagination.totalPages || 1);
        setDataLoaded(true);
        
        toast({
          title: "Data Loaded",
          description: `Successfully loaded ${result.data?.length || 0} attendance records.`
        });
      } else {
        // Admin/Teacher views
        if (!currentInstituteId) {
          toast({
            title: "Missing Selection",
            description: "Please select an institute to view attendance records.",
            variant: "destructive"
          });
          return;
        }

        let result: StudentAttendanceResponse;
        
        const params = {
          page: currentPage,
          limit: itemsPerPage
        };

        // Call appropriate API based on view type
        if (viewType === 'institute') {
          result = await instituteStudentsApi.getInstituteStudentAttendance(currentInstituteId, params);
        } else if (viewType === 'class' && currentClassId) {
          result = await instituteStudentsApi.getClassStudentAttendance(currentInstituteId, currentClassId, params);
        } else if (viewType === 'subject' && currentClassId && currentSubjectId) {
          result = await instituteStudentsApi.getSubjectStudentAttendance(currentInstituteId, currentClassId, currentSubjectId, params);
        } else {
          throw new Error('Invalid view configuration');
        }

        console.log('Student attendance data loaded successfully:', result);
        
        setStudentAttendanceRecords(result.data || []);
        setTotalItems(result.pagination.totalRecords || 0);
        setTotalPages(result.pagination.totalPages || 1);
        setDataLoaded(true);
        
        toast({
          title: "Data Loaded",
          description: `Successfully loaded ${result.data?.length || 0} student attendance records.`
        });
      }
    } catch (error) {
      console.error('Failed to load attendance data:', error);
      
      // Check if it's a configuration error
      const errorMessage = error instanceof Error ? error.message : "Failed to load attendance data from server.";
      
      if (errorMessage.includes('No API base URL configured')) {
        toast({
          title: "Configuration Required",
          description: "Please configure your API settings in Settings page first.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Load Failed",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (dataLoaded) {
      loadStudentAttendanceData();
    }
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
    if (dataLoaded) {
      loadStudentAttendanceData();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCurrentSelection = () => {
    if (viewType === 'student') {
      const selections = [];
      if (selectedInstitute) selections.push(`Institute: ${selectedInstitute.name}`);
      return selections.join(', ') || 'No Institute Selected';
    }
    
    const selections = [];
    if (selectedInstitute) selections.push(`Institute: ${selectedInstitute.name}`);
    if (selectedClass) selections.push(`Class: ${selectedClass.name}`);
    if (selectedSubject) selections.push(`Subject: ${selectedSubject.name}`);
    return selections.join(', ');
  };

  // Define columns for attendance data table
  const getColumns = () => {
    if (viewType === 'student') {
      // Student view - show their attendance records
      return [
        {
          key: 'attendanceId',
          header: 'Attendance ID',
          render: (value: string) => (
            <span className="font-mono text-xs text-muted-foreground">{value}</span>
          )
        },
        {
          key: 'instituteName',
          header: 'Institute',
          render: (value: string) => (
            <span className="font-medium text-foreground">{value}</span>
          )
        },
        {
          key: 'className',
          header: 'Class',
          render: (value: string) => (
            <span className="text-muted-foreground">{value || '-'}</span>
          )
        },
        {
          key: 'subjectName',
          header: 'Subject',
          render: (value: string) => (
            <span className="text-muted-foreground">{value || '-'}</span>
          )
        },
        {
          key: 'status',
          header: 'Status',
          render: (value: string) => (
            <Badge
              variant={value === 'present' ? 'default' : value === 'absent' ? 'destructive' : 'secondary'}
            >
              {value?.charAt(0).toUpperCase() + value?.slice(1) || 'Unknown'}
            </Badge>
          )
        },
        {
          key: 'markedAt',
          header: 'Marked At',
          render: (value: string) => (
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">{formatDate(value)}</div>
              <div className="text-xs text-muted-foreground">{formatTime(value)}</div>
            </div>
          )
        },
        {
          key: 'markedBy',
          header: 'Marked By',
          render: (value: string) => (
            <span className="text-sm text-muted-foreground">{value || 'System'}</span>
          )
        },
        {
          key: 'markingMethod',
          header: 'Method',
          render: (value: string) => (
            <Badge variant="outline">
              {value?.toUpperCase() || 'UNKNOWN'}
            </Badge>
          )
        },
        {
          key: 'address',
          header: 'Address',
          render: (value: string) => (
            <span className="text-sm text-muted-foreground">{value || 'N/A'}</span>
          )
        }
      ];
    }

    // Admin/Teacher views
    const baseColumns = [
      {
        key: 'studentId',
        header: 'Student ID',
        render: (value: string) => (
          <span className="font-medium text-foreground">{value}</span>
        )
      },
      {
        key: 'studentName',
        header: 'Student Name',
        render: (value: string) => (
          <span className="font-medium text-foreground">{value}</span>
        )
      },
      {
        key: 'studentDetails',
        header: 'Email',
        render: (value: any) => (
          <span className="text-muted-foreground">{value?.email || '-'}</span>
        )
      },
      {
        key: 'studentDetails',
        header: 'Phone',
        render: (value: any) => (
          <span className="text-muted-foreground">{value?.phoneNumber || '-'}</span>
        )
      }
    ];

    // Add class name column if we're viewing institute level
    if (viewType === 'institute' || viewType === 'subject') {
      baseColumns.push({
        key: 'className',
        header: 'Class',
        render: (value: string) => (
          <span className="text-muted-foreground">{value || '-'}</span>
        )
      });
    }

    // Add subject name column if we're viewing class level
    if (viewType === 'class') {
      baseColumns.push({
        key: 'subjectName',
        header: 'Subject',
        render: (value: string) => (
          <span className="text-muted-foreground">{value || '-'}</span>
        )
      });
    }

    // Add attendance info columns
    baseColumns.push(
      {
        key: 'attendanceCount',
        header: 'Total Attendance',
        render: (value: string | number) => (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {value} days
          </Badge>
        )
      },
      {
        key: 'lastAttendanceDate',
        header: 'Last Attendance',
        render: (value: string) => (
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">{formatDate(value)}</div>
            <div className="text-xs text-muted-foreground">{formatTime(value)}</div>
          </div>
        )
      },
      {
        key: 'studentDetails',
        header: 'Location',
        render: (value: any) => (
          <div className="text-sm text-muted-foreground">
            <div>{value?.city || '-'}</div>
            <div className="text-xs">{value?.district || ''}</div>
          </div>
        )
      }
    );

    return baseColumns;
  };

  if (!hasPermission) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Access Denied or Missing Selection
            </h3>
            <p className="text-muted-foreground mb-4">
              Please select the required context to view attendance records:
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Institute Admin:</strong> Select Institute only for institute-level attendance</p>
              <p><strong>Institute Admin/Teacher:</strong> Select Institute + Class for class-level attendance</p>
              <p><strong>Institute Admin/Teacher:</strong> Select Institute + Class + Subject for subject-level attendance</p>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Current Selection: {getCurrentSelection() || 'None'}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dataLoaded) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {title}
          </h1>
          
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Current Selection:</span>
            </div>
            <p className="text-foreground font-medium">{getCurrentSelection()}</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">View Type:</span>
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">API Configuration</span>
            </div>
            <p className="text-amber-700 text-sm">
              If you get a 404 error, please configure your API Base URL in Settings. 
              For local development, use http://localhost:3000
            </p>
          </div>
          
          <Button 
            onClick={loadStudentAttendanceData} 
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Loading Data...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                View Attendance
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {title}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Current Selection: {getCurrentSelection()}
            </p>
          </div>
        </div>
        <Button 
          onClick={loadStudentAttendanceData} 
          disabled={isLoading}
          variant="outline"
          className="shrink-0"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </>
          )}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">View Type</p>
                <p className="text-lg font-medium text-foreground capitalize">{viewType} Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Page</p>
                <p className="text-lg font-medium text-foreground">{currentPage} of {totalPages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        title=""
        data={viewType === 'student' ? childAttendanceRecords : studentAttendanceRecords}
        columns={getColumns()}
        allowAdd={false}
        allowEdit={false}
        allowDelete={false}
        currentPage={currentPage}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Attendance;