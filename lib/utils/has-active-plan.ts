import type { SubscriptionSnapshot } from "../mock/subscriptions";

/**
 * Checks if a user has an active paid plan (supplier or trader)
 * Returns true if planId is not "free" AND (status is "active" OR trial is active)
 * 
 * ✅ Includes free trial users: Returns true for active trials (isTrialActive = true)
 * ✅ Includes paid active users: Returns true for status = "active"
 * ❌ Excludes free plan users: Returns false for planId = "free"
 * ❌ Excludes expired trials: Returns false for expired trials (isTrialActive = false)
 * 
 * This is a pure utility function safe for use in both client and server components.
 */
export function hasActivePlan(
  subscription: SubscriptionSnapshot | null
): boolean {
  if (!subscription) return false;
  if (subscription.planId === "free") return false;
  if (subscription.status === "canceled") return false;
  if (subscription.status === "trial" && !subscription.isTrialActive)
    return false;
  return subscription.status === "active" || subscription.isTrialActive;
}

