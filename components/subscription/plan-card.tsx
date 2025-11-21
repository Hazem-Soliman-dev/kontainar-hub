import { Fragment } from "react";

import type {
  SubscriptionPlan,
  SubscriptionPlanId,
  SubscriptionStatus,
} from "../../lib/mock/subscriptions";

type ProcessingAction = "trial" | "activate" | null;

interface PlanCardProps {
  plan: SubscriptionPlan;
  status: SubscriptionStatus | null;
  isCurrent: boolean;
  isTrialActive: boolean;
  trialEndsAt: string | null;
  trialSecondsRemaining: number | null;
  onStartTrial: (planId: SubscriptionPlanId) => void;
  onActivate: (planId: SubscriptionPlanId) => void;
  disabled?: boolean;
  recommended?: boolean;
  processingAction?: ProcessingAction;
}

export function PlanCard({
  plan,
  status,
  isCurrent,
  isTrialActive,
  trialEndsAt,
  trialSecondsRemaining,
  onStartTrial,
  onActivate,
  disabled = false,
  recommended = false,
  processingAction = null,
}: PlanCardProps) {
  const isFreePlan = plan.id === "free";
  const formattedPrice =
    plan.pricePerMonth === 0
      ? "Free"
      : `$${plan.pricePerMonth.toLocaleString("en-US")}/mo`;

  const trialLabel =
    plan.trialDays && plan.trialDays > 0
      ? `Start ${plan.trialDays}-day trial`
      : "Start trial";

  const canStartTrial =
    !isFreePlan && plan.trialDays && plan.trialDays > 0 && !isTrialActive;

  const actionLabel =
    status === "active" && isCurrent
      ? "Current plan"
      : isTrialActive
      ? "Activate after trial"
      : "Activate plan";

  return (
    <article
      id={plan.id}
      className={[
        "flex h-full flex-col gap-4 rounded-2xl border bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm transition",
        recommended
          ? "border-primary-500 ring-2 ring-primary-500/20"
          : "border-neutral-200 dark:border-neutral-800",
      ].join(" ")}
    >
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{plan.name}</h3>
          <PlanBadge
            status={status}
            isCurrent={isCurrent}
            isTrialActive={isTrialActive}
          />
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{plan.description}</p>
        <span className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          {formattedPrice}
        </span>
      </header>

      <ul className="flex flex-1 flex-col gap-3 text-sm text-neutral-700 dark:text-neutral-100">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span aria-hidden className="mt-1 text-primary-600 dark:text-primary-400">
              •
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 text-sm text-neutral-700 dark:text-blue-400">
        {isTrialActive && trialEndsAt && (
          <div className="rounded-lg border border-primary-200 dark:border-blue-400/50 bg-primary-50 dark:bg-blue-900/20 px-3 py-2 text-xs text-primary-700 dark:text-blue-400">
            Trial active • Ends {formatRelativeTime(trialEndsAt)}{" "}
            {typeof trialSecondsRemaining === "number" &&
              trialSecondsRemaining > 0 && (
                <span>({formatCountdown(trialSecondsRemaining)})</span>
              )}
          </div>
        )}

        {isFreePlan ? (
          <span className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-center font-semibold text-neutral-700 dark:text-neutral-100">
            Included for all accounts
          </span>
        ) : (
          <Fragment>
            <button
              type="button"
              onClick={() => onStartTrial(plan.id)}
              disabled={
                disabled || !canStartTrial || processingAction === "activate"
              }
              className={[
                "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                canStartTrial
                  ? "bg-primary-600 text-neutral-900 dark:text-neutral-100 hover:bg-primary-500 disabled:bg-primary-300 disabled:text-neutral-900 dark:disabled:text-neutral-100"
                  : "cursor-not-allowed bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-blue-400",
              ].join(" ")}
            >
              {processingAction === "trial" ? "Starting trial…" : trialLabel}
            </button>
            <button
              type="button"
              onClick={() => onActivate(plan.id)}
              disabled={disabled || processingAction === "trial"}
              className={[
                "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                isCurrent
                  ? "border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-blue-400 cursor-not-allowed"
                  : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-100 hover:border-primary-500 hover:text-primary-600 dark:hover:text-blue-400",
              ].join(" ")}
            >
              {processingAction === "activate" ? "Activating…" : actionLabel}
            </button>
          </Fragment>
        )}
      </div>
    </article>
  );
}

function PlanBadge({
  status,
  isCurrent,
  isTrialActive,
}: {
  status: SubscriptionStatus | null;
  isCurrent: boolean;
  isTrialActive: boolean;
}) {
  if (isCurrent && status === "active") {
    return (
      <span className="rounded-full bg-success-50 dark:bg-success-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
        Active
      </span>
    );
  }

  if (isCurrent && status === "trial" && isTrialActive) {
    return (
      <span className="rounded-full bg-primary-50 dark:bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        Trial active
      </span>
    );
  }

  if (status === "expired" && isCurrent) {
    return (
      <span className="rounded-full bg-danger-50 dark:bg-danger-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
        Trial expired
      </span>
    );
  }

  return null;
}

function formatRelativeTime(dateIso: string) {
  try {
    const endsAt = new Date(dateIso);
    return endsAt.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return dateIso;
  }
}

function formatCountdown(totalSeconds: number) {
  const clamped = Math.max(totalSeconds, 0);
  const hours = Math.floor(clamped / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((clamped % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(clamped % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
