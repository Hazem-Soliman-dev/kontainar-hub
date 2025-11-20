import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { Shield } from "lucide-react";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read Kontainar Hub's Privacy Policy to understand how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
  keywords: ["privacy", "privacy policy", "data protection", "personal information"],
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <PolicyContent />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <div className="flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
            Privacy Policy
          </h1>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </section>
  );
}

function PolicyContent() {
  const sections = [
    {
      title: "Introduction",
      content: `At Kontainar Hub, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our marketplace platform. Please read this policy carefully to understand our practices regarding your personal data.`,
    },
    {
      title: "Information We Collect",
      content: `We collect information that you provide directly to us, including:
- Account information (name, email address, password)
- Profile information (business details, preferences)
- Transaction information (order history, payment details)
- Communication data (messages, support tickets)
- Usage data (how you interact with our platform)
- Device information (IP address, browser type, device identifiers)`,
    },
    {
      title: "How We Use Your Information",
      content: `We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send you technical notices and support messages
- Respond to your comments and questions
- Monitor and analyze trends and usage
- Detect, prevent, and address technical issues
- Personalize your experience on our platform`,
    },
    {
      title: "Information Sharing",
      content: `We do not sell your personal information. We may share your information in the following circumstances:
- With service providers who assist us in operating our platform
- When required by law or to protect our rights
- In connection with a business transfer or merger
- With your consent or at your direction`,
    },
    {
      title: "Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: "Your Rights",
      content: `You have the right to:
- Access and receive a copy of your personal data
- Rectify inaccurate or incomplete data
- Request deletion of your personal data
- Object to processing of your personal data
- Request restriction of processing
- Data portability
- Withdraw consent at any time`,
    },
    {
      title: "Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.`,
    },
    {
      title: "Children's Privacy",
      content: `Our platform is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.`,
    },
    {
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us at:
- Email: privacy@kontainarhub.com
- Address: [Your Company Address]
- Phone: +1 (555) 123-4567`,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12 mb-8 sm:mb-12">
      {sections.map((section, index) => (
        <div
          key={index}
          className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-900 mb-4">
            {section.title}
          </h2>
          <div className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 leading-relaxed whitespace-pre-line">
            {section.content}
          </div>
        </div>
      ))}
    </section>
  );
}

