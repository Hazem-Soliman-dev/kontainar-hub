import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { Cookie } from "lucide-react";

export const metadata = createMetadata({
  title: "Cookie Policy",
  description:
    "Learn about how Kontainar Hub uses cookies and similar tracking technologies to enhance your experience on our platform.",
  path: "/cookie-policy",
  keywords: ["cookies", "cookie policy", "tracking", "privacy"],
});

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <CookieContent />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <div className="flex items-center justify-center gap-3">
          <Cookie className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
            Cookie Policy
          </h1>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </section>
  );
}

function CookieContent() {
  const sections = [
    {
      title: "What Are Cookies",
      content: `Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies allow a website to recognize your device and store some information about your preferences or past actions.`,
    },
    {
      title: "How We Use Cookies",
      content: `Kontainar Hub uses cookies and similar tracking technologies to:
- Remember your preferences and settings
- Authenticate you and keep you logged in
- Analyze how you use our platform to improve our services
- Provide personalized content and advertisements
- Measure the effectiveness of our marketing campaigns
- Ensure the security of our platform`,
    },
    {
      title: "Types of Cookies We Use",
      content: `We use the following types of cookies:

Essential Cookies: These are necessary for the platform to function properly. They enable core functionality such as security, network management, and accessibility.

Performance Cookies: These help us understand how visitors interact with our platform by collecting and reporting information anonymously.

Functionality Cookies: These allow the platform to remember choices you make and provide enhanced, personalized features.

Targeting Cookies: These are used to deliver advertisements that are relevant to you and your interests.`,
    },
    {
      title: "Third-Party Cookies",
      content: `In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the platform, deliver advertisements, and so on. These third parties may include:
- Analytics providers (e.g., Google Analytics)
- Advertising networks
- Social media platforms
- Payment processors`,
    },
    {
      title: "Managing Cookies",
      content: `You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your browser settings. Most browsers allow you to:
- See what cookies you have and delete them individually
- Block third-party cookies
- Block cookies from particular sites
- Block all cookies from being set
- Delete all cookies when you close your browser

Please note that if you choose to block or delete cookies, some features of our platform may not function properly.`,
    },
    {
      title: "Cookie Consent",
      content: `When you first visit our platform, we will ask for your consent to use non-essential cookies. You can withdraw your consent at any time by adjusting your cookie preferences in your browser settings or by contacting us.`,
    },
    {
      title: "Updates to This Policy",
      content: `We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last updated" date.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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

