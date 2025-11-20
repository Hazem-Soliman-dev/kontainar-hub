import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { FileText } from "lucide-react";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read Kontainar Hub's Terms of Service to understand the rules and guidelines for using our marketplace platform.",
  path: "/terms-of-service",
  keywords: ["terms", "terms of service", "user agreement", "legal"],
});

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <TermsContent />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <div className="flex items-center justify-center gap-3">
          <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
            Terms of Service
          </h1>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </section>
  );
}

function TermsContent() {
  const sections = [
    {
      title: "Agreement to Terms",
      content: `By accessing or using Kontainar Hub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.`,
    },
    {
      title: "Use License",
      content: `Permission is granted to temporarily access and use Kontainar Hub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
- Modify or copy the materials
- Use the materials for any commercial purpose or for any public display
- Attempt to reverse engineer any software contained on the platform
- Remove any copyright or other proprietary notations from the materials`,
    },
    {
      title: "User Accounts",
      content: `To access certain features of our platform, you must register for an account. You are responsible for:
- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Providing accurate and complete information
- Notifying us immediately of any unauthorized use of your account`,
    },
    {
      title: "User Conduct",
      content: `You agree not to:
- Violate any applicable laws or regulations
- Infringe upon the rights of others
- Transmit any harmful, offensive, or illegal content
- Interfere with or disrupt the platform or servers
- Use automated systems to access the platform without permission
- Impersonate any person or entity`,
    },
    {
      title: "Products and Services",
      content: `We strive to provide accurate information about products and services on our platform. However:
- We do not warrant the accuracy, completeness, or usefulness of any information
- Product descriptions, images, and prices are subject to change
- We reserve the right to refuse or cancel any order
- We are not responsible for products sold by third-party sellers`,
    },
    {
      title: "Payment Terms",
      content: `By making a purchase on our platform:
- You agree to pay all charges associated with your order
- Payment must be made through approved payment methods
- All prices are in the currency specified and are subject to change
- Refunds are subject to our Returns & Refunds policy`,
    },
    {
      title: "Intellectual Property",
      content: `All content on Kontainar Hub, including but not limited to text, graphics, logos, images, and software, is the property of Kontainar Hub or its content suppliers and is protected by copyright and other intellectual property laws.`,
    },
    {
      title: "Limitation of Liability",
      content: `In no event shall Kontainar Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform, even if we have been notified of the possibility of such damage.`,
    },
    {
      title: "Termination",
      content: `We may terminate or suspend your account and access to the platform immediately, without prior notice or liability, for any reason, including if you breach the Terms of Service.`,
    },
    {
      title: "Changes to Terms",
      content: `We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date.`,
    },
    {
      title: "Governing Law",
      content: `These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.`,
    },
    {
      title: "Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at:
- Email: legal@kontainarhub.com
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

