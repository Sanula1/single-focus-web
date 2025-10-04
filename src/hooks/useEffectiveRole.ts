import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to compute the effective role based on selected institute's userRole
 * Falls back to user's global role if no institute is selected
 */
export const useEffectiveRole = (): string | undefined => {
  const { user, selectedInstitute } = useAuth();

  if (!selectedInstitute?.userRole) {
    return user?.role;
  }

  // Map backend instituteUserType to app role
  switch (selectedInstitute.userRole) {
    case 'INSTITUTE_ADMIN':
      return 'InstituteAdmin';
    case 'STUDENT':
      return 'Student';
    case 'TEACHER':
      return 'Teacher';
    case 'ATTENDANCE_MARKER':
      return 'AttendanceMarker';
    default:
      return user?.role;
  }
};
