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
        "flex h-full flex-col gap-4 rounded-2xl border bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-sm transition",
        recommended
          ? "border-blue-700 shadow-lg shadow-blue-950/40"
          : "border-neutral-200 dark:border-neutral-200",
      ].join(" ")}
    >
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">{plan.name}</h3>
          <PlanBadge
            status={status}
            isCurrent={isCurrent}
            isTrialActive={isTrialActive}
          />
        </div>
        <p className="text-sm text-neutral-700 dark:text-neutral-700">{plan.description}</p>
        <span className="text-2xl font-semibold text-white">
          {formattedPrice}
        </span>
      </header>

      <ul className="flex flex-1 flex-col gap-3 text-sm text-neutral-700 dark:text-neutral-700">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span aria-hidden className="mt-1 text-blue-500">
              •
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 text-sm text-neutral-700 dark:text-neutral-700">
        {isTrialActive && trialEndsAt && (
          <div className="rounded-lg border border-blue-700 bg-blue-950 px-3 py-2 text-xs text-blue-400">
            Trial active • Ends {formatRelativeTime(trialEndsAt)}{" "}
            {typeof trialSecondsRemaining === "number" &&
              trialSecondsRemaining > 0 && (
                <span>({formatCountdown(trialSecondsRemaining)})</span>
              )}
          </div>
        )}

        {isFreePlan ? (
          <span className="rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-4 py-2 text-center font-semibold text-neutral-700 dark:text-neutral-700">
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
                "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                canStartTrial
                  ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                  : "cursor-not-allowed bg-neutral-100/60 dark:bg-neutral-100/60 text-neutral-700 dark:text-neutral-700",
              ].join(" ")}
            >
              {processingAction === "trial" ? "Starting trial…" : trialLabel}
            </button>
            <button
              type="button"
              onClick={() => onActivate(plan.id)}
              disabled={disabled || processingAction === "trial"}
              className={[
                "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                isCurrent
                  ? "border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 text-neutral-700 dark:text-neutral-700"
                  : "border-neutral-200 dark:border-neutral-200 text-neutral-700 dark:text-neutral-700 hover:border-blue-500 hover:text-blue-600",
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
      <span className="rounded-full bg-emerald-50 dark:bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-700">
        Active
      </span>
    );
  }

  if (isCurrent && status === "trial" && isTrialActive) {
    return (
      <span className="rounded-full bg-blue-50 dark:bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-700">
        Trial active
      </span>
    );
  }

  if (status === "expired" && isCurrent) {
    return (
      <span className="rounded-full bg-rose-50 dark:bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-600">
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
