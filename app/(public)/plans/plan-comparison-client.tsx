'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PlanCard } from '../../../components/subscription/plan-card';
import { TrialBanner } from '../../../components/subscription/trial-banner';
import type {
  SubscriptionPlan,
  SubscriptionPlanId,
  SubscriptionSnapshot,
} from '../../../lib/mock/subscriptions';

interface PlanComparisonClientProps {
  plans: SubscriptionPlan[];
  initialSubscription: SubscriptionSnapshot | null;
}

interface ProcessingState {
  planId: SubscriptionPlanId;
  action: 'trial' | 'activate';
}

export function PlanComparisonClient({
  plans,
  initialSubscription,
}: PlanComparisonClientProps) {
  const router = useRouter();
  const [subscription, setSubscription] = useState(initialSubscription);
  const [processing, setProcessing] = useState<ProcessingState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isTrialBannerVisible =
    Boolean(subscription?.status === 'trial') &&
    Boolean(subscription?.isTrialActive) &&
    Boolean(subscription?.trialEndsAt);

  const groupedPlans = useMemo(() => {
    const highlightPlanId =
      subscription?.planId && subscription.planId !== 'free'
        ? subscription.planId
        : 'supplier';

    return plans.map((plan) => ({
      plan,
      recommended: plan.id === highlightPlanId,
    }));
  }, [plans, subscription?.planId]);

  const handleStartTrial = async (planId: SubscriptionPlanId) => {
    setProcessing({ planId, action: 'trial' });
    setError(null);

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, action: 'startTrial' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? 'Unable to start trial.');
      }

      setSubscription(data.subscription);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setProcessing(null);
    }
  };

  const handleActivatePlan = async (planId: SubscriptionPlanId) => {
    setProcessing({ planId, action: 'activate' });
    setError(null);

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, action: 'activate' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? 'Unable to activate subscription.');
      }

      setSubscription(data.subscription);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setProcessing(null);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {isTrialBannerVisible && subscription?.trialEndsAt && (
        <TrialBanner
          key={`${subscription.planId}-${subscription.trialEndsAt ?? 'no-expiry'}-${subscription.trialSecondsRemaining}`}
          planName={subscription.plan.name}
          trialEndsAt={subscription.trialEndsAt}
          initialSecondsRemaining={subscription.trialSecondsRemaining}
          onExpired={() =>
            setSubscription((prev) =>
              prev
                ? {
                    ...prev,
                    status: 'expired',
                    isTrialActive: false,
                    trialSecondsRemaining: 0,
                    trialStatus: 'expired',
                  }
                : prev,
            )
          }
        />
      )}

      {error && (
        <div className="rounded-xl border border-red-200 dark:border-red-200 bg-red-50 dark:bg-red-50 px-4 py-3 text-sm text-red-700 dark:text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groupedPlans.map(({ plan, recommended }) => {
          const isProcessingPlan =
            processing && processing.planId === plan.id
              ? processing.action
              : null;

          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              status={subscription?.planId === plan.id ? subscription.status : null}
              isCurrent={subscription?.planId === plan.id}
              isTrialActive={
                subscription?.planId === plan.id ? subscription.isTrialActive : false
              }
              trialEndsAt={
                subscription?.planId === plan.id ? subscription.trialEndsAt : null
              }
              trialSecondsRemaining={
                subscription?.planId === plan.id ? subscription.trialSecondsRemaining : null
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

      <section className="mt-4 grid gap-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-100/60 p-6 text-sm text-neutral-900 dark:text-neutral-900 md:grid-cols-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-900">Free Plan</h3>
          <p className="mt-2 text-neutral-900 dark:text-neutral-900">
            Perfect for exploring public marketplace data and understanding how Kontainar Hub works.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-900">Supplier Plan</h3>
          <p className="mt-2 text-neutral-900 dark:text-neutral-900">
            Unlock operational tools to manage inventory, process orders, and reach motivated traders.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-900">Trader Plan</h3>
          <p className="mt-2 text-neutral-900 dark:text-neutral-900">
            Find quality suppliers, monitor live pricing, and collaborate with your team on every purchase.
          </p>
        </div>
      </section>
    </section>
  );
}

