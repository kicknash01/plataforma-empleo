import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../interfaces/auth.interfaces';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  clearUser: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearUser: () => set({ user: null }),

      logout: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
