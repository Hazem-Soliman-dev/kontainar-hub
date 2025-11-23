import { createMetadata } from "../../lib/seo/metadata";
import { LandingPageContent } from "../../components/public/landing-page-content";
import {
  getUserSubscriptionFromCookies,
  hasActivePlan,
} from "../../lib/utils/subscription-check";

export const metadata = createMetadata({
  title: "MarketHub | Discover Amazing Products",
  description:
    "Discover amazing products from trusted stores across every category.",
  path: "/",
  keywords: ["marketplace", "ecommerce", "featured products", "popular stores"],
});

export default async function PublicLandingPage() {
  const subscription = await getUserSubscriptionFromCookies();
  const userHasActivePlan = hasActivePlan(subscription);

  return <LandingPageContent userHasActivePlan={userHasActivePlan} />;
}
