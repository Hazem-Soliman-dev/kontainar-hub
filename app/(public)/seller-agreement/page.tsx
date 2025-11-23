import { createMetadata } from "@/lib/seo/metadata";
import { SellerAgreementClient } from "./seller-agreement-client";

export const metadata = createMetadata({
  title: "Seller Agreement",
  description:
    "Read the TajirJomla Hub Seller Agreement to understand the terms and conditions for selling on our platform.",
  path: "/seller-agreement",
  keywords: ["seller", "agreement", "merchant", "terms", "selling"],
});

export default function SellerAgreementPage() {
  return <SellerAgreementClient />;
}
