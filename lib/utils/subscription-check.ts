import { cookies } from "next/headers";

import { AUTH_COOKIE, verifyAuthToken } from "../auth-token";
import {
  getUserSubscription,
  type SubscriptionSnapshot,
} from "../mock/subscriptions";

// Re-export the client-safe utility for backward compatibility
export { hasActivePlan } from "./has-active-plan";

/**
 * Gets user subscription from cookies (for server components)
 * Returns subscription or null if not authenticated
 */
export async function getUserSubscriptionFromCookies(): Promise<SubscriptionSnapshot | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyAuthToken(token);
    return getUserSubscription(payload.sub);
  } catch (error) {
    console.warn("Failed to verify auth token", error);
    return null;
  }
}
