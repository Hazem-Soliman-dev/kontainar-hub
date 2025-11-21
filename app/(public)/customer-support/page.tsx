import { createMetadata } from "@/lib/seo/metadata";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  HelpCircle,
  FileText,
  Search,
  ArrowRight,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Customer Support",
  description:
    "Get help with your TajirJomla Hub account, orders, products, and more. Contact our 24/7 customer support team.",
  path: "/customer-support",
  keywords: ["support", "customer service", "help", "contact", "assistance"],
});

export default function CustomerSupportPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <div className="relative bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/40 via-purple-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-secondary-900/40 via-blue-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
            How can we help you?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-900 dark:text-neutral-200 mb-10">
            Search our help center or contact our support team for assistance.
          </p>
          
          <div className="relative mx-auto max-w-xl">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 opacity-50 blur transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-900 dark:text-neutral-200" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="h-12 w-full rounded-full border border-neutral-800 bg-neutral-900/90 pl-12 pr-4 text-neutral-900 dark:text-neutral-200 placeholder-neutral-900 dark:placeholder-neutral-200 shadow-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 -mt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Contact Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
            <ContactCard
              icon={Mail}
              title="Email Support"
              description="Send us an email and we'll respond within 24 hours"
              contact="support@tajirjomlahub.com"
              action="mailto:support@tajirjomlahub.com"
              color="blue"
            />
            <ContactCard
              icon={Phone}
              title="Phone Support"
              description="Call us for immediate assistance during business hours"
              contact="+1 (555) 123-4567"
              action="tel:+15551234567"
              color="indigo"
            />
            <ContactCard
              icon={MessageSquare}
              title="Live Chat"
              description="Chat with our support team in real-time"
              contact="Available 24/7"
              action="#"
              color="purple"
            />
            <ContactCard
              icon={Clock}
              title="Response Times"
              description="We aim to respond to all inquiries quickly"
              contact="Within 24 hours"
              action={null}
              color="emerald"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-3xl mb-6">
                Common Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "How do I create an account?", a: "Click on the 'Register' button in the top navigation, fill in your details, and verify your email address." },
                  { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox." },
                  { q: "How do I place an order?", a: "Browse products, add items to your cart, and proceed to checkout. You'll need an active subscription plan to complete purchases." },
                  { q: "How do I track my order?", a: "Go to your account dashboard and navigate to the 'Orders' section. You'll find tracking information for all your orders there." },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-200 mb-2">{item.q}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/faq" className="inline-flex items-center text-primary-700 hover:text-primary-700 font-bold group">
                  View all FAQs <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-3xl mb-6">
                Helpful Resources
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ResourceCard
                  icon={HelpCircle}
                  title="FAQs"
                  description="Find answers to frequently asked questions"
                  link="/faq"
                  color="blue"
                />
                <ResourceCard
                  icon={FileText}
                  title="Shipping Info"
                  description="Learn about our shipping policies and options"
                  link="/shipping-info"
                  color="indigo"
                />
                <ResourceCard
                  icon={FileText}
                  title="Returns & Refunds"
                  description="Understand our return policy and process"
                  link="/returns-refunds"
                  color="purple"
                />
                <ResourceCard
                  icon={FileText}
                  title="Seller Agreement"
                  description="Read our terms for selling on TajirJomla Hub"
                  link="/seller-agreement"
                  color="emerald"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ContactCard({ icon: Icon, title, description, contact, action, color }: any) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  const Component = action ? Link : "div";
  const href = action || "";

  return (
    <Component
      href={href}
      className={`flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm transition-all ${action ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''}`}
    >
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${colorStyles[color as keyof typeof colorStyles]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-bold text-neutral-900 dark:text-neutral-200 text-lg">{title}</h3>
        <p className="mt-1 text-sm text-neutral-900 dark:text-neutral-200">{description}</p>
        {contact && (
          <p className="mt-3 text-sm font-bold text-primary-700 dark:text-primary-400">
            {contact}
          </p>
        )}
      </div>
    </Component>
  );
}

function ResourceCard({ icon: Icon, title, description, link, color }: any) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <Link
      href={link}
      className="flex items-start gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm transition-all hover:shadow-lg hover:border-primary-500/30 hover:-translate-y-0.5"
    >
      <div className={`mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${colorStyles[color as keyof typeof colorStyles]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
        <p className="mt-1 text-xs text-neutral-900 dark:text-neutral-200 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}


