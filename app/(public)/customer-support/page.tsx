import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  HelpCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Customer Support",
  description:
    "Get help with your Kontainar Hub account, orders, products, and more. Contact our 24/7 customer support team.",
  path: "/customer-support",
  keywords: ["support", "customer service", "help", "contact", "assistance"],
});

export default function CustomerSupportPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <ContactMethodsSection />
        <CommonIssuesSection />
        <ResourcesSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
          Customer Support
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          We're here to help! Get assistance with your account, orders,
          products, or any questions you may have.
        </p>
      </div>
    </section>
  );
}

function ContactMethodsSection() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@kontainarhub.com",
      action: "mailto:support@kontainarhub.com",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      color: "indigo",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 24/7",
      action: "#",
      color: "purple",
    },
    {
      icon: Clock,
      title: "Response Times",
      description: "We aim to respond to all inquiries quickly",
      contact: "Within 24 hours",
      action: null,
      color: "emerald",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-600/10 text-blue-300 border-blue-500/40",
    indigo: "bg-indigo-600/10 text-indigo-300 border-indigo-500/40",
    purple: "bg-purple-600/10 text-purple-300 border-purple-500/40",
    emerald: "bg-emerald-600/10 text-emerald-300 border-emerald-500/40",
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Contact Us
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          const colorClass =
            colorClasses[method.color as keyof typeof colorClasses];
          const Component = method.action ? Link : "div";
          return (
            <Component
              key={method.title}
              href={method.action || ""}
              className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <div
                className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${colorClass} border`}
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
                  {method.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                  {method.description}
                </p>
                {method.contact && (
                  <p className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition mt-2">
                    {method.contact}
                  </p>
                )}
              </div>
            </Component>
          );
        })}
      </div>
    </section>
  );
}

function CommonIssuesSection() {
  const issues = [
    {
      question: "How do I create an account?",
      answer:
        "Click on the 'Register' button in the top navigation, fill in your details, and verify your email address.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox.",
    },
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add items to your cart, and proceed to checkout. You'll need an active subscription plan to complete purchases.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Go to your account dashboard and navigate to the 'Orders' section. You'll find tracking information for all your orders there.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Common Questions
        </h2>
      </div>
      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900 mb-2">
              {issue.question}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
              {issue.answer}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          href="/faq"
          className="text-blue-400 hover:text-blue-300 transition font-semibold"
        >
          View All FAQs →
        </Link>
      </div>
    </section>
  );
}

function ResourcesSection() {
  const resources = [
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Find answers to frequently asked questions",
      link: "/faq",
      color: "blue",
    },
    {
      icon: FileText,
      title: "Shipping Info",
      description: "Learn about our shipping policies and options",
      link: "/shipping-info",
      color: "indigo",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-600/10 text-blue-300 border-blue-500/40",
    indigo: "bg-indigo-600/10 text-indigo-300 border-indigo-500/40",
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12 mb-8 sm:mb-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Helpful Resources
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const colorClass =
            colorClasses[resource.color as keyof typeof colorClasses];
          return (
            <Link
              key={resource.title}
              href={resource.link}
              className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <div
                className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${colorClass} border`}
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
                  {resource.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                  {resource.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

