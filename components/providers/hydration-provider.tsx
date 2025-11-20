"use client";

import { useEffect } from "react";
import { useAuthStore } from "../../lib/store/auth-store";

/**
 * HydrationProvider manually rehydrates Zustand persist stores
 * to avoid SSR hydration mismatches in Next.js
 */
export function HydrationProvider() {
  useEffect(() => {
    // Manually rehydrate the auth store from localStorage
    useAuthStore.persist.rehydrate();
    
    // Log for debugging (can be removed later)
    const subscription = useAuthStore.getState().subscription;
    console.log("[HydrationProvider] Store rehydrated. Subscription:", subscription);
  }, []);

  return null;
}

