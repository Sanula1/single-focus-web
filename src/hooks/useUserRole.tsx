import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'ADMIN' | 'MEMBER' | 'MODERATOR' | 'PRESIDENT';

interface Organization {
  organizationId: string;
  role: UserRole;
}

interface User {
  id: string;
  email: string;
  name: string;
  organizations: Organization[];
}

interface UserRoleStore {
  user: User | null;
  backendUrl: string;
  accessToken: string;
  refreshToken: string;
  setUser: (user: User) => void;
  setBackendUrl: (url: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  getCurrentRole: (organizationId?: string) => UserRole | null;
}

export const useUserRole = create<UserRoleStore>()(
  persist(
    (set, get) => ({
      user: null,
      backendUrl: '',
      accessToken: '',
      refreshToken: '',
      setUser: (user) => set({ user }),
      setBackendUrl: (url) => set({ backendUrl: url }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: '', refreshToken: '' }),
      getCurrentRole: (organizationId) => {
        const { user } = get();
        if (!user || !organizationId) return null;
        const org = user.organizations.find(o => o.organizationId === organizationId);
        return org?.role || null;
      },
    }),
    {
      name: 'user-store',
    }
  )
);
