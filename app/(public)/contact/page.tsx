import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageSquare } from "lucide-react";

import { ContactClient } from "./contact-client";
import { Breadcrumb } from "../../../components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us | TajirJomla Hub",
  description:
    "Get in touch with our team for support, sales inquiries, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/40 via-purple-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-secondary-900/40 via-blue-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400 mb-10">
            Have questions about our marketplace? Our team is ready to assist
            you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative -mt-20 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Info Cards */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <ContactInfoCard
                  icon={Mail}
                  title="Email Us"
                  content="support@tajirjomlahub.com"
                  subContent="We'll respond within 24 hours."
                  href="mailto:support@tajirjomlahub.com"
                />
                <ContactInfoCard
                  icon={Phone}
                  title="Call Us"
                  content="+1 (555) 123-4567"
                  subContent="Mon-Fri from 8am to 5pm EST."
                  href="tel:+15551234567"
                />
                <ContactInfoCard
                  icon={MapPin}
                  title="Visit Us"
                  content="123 Market Street"
                  subContent="San Francisco, CA 94105"
                  href="https://maps.google.com"
                />
                <ContactInfoCard
                  icon={Clock}
                  title="Business Hours"
                  content="Monday - Friday"
                  subContent="9:00 AM - 6:00 PM"
                />
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Send us a message
                  </h2>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>
                <ContactClient />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ContactInfoCard({
  icon: Icon,
  title,
  content,
  subContent,
  href,
}: {
  icon: any;
  title: string;
  content: string;
  subContent?: string;
  href?: string;
}) {
  const CardContent = (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="shrink-0 h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
          {title}
        </h3>
        <p className="text-base font-medium text-neutral-700 dark:text-neutral-300">
          {content}
        </p>
        {subContent && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {subContent}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
