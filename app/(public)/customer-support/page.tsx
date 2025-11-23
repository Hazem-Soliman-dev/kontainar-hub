import { createMetadata } from "@/lib/seo/metadata";
import { CustomerSupportClient } from "./customer-support-client";

export const metadata = createMetadata({
  title: "Customer Support",
  description:
    "Get help with your TajirJomla Hub account, orders, products, and more. Contact our 24/7 customer support team.",
  path: "/customer-support",
  keywords: ["support", "customer service", "help", "contact", "assistance"],
});

export default function CustomerSupportPage() {
  return <CustomerSupportClient />;
}
