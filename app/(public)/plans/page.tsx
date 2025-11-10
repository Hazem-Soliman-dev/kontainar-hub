import { cookies } from "next/headers";

import { AUTH_COOKIE, verifyAuthToken } from "../../../lib/auth";
import {
  getUserSubscription,
  listPlans,
  type SubscriptionSnapshot,
} from "../../../lib/mock/subscriptions";
import { createMetadata } from "../../../lib/seo/metadata";
import { buildOfferLd } from "../../../lib/seo/structured-data";
import { JsonLd } from "../../../components/seo/json-ld";
import { PlanComparisonClient } from "./plan-comparison-client";

export const metadata = createMetadata({
  title: "Subscription Plans",
  description:
    "Compare Kontainar Hub's free and paid plans. Activate trials or subscribe to unlock analytics, store management, and supplier tools.",
  path: "/plans",
});

export default async function PlansPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  const plans = listPlans();
  const structuredData = plans.map((plan) =>
    buildOfferLd({
      name: plan.name,
      description: plan.description,
      price: plan.pricePerMonth,
      url: `https://kontainarhub.com/plans#${plan.id}`,
      eligibleDuration: plan.trialDays
        ? { value: plan.trialDays, unitCode: "DAY" }
        : undefined,
    })
  );

  let subscription: SubscriptionSnapshot | null = null;

  if (token) {
    try {
      const payload = await verifyAuthToken(token);
      subscription = getUserSubscription(payload.sub);
    } catch {
      subscription = null;
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-12">
      <JsonLd data={structuredData} id="plans-json-ld" />
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold text-slate-900">
          Choose your plan
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Start with a 1-day trial on any paid plan. You can upgrade or cancel
          at any time.
        </p>
      </header>

      <PlanComparisonClient
        plans={plans}
        initialSubscription={subscription}
      />
    </main>
  );
}
