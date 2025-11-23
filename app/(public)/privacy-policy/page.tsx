import { createMetadata } from "@/lib/seo/metadata";
import { PrivacyPolicyClient } from "./privacy-policy-client";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read TajirJomla Hub's Privacy Policy to understand how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
  keywords: ["privacy", "privacy policy", "data protection", "personal information"],
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
