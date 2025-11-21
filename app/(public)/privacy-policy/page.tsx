import { createMetadata } from "@/lib/seo/metadata";
import { PolicyLayout } from "@/components/ui/policy-layout";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read TajirJomla Hub's Privacy Policy to understand how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
  keywords: ["privacy", "privacy policy", "data protection", "personal information"],
});

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Introduction",
      content: `At TajirJomla Hub, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our marketplace platform. Please read this policy carefully to understand our practices regarding your personal data.`,
    },
    {
      title: "2. Information We Collect",
      content: `We collect information that you provide directly to us, including:
• Account information (name, email address, password)
• Profile information (business details, preferences)
• Transaction information (order history, payment details)
• Communication data (messages, support tickets)
• Usage data (how you interact with our platform)
• Device information (IP address, browser type, device identifiers)`,
    },
    {
      title: "3. How We Use Your Information",
      content: `We use the information we collect to:
• Provide, maintain, and improve our services
• Process transactions and send related information
• Send you technical notices and support messages
• Respond to your comments and questions
• Monitor and analyze trends and usage
• Detect, prevent, and address technical issues
• Personalize your experience on our platform`,
    },
    {
      title: "4. Information Sharing",
      content: `We do not sell your personal information. We may share your information in the following circumstances:
• With service providers who assist us in operating our platform
• When required by law or to protect our rights
• In connection with a business transfer or merger
• With your consent or at your direction`,
    },
    {
      title: "5. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: "6. Your Rights",
      content: `You have the right to:
• Access and receive a copy of your personal data
• Rectify inaccurate or incomplete data
• Request deletion of your personal data
• Object to processing of your personal data
• Request restriction of processing
• Data portability
• Withdraw consent at any time`,
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.`,
    },
    {
      title: "8. Children's Privacy",
      content: `Our platform is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.`,
    },
    {
      title: "9. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.`,
    },
    {
      title: "10. Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us at:

Email: privacy@tajirjomlahub.com
Address: 123 Market Street, Suite 456, San Francisco, CA 94105
Phone: +1 (555) 123-4567`,
    },
  ];

  return (
    <PolicyLayout
      title="Privacy Policy"
      description="We value your privacy and are committed to protecting your personal data."
      lastUpdated={new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      sections={sections}
    />
  );
}


