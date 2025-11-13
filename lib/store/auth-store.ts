"use client";

import { create } from "zustand";

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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  subscription: null,
  dashboardPath: null,
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
  updateSubscription: (payload) =>
    set((state) => ({
      ...state,
      subscription: payload,
    })),
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
      subscription: null,
      dashboardPath: null,
    }),
}));
