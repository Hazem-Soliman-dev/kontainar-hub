import { createMetadata } from "@/lib/seo/metadata";
import { TermsOfServiceClient } from "./terms-of-service-client";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read TajirJomla Hub's Terms of Service to understand the rules and regulations for using our marketplace platform.",
  path: "/terms-of-service",
  keywords: ["terms", "terms of service", "legal", "agreement", "conditions"],
});

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
