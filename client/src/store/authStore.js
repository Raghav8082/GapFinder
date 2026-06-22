import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isAuthLoading: true, // true while we check if a session exists on app load

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),

  loginSuccess: ({ user, accessToken }) => set({ user, accessToken, isAuthLoading: false }),

  logout: () => set({ user: null, accessToken: null, isAuthLoading: false }),

  isLoggedIn: () => !!get().accessToken,
}));
