import { createMetadata } from "@/lib/seo/metadata";
import { ShippingInfoClient } from "./shipping-info-client";

export const metadata = createMetadata({
  title: "Shipping Information",
  description:
    "Learn about TajirJomla Hub's shipping policies, delivery times, and international shipping options.",
  path: "/shipping-info",
  keywords: ["shipping", "delivery", "logistics", "international shipping"],
});

export default function ShippingInfoPage() {
  return <ShippingInfoClient />;
}
