'use client';

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

import { useAuthStore } from "../../lib/store/auth-store";
import type {
  SubscriptionPlanId,
  SubscriptionSnapshot,
} from "../../lib/mock/subscriptions";

interface DashboardGateProps {
  requiredPlan: Exclude<SubscriptionPlanId, "free">;
  children: ReactNode;
}

export function DashboardGate({ requiredPlan, children }: DashboardGateProps) {
  const user = useAuthStore((state) => state.user);
  const subscription = useAuthStore((state) => state.subscription);
  const updateSubscription = useAuthStore(
    (state) => state.updateSubscription,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || subscription) {
      return;
    }

    let cancelled = false;

    const loadSubscription = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/subscription", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ?? "Unable to verify your subscription.",
          );
        }

        if (!cancelled) {
          updateSubscription(data.subscription as SubscriptionSnapshot);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while verifying access.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadSubscription();

    return () => {
      cancelled = true;
    };
  }, [subscription, updateSubscription, user]);

  const accessState = useMemo(() => {
    if (!user) {
      return "unauthenticated" as const;
    }

    if (!subscription) {
      return "loading" as const;
    }

    const planMatches = subscription.planId === requiredPlan;
    const trialActive =
      subscription.status === "trial" && subscription.isTrialActive;
    const trialExpired =
      subscription.status === "trial" && !subscription.isTrialActive;
    const active = subscription.status === "active";

    if (!planMatches) {
      return "plan-mismatch" as const;
    }

    if (active || trialActive) {
      return subscription.status === "trial"
        ? "trial-active"
        : ("active" as const);
    }

    if (trialExpired) {
      return "trial-expired" as const;
    }

    return "plan-mismatch" as const;
  }, [subscription, requiredPlan, user]);

  if (accessState === "active") {
    return <>{children}</>;
  }

  if (accessState === "trial-active" && subscription) {
    return (
      <>
        <TrialCallout subscription={subscription} requiredPlan={requiredPlan} />
        {children}
      </>
    );
  }

  if (isLoading || accessState === "loading") {
    return (
      <GuardShell
        title="Checking your access"
        description="Hang tight while we confirm your subscription details."
      >
        <LoadingDots />
      </GuardShell>
    );
  }

  if (accessState === "unauthenticated") {
    return (
      <GuardShell
        title="Sign in required"
        description="Log in to unlock your supplier or trader workspace."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:border-blue-400/80 hover:text-white"
          >
            Start free trial
          </Link>
        </div>
      </GuardShell>
    );
  }

  const planLabel = requiredPlan === "supplier" ? "Supplier Plan" : "Trader Plan";
  const description =
    accessState === "trial-expired"
      ? "Your trial is over. Activate your plan to keep your analytics, workflow automations, and saved pipelines."
      : "Activate the correct plan to unlock this workspace. Your current subscription doesn't include access.";

  return (
    <GuardShell
      title={`${planLabel} required`}
      description={description}
      error={error ?? undefined}
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href="/account"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Manage subscription
        </Link>
        <Link
          href="/plans"
          className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:border-blue-400/80 hover:text-white"
        >
          Compare plans
        </Link>
      </div>
    </GuardShell>
  );
}

function GuardShell({
  title,
  description,
  error,
  children,
}: {
  title: string;
  description: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-slate-400">{description}</p>
        {error ? (
          <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}
        <div className="flex flex-col items-center justify-center gap-3">
          {children}
        </div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 delay-150" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300 delay-300" />
    </span>
  );
}

function TrialCallout({
  subscription,
  requiredPlan,
}: {
  subscription: SubscriptionSnapshot;
  requiredPlan: Exclude<SubscriptionPlanId, "free">;
}) {
  return (
    <div className="bg-blue-950/80 px-6 py-4 text-sm text-blue-100 shadow-inner shadow-blue-900/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
            Trial in progress
          </p>
          <p>
            You're previewing the{" "}
            <span className="font-semibold text-white">
              {requiredPlan === "supplier" ? "Supplier" : "Trader"} workspace
            </span>
            . Activate your plan to keep uninterrupted access once the trial
            ends.
          </p>
        </div>
        {subscription.trialEndsAt ? (
          <span className="text-xs text-blue-300">
            Ends {new Date(subscription.trialEndsAt).toLocaleString()}
          </span>
        ) : null}
      </div>
    </div>
  );
}

