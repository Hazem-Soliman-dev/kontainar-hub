import { createMetadata } from "@/lib/seo/metadata";
import { PolicyLayout } from "@/components/ui/policy-layout";

export const metadata = createMetadata({
  title: "Seller Agreement",
  description:
    "Read the TajirJomla Hub Seller Agreement to understand the terms and conditions for selling on our platform.",
  path: "/seller-agreement",
  keywords: ["seller", "agreement", "merchant", "terms", "selling"],
});

export default function SellerAgreementPage() {
  const sections = [
    {
      title: "1. Introduction",
      content: `This Seller Agreement ("Agreement") is between you ("Seller") and TajirJomla Hub ("Company") and governs your use of the TajirJomla Hub marketplace to sell products or services. By registering as a seller, you agree to be bound by this Agreement.`,
    },
    {
      title: "2. Seller Obligations",
      content: `As a Seller on TajirJomla Hub, you agree to:
• Provide accurate and complete information about your products or services.
• Fulfill orders in a timely and professional manner.
• Comply with all applicable laws and regulations.
• Maintain high standards of customer service.
• Respect the intellectual property rights of others.`,
    },
    {
      title: "3. Fees and Payments",
      content: `TajirJomla Hub charges a commission on each sale made through the platform. The current commission rates are set forth in our Fee Schedule. Payments to Sellers are processed according to our Payment Policy, typically on a bi-weekly basis, subject to any hold periods for returns or disputes.`,
    },
    {
      title: "4. Prohibited Items",
      content: `You may not sell any items that are illegal, counterfeit, dangerous, or violate our Prohibited Items Policy. TajirJomla Hub reserves the right to remove any listing that violates this policy and to suspend or terminate the account of any Seller who repeatedly violates this policy.`,
    },
    {
      title: "5. Intellectual Property",
      content: `You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to use and authorize TajirJomla Hub to use all intellectual property rights in and to your content and products.`,
    },
    {
      title: "6. Termination",
      content: `Either party may terminate this Agreement at any time with written notice. Upon termination, you must fulfill any outstanding orders and pay any outstanding fees. TajirJomla Hub may retain a portion of your funds to cover potential chargebacks or refunds for a period of up to 90 days.`,
    },
    {
      title: "7. Indemnification",
      content: `You agree to indemnify and hold harmless TajirJomla Hub, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from your use of the platform or your violation of this Agreement.`,
    },
    {
      title: "8. Contact Us",
      content: `If you have any questions about this Seller Agreement, please contact us at:

Email: sellers@tajirjomlahub.com
Address: 123 Market Street, Suite 456, San Francisco, CA 94105`,
    },
  ];

  return (
    <PolicyLayout
      title="Seller Agreement"
      description="Terms and conditions for selling on TajirJomla Hub."
      lastUpdated={new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      sections={sections}
    />
  );
}
