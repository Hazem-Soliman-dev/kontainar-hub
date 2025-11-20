"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserRole } from "../mock/db";
import type { SubscriptionSnapshot } from "../mock/subscriptions";

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
  subscription: SubscriptionSnapshot | null;
  dashboardPath: string | null;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  setAuth: (payload: {
    user: AuthUser;
    token: string;
    subscription: SubscriptionSnapshot;
    dashboardPath: string;
  }) => void;
  updateUser: (payload: Partial<AuthUser>) => void;
  updateSubscription: (payload: SubscriptionSnapshot | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      subscription: null,
      dashboardPath: null,
      _hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
      setAuth: ({ user, token, subscription, dashboardPath }) =>
        set({
          user,
          token,
          isAuthenticated: true,
          subscription,
          dashboardPath,
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
      updateSubscription: (payload) => {
        set((state) => ({
          ...state,
          subscription: payload,
        }));
        // Persist middleware will automatically save to localStorage
      },
      setToken: (token) =>
        set((state) => ({
          ...state,
          token,
          isAuthenticated: Boolean(token && state.user),
        })),
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          subscription: null,
          dashboardPath: null,
        });
        // Persist middleware will automatically clear localStorage
      },
    }),
    {
      name: "kontainar-auth",
      partialize: (state) => ({
        subscription: state.subscription,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      skipHydration: true, // Skip automatic hydration to avoid SSR mismatch
      onRehydrateStorage: () => (state) => {
        // Set hydration flag when storage is rehydrated
        state?.setHasHydrated(true);
      },
    }
  )
);
