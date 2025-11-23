import { createMetadata } from "@/lib/seo/metadata";
import { ServicesClient } from "./services-client";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Discover the comprehensive services TajirJomla Hub offers to suppliers, traders, and businesses. From marketplace access to analytics and support.",
  path: "/services",
  keywords: [
    "services",
    "marketplace",
    "analytics",
    "supplier tools",
    "trader tools",
  ],
});

export default function ServicesPage() {
  return <ServicesClient />;
}
