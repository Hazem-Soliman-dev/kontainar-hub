"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Zap } from "lucide-react";

import { PlanCard } from "../../../components/subscription/plan-card";
import { TrialBanner } from "../../../components/subscription/trial-banner";
import { useAuthStore } from "../../../lib/store/auth-store";
import type {
  SubscriptionPlan,
  SubscriptionPlanId,
  SubscriptionSnapshot,
} from "../../../lib/mock/subscriptions";
import { useLanguage } from "../../../components/providers/language-provider";
import { MotionWrapper } from "../../../components/ui/motion-wrapper";

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
  const { t } = useLanguage();
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
      updateSubscription(data.subscription);

      window.dispatchEvent(
        new CustomEvent("subscription-changed", {
          detail: data.subscription,
        })
      );

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
      updateSubscription(data.subscription);

      window.dispatchEvent(
        new CustomEvent("subscription-changed", {
          detail: data.subscription,
        })
      );

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-b-3xl">
      {/* Hero Section */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-10 sm:py-15 overflow-hidden ">

      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pb-24">
        <div className="flex flex-col gap-8">
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
            <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-red-100 dark:bg-red-900/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
            {groupedPlans.map(({ plan, recommended }, index) => {
              const isProcessingPlan =
                processing && processing.planId === plan.id
                  ? processing.action
                  : null;

              return (
                <MotionWrapper key={plan.id} delay={index * 0.1} variant="fade-up">
                  <div className={`relative ${recommended ? 'lg:-mt-8' : ''}`}>
                    {recommended && (
                       <div className="absolute -top-10 left-0 right-0 flex justify-center z-10">
                          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-900 dark:text-neutral-100 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                             {t("home.plansPage.mostPopular")}
                          </span>
                       </div>
                    )}
                    <PlanCard
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
                  </div>
                </MotionWrapper>
              );
            })}
          </div>

          {/* Feature Comparison */}
          <MotionWrapper variant="fade-up" delay={0.4} className="mt-24">
            <h2 className="text-3xl font-bold text-center text-neutral-600 dark:text-neutral-400 mb-12">
              {t("home.plansPage.compareFeatures")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-ss-2xl text-start text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{t("home.plansPage.table.feature")}</th>
                    <th className="p-4 bg-neutral-100 dark:bg-neutral-900 text-center text-sm font-bold text-neutral-600 dark:text-neutral-400">{t("home.plansPage.table.free")}</th>
                    <th className="p-4 bg-neutral-100 dark:bg-neutral-900 text-center text-sm font-bold text-primary-600 dark:text-primary-400">{t("home.plansPage.table.supplier")}</th>
                    <th className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-se-2xl text-center text-sm font-bold text-neutral-600 dark:text-neutral-400">{t("home.plansPage.table.trader")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  <FeatureRow name={t("home.plansPage.table.features.marketplaceAccess")} free={true} supplier={true} trader={true} />
                  <FeatureRow name={t("home.plansPage.table.features.productSearch")} free={true} supplier={true} trader={true} />
                  <FeatureRow name={t("home.plansPage.table.features.viewPricing")} free={false} supplier={true} trader={true} />
                  <FeatureRow name={t("home.plansPage.table.features.inventoryManagement")} free={false} supplier={true} trader={false} />
                  <FeatureRow name={t("home.plansPage.table.features.rfqResponses")} free={false} supplier={true} trader={false} />
                  <FeatureRow name={t("home.plansPage.table.features.bulkOrdering")} free={false} supplier={false} trader={true} />
                  <FeatureRow name={t("home.plansPage.table.features.prioritySupport")} free={false} supplier={true} trader={true} />
                  <FeatureRow name={t("home.plansPage.table.features.apiAccess")} free={false} supplier={t("home.plansPage.table.status.limited")} trader={t("home.plansPage.table.status.full")} />
                </tbody>
              </table>
            </div>
          </MotionWrapper>
        </div>
      </main>
    </div>
  );
}

function FeatureRow({ name, free, supplier, trader }: { name: string, free: boolean | string, supplier: boolean | string, trader: boolean | string }) {
  return (
    <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
      <td className="p-4 text-sm font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800">{name}</td>
      <td className="p-4 text-center border-b border-neutral-100 dark:border-neutral-800"><StatusIcon status={free} /></td>
      <td className="p-4 text-center border-b border-neutral-100 dark:border-neutral-800 bg-primary-100 dark:bg-primary-900/10"><StatusIcon status={supplier} /></td>
      <td className="p-4 text-center border-b border-neutral-100 dark:border-neutral-800"><StatusIcon status={trader} /></td>
    </tr>
  );
}

function StatusIcon({ status }: { status: boolean | string }) {
  if (status === true) return <Check className="h-5 w-5 text-green-500 mx-auto" />;
  if (status === false) return <X className="h-5 w-5 text-neutral-600 dark:text-neutral-400 mx-auto" />;
  return <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{status}</span>;
}
