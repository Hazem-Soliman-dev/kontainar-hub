import { createMetadata } from "@/lib/seo/metadata";
import { PolicyLayout } from "@/components/ui/policy-layout";

export const metadata = createMetadata({
  title: "Returns & Refunds",
  description:
    "Understand TajirJomla Hub's Returns & Refunds policy, including eligibility, timelines, and processes.",
  path: "/returns-refunds",
  keywords: ["returns", "refunds", "policy", "money back", "guarantee"],
});

export default function ReturnsRefundsPage() {
  const sections = [
    {
      title: "1. Return Policy Overview",
      content: `We want you to be completely satisfied with your purchase. If you are not satisfied, you may return most items within 30 days of delivery for a full refund, subject to the terms and conditions below.`,
    },
    {
      title: "2. Eligibility for Returns",
      content: `To be eligible for a return, your item must be:
• Unused and in the same condition that you received it.
• In the original packaging with all tags and labels attached.
• Accompanied by the receipt or proof of purchase.

Certain items are non-returnable, including:
• Perishable goods (e.g., food, flowers)
• Personalized or custom-made items
• Digital downloads
• Intimate or sanitary goods`,
    },
    {
      title: "3. Return Process",
      content: `To initiate a return:
1. Log in to your account and go to "My Orders".
2. Select the order and item you wish to return.
3. Follow the instructions to print a return shipping label.
4. Pack the item securely and attach the shipping label.
5. Drop off the package at the designated carrier location.`,
    },
    {
      title: "4. Refunds",
      content: `Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-7 business days.`,
    },
    {
      title: "5. Return Shipping",
      content: `If the return is due to our error (e.g., you received an incorrect or defective item), we will cover the return shipping costs.
If you are returning an item for other reasons (e.g., changed your mind), you will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.`,
    },
    {
      title: "6. Exchanges",
      content: `We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact our support team.`,
    },
    {
      title: "7. Contact Us",
      content: `If you have any questions about our Returns & Refunds Policy, please contact us at:

Email: returns@tajirjomlahub.com
Address: 123 Market Street, Suite 456, San Francisco, CA 94105`,
    },
  ];

  return (
    <PolicyLayout
      title="Returns & Refunds"
      description="Our commitment to your satisfaction."
      lastUpdated={new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      sections={sections}
    />
  );
}
