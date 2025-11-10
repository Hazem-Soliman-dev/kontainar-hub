type TrialStatus = "pending" | "active" | "expired";

export type SubscriptionPlanId = "free" | "supplier" | "trader";

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  pricePerMonth: number;
  description: string;
  features: string[];
  bestFor: string;
  trialDays?: number;
}

export type SubscriptionStatus = "trial" | "active" | "expired" | "canceled";

interface SubscriptionRecord {
  userId: string;
  planId: SubscriptionPlanId;
  status: SubscriptionStatus;
  trialStartedAt?: Date;
  trialEndsAt?: Date;
  activatedAt?: Date;
  canceledAt?: Date;
  updatedAt: Date;
}

export interface SubscriptionSnapshot {
  userId: string;
  planId: SubscriptionPlanId;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  isTrialActive: boolean;
  trialEndsAt: string | null;
  trialSecondsRemaining: number;
  activatedAt: string | null;
  trialStatus: TrialStatus;
}

interface AccessResult {
  allowed: boolean;
  reason?: "not-subscribed" | "plan-mismatch" | "trial-expired";
  subscription: SubscriptionSnapshot | null;
  requiredPlan: SubscriptionPlanId;
}

const plans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Preview",
    pricePerMonth: 0,
    description:
      "Browse public marketplace teasers and evaluate Kontainar Hub before subscribing.",
    bestFor: "Exploring the platform",
    features: [
      "Access to public landing pages",
      "Featured categories preview",
      "Featured stores carousel",
      "Best sellers teaser data",
    ],
  },
  {
    id: "supplier",
    name: "Supplier Plan",
    pricePerMonth: 99,
    description:
      "Operational workspace for suppliers to manage catalogs, orders, and analytics.",
    bestFor: "Supplier teams coordinating fulfillment",
    trialDays: 1,
    features: [
      "Supplier dashboard & analytics",
      "Product catalog management (CRUD)",
      "Order pipeline with status updates",
      "Real-time order notifications",
      "Access to trader inquiries",
    ],
  },
  {
    id: "trader",
    name: "Trader Plan",
    pricePerMonth: 79,
    description:
      "End-to-end workspace for traders managing sourcing, stores, and inventory.",
    bestFor: "Trading teams consolidating suppliers",
    trialDays: 1,
    features: [
      "Trader dashboard & analytics",
      "Multi-store management",
      "Inventory sync across suppliers",
      "Order tracking & team collaboration",
      "Supplier performance insights",
    ],
  },
];

const plansById = new Map(plans.map((plan) => [plan.id, plan]));

const subscriptions = new Map<string, SubscriptionRecord>();

export function listPlans(): SubscriptionPlan[] {
  return plans;
}

export function getPlan(planId: SubscriptionPlanId): SubscriptionPlan {
  const plan = plansById.get(planId);
  if (!plan) {
    throw new Error(`Unknown subscription plan: ${planId}`);
  }
  return plan;
}

export function getUserSubscription(userId: string): SubscriptionSnapshot {
  const record = subscriptions.get(userId) ?? createFreeSubscription(userId);
  touchTrialState(record);
  subscriptions.set(userId, record);
  return toSnapshot(record);
}

export function startTrial(
  userId: string,
  planId: SubscriptionPlanId,
): SubscriptionSnapshot {
  const plan = getPlan(planId);

  if (!plan.trialDays) {
    throw new Error("Selected plan does not support trials.");
  }

  const now = new Date();
  const record: SubscriptionRecord = {
    userId,
    planId,
    status: "trial",
    trialStartedAt: now,
    trialEndsAt: new Date(now.getTime() + plan.trialDays * 24 * 60 * 60 * 1000),
    updatedAt: now,
  };

  subscriptions.set(userId, record);
  touchTrialState(record);
  return toSnapshot(record);
}

export function activateSubscription(
  userId: string,
  planId: SubscriptionPlanId,
): SubscriptionSnapshot {
  getPlan(planId);
  const now = new Date();

  const record: SubscriptionRecord = {
    userId,
    planId,
    status: "active",
    activatedAt: now,
    updatedAt: now,
  };

  subscriptions.set(userId, record);
  return toSnapshot(record);
}

export function cancelSubscription(userId: string): SubscriptionSnapshot {
  const now = new Date();
  const record = subscriptions.get(userId);

  if (!record) {
    const freeRecord = createFreeSubscription(userId);
    subscriptions.set(userId, freeRecord);
    return toSnapshot(freeRecord);
  }

  const canceledRecord: SubscriptionRecord = {
    ...record,
    planId: "free",
    status: "canceled",
    canceledAt: now,
    updatedAt: now,
  };

  subscriptions.set(userId, canceledRecord);
  return toSnapshot(canceledRecord);
}

export function ensureAccess(
  userId: string,
  requiredPlan: SubscriptionPlanId,
): AccessResult {
  const subscription = getUserSubscription(userId);

  if (subscription.planId === requiredPlan) {
    if (subscription.status === "trial" && !subscription.isTrialActive) {
      return {
        allowed: false,
        reason: "trial-expired",
        requiredPlan,
        subscription,
      };
    }

    if (subscription.status === "active" || subscription.isTrialActive) {
      return {
        allowed: true,
        requiredPlan,
        subscription,
      };
    }
  }

  if (requiredPlan === "free") {
    return {
      allowed: true,
      requiredPlan,
      subscription,
    };
  }

  return {
    allowed: false,
    reason:
      subscription.planId === "free" || subscription.status === "canceled"
        ? "not-subscribed"
        : "plan-mismatch",
    requiredPlan,
    subscription,
  };
}

function createFreeSubscription(userId: string): SubscriptionRecord {
  const now = new Date();
  return {
    userId,
    planId: "free",
    status: "active",
    updatedAt: now,
  };
}

function touchTrialState(record: SubscriptionRecord) {
  if (
    record.status !== "trial" ||
    !record.trialEndsAt ||
    record.planId === "free"
  ) {
    return;
  }

  const now = Date.now();
  if (now >= record.trialEndsAt.getTime()) {
    record.status = "expired";
    record.updatedAt = new Date(now);
  }
}

function toSnapshot(record: SubscriptionRecord): SubscriptionSnapshot {
  const plan = getPlan(record.planId);
  const now = Date.now();

  let trialStatus: TrialStatus = "pending";
  let trialSecondsRemaining = 0;
  let isTrialActive = false;
  let trialEndsAt: string | null = null;

  if (record.status === "trial" && record.trialEndsAt) {
    const diff = Math.max(record.trialEndsAt.getTime() - now, 0);
    trialSecondsRemaining = Math.floor(diff / 1000);
    isTrialActive = diff > 0;
    trialEndsAt = record.trialEndsAt.toISOString();
    trialStatus = diff > 0 ? "active" : "expired";
  } else if (record.status === "expired" && record.trialEndsAt) {
    trialEndsAt = record.trialEndsAt.toISOString();
    trialStatus = "expired";
  } else {
    trialStatus = record.status === "active" ? "expired" : "pending";
  }

  return {
    userId: record.userId,
    planId: record.planId,
    plan,
    status: record.status,
    isTrialActive,
    trialEndsAt,
    trialSecondsRemaining,
    activatedAt: record.activatedAt?.toISOString() ?? null,
    trialStatus,
  };
}


