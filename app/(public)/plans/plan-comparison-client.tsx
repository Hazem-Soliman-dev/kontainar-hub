"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { PlanCard } from "../../../components/subscription/plan-card";
import { TrialBanner } from "../../../components/subscription/trial-banner";
import { useAuthStore } from "../../../lib/store/auth-store";
import type {
  SubscriptionPlan,
  SubscriptionPlanId,
  SubscriptionSnapshot,
} from "../../../lib/mock/subscriptions";

interface PlanComparisonClientProps {
  plans: SubscriptionPlan[];
  initialSubscription: SubscriptionSnapshot | null;
  requestedProductId?: string;
  requestedProductName?: string;
}

interface ProcessingState {
  planId: SubscriptionPlanId;
  action: "trial" | "activate";
}

export function PlanComparisonClient({
  plans,
  initialSubscription,
  requestedProductId,
  requestedProductName,
}: PlanComparisonClientProps) {
  const router = useRouter();
  const updateSubscription = useAuthStore((state) => state.updateSubscription);
  const [subscription, setSubscription] = useState(initialSubscription);
  const [processing, setProcessing] = useState<ProcessingState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isTrialBannerVisible =
    Boolean(subscription?.status === "trial") &&
    Boolean(subscription?.isTrialActive) &&
    Boolean(subscription?.trialEndsAt);

  const groupedPlans = useMemo(() => {
    const highlightPlanId =
      subscription?.planId && subscription.planId !== "free"
        ? subscription.planId
        : "supplier";

    return plans.map((plan) => ({
      plan,
      recommended: plan.id === highlightPlanId,
    }));
  }, [plans, subscription?.planId]);

  const handleStartTrial = async (planId: SubscriptionPlanId) => {
    setProcessing({ planId, action: "trial" });
    setError(null);

    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId, action: "startTrial" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to start trial.");
      }

      setSubscription(data.subscription);
      
      // Update auth store subscription so client components can use it immediately
      updateSubscription(data.subscription);

      // Dispatch event to notify other components to refetch subscription
      window.dispatchEvent(
        new CustomEvent("subscription-changed", {
          detail: data.subscription,
        })
      );

      // Do a full page reload to ensure server components see updated subscription
      setTimeout(() => {
        if (requestedProductId) {
          window.location.href = `/products/${requestedProductId}`;
        } else {
          window.location.href = "/";
        }
      }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setProcessing(null);
    }
  };

  const handleActivatePlan = async (planId: SubscriptionPlanId) => {
    setProcessing({ planId, action: "activate" });
    setError(null);

    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId, action: "activate" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to activate subscription.");
      }

      setSubscription(data.subscription);
      
      // Update auth store subscription so client components can use it immediately
      updateSubscription(data.subscription);

      // Dispatch event to notify other components to refetch subscription
      window.dispatchEvent(
        new CustomEvent("subscription-changed", {
          detail: data.subscription,
        })
      );

      // Do a full page reload to ensure server components see updated subscription
      setTimeout(() => {
        if (requestedProductId) {
          window.location.href = `/products/${requestedProductId}`;
        } else {
          window.location.href = "/";
        }
      }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <section className="flex flex-col gap-4 sm:gap-6">
      {isTrialBannerVisible && subscription?.trialEndsAt && (
        <TrialBanner
          key={`${subscription.planId}-${
            subscription.trialEndsAt ?? "no-expiry"
          }-${subscription.trialSecondsRemaining}`}
          planName={subscription.plan.name}
          trialEndsAt={subscription.trialEndsAt}
          initialSecondsRemaining={subscription.trialSecondsRemaining}
          onExpired={() =>
            setSubscription((prev) =>
              prev
                ? {
                    ...prev,
                    status: "expired",
                    isTrialActive: false,
                    trialSecondsRemaining: 0,
                    trialStatus: "expired",
                  }
                : prev
            )
          }
        />
      )}

      {error && (
        <div className="rounded-lg sm:rounded-xl border border-red-200 dark:border-red-200 bg-red-50 dark:bg-red-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-700 dark:text-red-700">
          {error}
        </div>
      )}

      {requestedProductId && requestedProductName && (
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 sm:p-4 text-center">
          <p className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-900">
            Subscribe to view pricing for{" "}
            <span className="font-bold">{requestedProductName}</span>
          </p>
          <p className="mt-1 text-xs text-blue-700 dark:text-blue-700">
            Choose a plan below to unlock product pricing and add items to your
            cart.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {groupedPlans.map(({ plan, recommended }) => {
          const isProcessingPlan =
            processing && processing.planId === plan.id
              ? processing.action
              : null;

          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              status={
                subscription?.planId === plan.id ? subscription.status : null
              }
              isCurrent={subscription?.planId === plan.id}
              isTrialActive={
                subscription?.planId === plan.id
                  ? subscription.isTrialActive
                  : false
              }
              trialEndsAt={
                subscription?.planId === plan.id
                  ? subscription.trialEndsAt
                  : null
              }
              trialSecondsRemaining={
                subscription?.planId === plan.id
                  ? subscription.trialSecondsRemaining
                  : null
              }
              onStartTrial={handleStartTrial}
              onActivate={handleActivatePlan}
              processingAction={isProcessingPlan}
              disabled={Boolean(processing) && processing?.planId !== plan.id}
              recommended={recommended}
            />
          );
        })}
      </div>

      <section className="mt-4 grid gap-4 sm:gap-6 rounded-lg sm:rounded-xl bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 text-xs sm:text-sm text-neutral-900 dark:text-neutral-900 grid-cols-1 md:grid-cols-3">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-900">
            Free Plan
          </h3>
          <p className="mt-2 text-neutral-900 dark:text-neutral-900">
            Perfect for exploring public marketplace data and understanding how
            Kontainar Hub works.
          </p>
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-900">
            Supplier Plan
          </h3>
          <p className="mt-2 text-neutral-900 dark:text-neutral-900">
            Unlock operational tools to manage inventory, process orders, and
            reach motivated traders.
          </p>
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-900">
            Trader Plan
          </h3>
          <p className="mt-2 text-neutral-900 dark:text-neutral-900">
            Find quality suppliers, monitor live pricing, and collaborate with
            your team on every purchase.
          </p>
        </div>
      </section>
    </section>
  );
}
