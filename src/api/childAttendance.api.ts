import { attendanceApiClient } from './attendanceClient';
import { getAttendanceUrl, getApiHeaders } from '@/contexts/utils/auth.api';

export interface ChildAttendanceRecord {
  attendanceId: string;
  studentId: string;
  studentName: string;
  instituteName: string;
  className: string;
  subjectName: string;
  address: string;
  markedBy: string;
  markedAt: string;
  markingMethod: string;
  status: 'present' | 'absent' | 'late';
}

export interface ChildAttendanceResponse {
  success: boolean;
  message: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  data: ChildAttendanceRecord[];
  summary: {
    totalPresent: number;
    totalAbsent: number;
    totalLate: number;
    attendanceRate: number;
  };
}

export interface ChildAttendanceParams {
  studentId: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface MarkAttendanceByCardRequest {
  studentCardId: string;
  instituteId: string;
  instituteName: string;
  address: string;
  markingMethod: 'qr' | 'barcode' | 'rfid/nfc';
  status: 'present' | 'absent' | 'late';
}

export interface MarkAttendanceByCardResponse {
  success: boolean;
  message: string;
  attendanceId: string;
  studentId: string;
  studentCardId: string;
  studentName: string;
}

export interface MarkAttendanceRequest {
  studentId: string;
  instituteId: string;
  instituteName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  address: string;
  markingMethod: 'manual';
  status: 'present' | 'absent' | 'late';
}

export interface MarkAttendanceResponse {
  success: boolean;
  message: string;
  attendanceId: string;
}

class ChildAttendanceApi {
  async getChildAttendance(params: ChildAttendanceParams): Promise<ChildAttendanceResponse> {
    const { studentId, ...queryParams } = params;
    
    const defaultParams = {
      startDate: '2025-09-01',
      endDate: '2025-09-07',
      page: 1,
      limit: 5,
      ...queryParams
    };

    console.log('Fetching child attendance for student:', studentId, 'with params:', defaultParams);

    return attendanceApiClient.get<ChildAttendanceResponse>(
      `/api/attendance/student/${studentId}`,
      defaultParams,
      {
        forceRefresh: false,
        ttl: 60, // Cache for 1 minute
        useStaleWhileRevalidate: true
      }
    );
  }

  async markAttendanceByCard(request: MarkAttendanceByCardRequest): Promise<MarkAttendanceByCardResponse> {
    const attendanceBaseUrl = getAttendanceUrl();
    if (!attendanceBaseUrl) {
      throw new Error('Attendance URL not configured. Please set the attendance URL in settings.');
    }

    const baseUrl = attendanceBaseUrl.endsWith('/') ? attendanceBaseUrl.slice(0, -1) : attendanceBaseUrl;
    const fullApiUrl = `${baseUrl}/api/attendance/mark-by-card`;
    
    console.log('Marking attendance by card with request:', request);
    console.log('Calling attendance API at:', fullApiUrl);

    const response = await fetch(fullApiUrl, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Mark attendance by card API error response:', errorText);
      throw new Error(`Failed to mark attendance by card: ${response.status} - ${errorText}`);
    }

    const result: MarkAttendanceByCardResponse = await response.json();
    console.log('Attendance marked by card successfully:', result);
    return result;
  }

  async markAttendance(request: MarkAttendanceRequest): Promise<MarkAttendanceResponse> {
    const attendanceBaseUrl = getAttendanceUrl();
    if (!attendanceBaseUrl) {
      throw new Error('Attendance URL not configured. Please set the attendance URL in settings.');
    }

    const baseUrl = attendanceBaseUrl.endsWith('/') ? attendanceBaseUrl.slice(0, -1) : attendanceBaseUrl;
    const fullApiUrl = `${baseUrl}/api/attendance/mark`;
    
    console.log('Marking attendance with request:', request);
    console.log('Calling attendance API at:', fullApiUrl);

    const response = await fetch(fullApiUrl, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Mark attendance API error response:', errorText);
      throw new Error(`Failed to mark attendance: ${response.status} - ${errorText}`);
    }

    const result: MarkAttendanceResponse = await response.json();
    console.log('Attendance marked successfully:', result);
    return result;
  }
}

export const childAttendanceApi = new ChildAttendanceApi();