"use client";

import { Fragment } from "react";
import { useLanguage } from "../providers/language-provider";

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
  const { t } = useLanguage();
  const isFreePlan = plan.id === "free";

  // Translate plan name
  const planName = t(`home.plansPage.plans.${plan.id}.name`) || plan.name;

  // Translate plan description
  const planDescription =
    t(`home.plansPage.plans.${plan.id}.description`) || plan.description;

  const formattedPrice =
    plan.pricePerMonth === 0
      ? t("home.plansPage.card.free")
      : `$${plan.pricePerMonth.toLocaleString("en-US")}${t(
          "home.plansPage.card.perMonth"
        )}`;

  const trialLabel =
    plan.trialDays && plan.trialDays > 0
      ? t("home.plansPage.card.startTrialDays").replace(
          "{days}",
          plan.trialDays.toString()
        )
      : t("home.plansPage.card.startTrial");

  const canStartTrial =
    !isFreePlan && plan.trialDays && plan.trialDays > 0 && !isTrialActive;

  const actionLabel =
    status === "active" && isCurrent
      ? t("home.plansPage.card.currentPlan")
      : isTrialActive
      ? t("home.plansPage.card.activateAfterTrial")
      : t("home.plansPage.card.activatePlan");

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
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {planName}
          </h3>
          <PlanBadge
            status={status}
            isCurrent={isCurrent}
            isTrialActive={isTrialActive}
          />
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {planDescription}
        </p>
        <span className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          {formattedPrice}
        </span>
      </header>

      <ul className="flex flex-1 flex-col gap-3 text-sm text-neutral-700 dark:text-neutral-100">
        {plan.features.map((feature, index) => {
          // Map feature strings to translation keys
          const featureMap: Record<string, Record<string, string>> = {
            free: {
              "Access to public landing pages":
                "home.plansPage.features.free.feature1",
              "Featured categories preview":
                "home.plansPage.features.free.feature2",
              "Featured stores carousel":
                "home.plansPage.features.free.feature3",
              "Best sellers teaser data":
                "home.plansPage.features.free.feature4",
            },
            supplier: {
              "Supplier dashboard & analytics":
                "home.plansPage.features.supplier.feature1",
              "Product catalog management (CRUD)":
                "home.plansPage.features.supplier.feature2",
              "Order pipeline with status updates":
                "home.plansPage.features.supplier.feature3",
              "Real-time order notifications":
                "home.plansPage.features.supplier.feature4",
              "Access to trader inquiries":
                "home.plansPage.features.supplier.feature5",
            },
            trader: {
              "Trader dashboard & analytics":
                "home.plansPage.features.trader.feature1",
              "Multi-store management":
                "home.plansPage.features.trader.feature2",
              "Inventory sync across suppliers":
                "home.plansPage.features.trader.feature3",
              "Order tracking & team collaboration":
                "home.plansPage.features.trader.feature4",
              "Supplier performance insights":
                "home.plansPage.features.trader.feature5",
            },
          };

          const featureKey =
            featureMap[plan.id]?.[feature] ||
            `home.plansPage.features.${plan.id}.feature${index + 1}`;
          const translatedFeature = t(featureKey as any) || feature;

          return (
            <li key={feature} className="flex items-center gap-2">
              <span
                aria-hidden
                className="mt-1 text-primary-600 dark:text-primary-400"
              >
                •
              </span>
              <span>{translatedFeature}</span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-3 text-sm text-neutral-700 dark:text-blue-400">
        {isTrialActive && trialEndsAt && (
          <div className="rounded-lg border border-primary-200 dark:border-blue-400/50 bg-primary-50 dark:bg-blue-900/20 px-3 py-2 text-xs text-primary-700 dark:text-blue-400">
            {t("home.plansPage.card.trialActive")} •{" "}
            {t("home.plansPage.card.ends")} {formatRelativeTime(trialEndsAt)}{" "}
            {typeof trialSecondsRemaining === "number" &&
              trialSecondsRemaining > 0 && (
                <span>({formatCountdown(trialSecondsRemaining)})</span>
              )}
          </div>
        )}

        {isFreePlan ? (
          <span className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-center font-semibold text-neutral-700 dark:text-neutral-100">
            {t("home.plansPage.card.included")}
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
              {processingAction === "trial"
                ? t("home.plansPage.card.startingTrial")
                : trialLabel}
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
              {processingAction === "activate"
                ? t("home.plansPage.card.activating")
                : actionLabel}
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
  const { t } = useLanguage();
  if (isCurrent && status === "active") {
    return (
      <span className="rounded-full bg-success-50 dark:bg-success-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
        {t("home.plansPage.card.badges.active")}
      </span>
    );
  }

  if (isCurrent && status === "trial" && isTrialActive) {
    return (
      <span className="rounded-full bg-primary-50 dark:bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        {t("home.plansPage.card.badges.trialActive")}
      </span>
    );
  }

  if (status === "expired" && isCurrent) {
    return (
      <span className="rounded-full bg-danger-50 dark:bg-danger-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
        {t("home.plansPage.card.badges.trialExpired")}
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
