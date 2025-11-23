import { createMetadata } from "@/lib/seo/metadata";
import { ReturnsRefundsClient } from "./returns-refunds-client";

export const metadata = createMetadata({
  title: "Returns & Refunds",
  description:
    "Understand TajirJomla Hub's Returns & Refunds policy, including eligibility, timelines, and processes.",
  path: "/returns-refunds",
  keywords: ["returns", "refunds", "policy", "money back", "guarantee"],
});

export default function ReturnsRefundsPage() {
  return <ReturnsRefundsClient />;
}
