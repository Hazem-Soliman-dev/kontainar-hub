import { create } from "zustand";

import type { UserRole } from "../mock/db";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  businessName: string;
  businessType: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (payload: { user: AuthUser; token: string }) => void;
  updateUser: (payload: Partial<AuthUser>) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: ({ user, token }) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),
  updateUser: (payload) =>
    set((state) => {
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    }),
  setToken: (token) =>
    set((state) => ({
      ...state,
      token,
      isAuthenticated: Boolean(token && state.user),
    })),
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),
}));
