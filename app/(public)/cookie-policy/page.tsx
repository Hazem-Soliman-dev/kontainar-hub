import { createMetadata } from "@/lib/seo/metadata";
import { PolicyLayout } from "@/components/ui/policy-layout";

export const metadata = createMetadata({
  title: "Cookie Policy",
  description:
    "Learn about how TajirJomla Hub uses cookies and similar technologies to improve your experience.",
  path: "/cookie-policy",
  keywords: ["cookies", "tracking", "privacy", "data"],
});

export default function CookiePolicyPage() {
  const sections = [
    {
      title: "1. What Are Cookies?",
      content: `Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.`,
    },
    {
      title: "2. How We Use Cookies",
      content: `We use cookies for several purposes, including:
• Essential Cookies: These are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.
• Performance Cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously.
• Functionality Cookies: These allow the website to remember choices you make (such as your username, language, or region) and provide enhanced features.
• Targeting Cookies: These are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.`,
    },
    {
      title: "3. Third-Party Cookies",
      content: `In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.`,
    },
    {
      title: "4. Managing Cookies",
      content: `You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.`,
    },
    {
      title: "5. Changes to This Cookie Policy",
      content: `We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.`,
    },
    {
      title: "6. Contact Us",
      content: `If you have any questions about our Cookie Policy, please contact us at:

Email: privacy@tajirjomlahub.com
Address: 123 Market Street, Suite 456, San Francisco, CA 94105`,
    },
  ];

  return (
    <PolicyLayout
      title="Cookie Policy"
      description="Understanding how and why we use cookies on our platform."
      lastUpdated={new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      sections={sections}
    />
  );
}
