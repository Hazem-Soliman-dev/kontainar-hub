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
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { PlanComparisonClient } from "./plan-comparison-client";

export const metadata = createMetadata({
  title: "Subscription Plans",
  description:
    "Compare TajirJomla Hub's free and paid plans. Activate trials or subscribe to unlock analytics, store management, and supplier tools.",
  path: "/plans",
});

export default async function PlansPage({
  searchParams,
}: {
  searchParams: Promise<{ requestItem?: string; productName?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  let params: { requestItem?: string; productName?: string } = {};
  try {
    params = await searchParams;
  } catch (error) {
    console.error("Error reading searchParams:", error);
  }

  // Decode URL-encoded product name safely
  let decodedProductName: string | undefined = undefined;
  if (params.productName) {
    try {
      // Replace + with space first, then decode
      decodedProductName = decodeURIComponent(
        params.productName.replace(/\+/g, " ")
      );
    } catch (error) {
      // If decoding fails, use the original value
      decodedProductName = params.productName.replace(/\+/g, " ");
    }
  }

  const plans = listPlans();
  const structuredData = plans.map((plan) =>
    buildOfferLd({
      name: plan.name,
      description: plan.description,
      price: plan.pricePerMonth,
      url: `https://tajirjomlahub.com/plans#${plan.id}`,
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 py-6 sm:py-8">
      <JsonLd data={structuredData} id="plans-json-ld" />
      <Breadcrumb />

      <PlanComparisonClient
        plans={plans}
        initialSubscription={subscription}
        requestedProductId={params.requestItem}
        requestedProductName={decodedProductName}
      />
    </main>
    </div>
  );
}
