import { createMetadata } from "@/lib/seo/metadata";
import { FAQClient } from "./faq-client";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about our platform, services, and policies.",
  path: "/faq",
  keywords: ["faq", "questions", "help", "support", "answers"],
});

export default function FAQPage() {
  return <FAQClient />;
}
