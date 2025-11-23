"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ContactClient } from "./contact-client";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { useLanguage } from "../../../components/providers/language-provider";
import { MotionWrapper } from "../../../components/ui/motion-wrapper";

export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -end-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/40 via-purple-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -start-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-secondary-900/40 via-blue-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper variant="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
              {t("home.contactPage.title")}
            </h1>
          </MotionWrapper>
          <MotionWrapper variant="fade-up" delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10">
              {t("home.contactPage.subtitle")}
            </p>
          </MotionWrapper>
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
              <MotionWrapper variant="slide-right" delay={0.3}>
                <div className="space-y-6">
                  <ContactInfoCard
                    icon={Mail}
                    title={t("home.contactPage.info.email.title")}
                    content="support@tajirjomlahub.com"
                    subContent={t("home.contactPage.info.email.sub")}
                    href="mailto:support@tajirjomlahub.com"
                  />
                  <ContactInfoCard
                    icon={Phone}
                    title={t("home.contactPage.info.phone.title")}
                    content="+1 (555) 123-4567"
                    subContent={t("home.contactPage.info.phone.sub")}
                    href="tel:+15551234567"
                  />
                  <ContactInfoCard
                    icon={MapPin}
                    title={t("home.contactPage.info.visit.title")}
                    content="123 Market Street"
                    subContent="San Francisco, CA 94105"
                    href="https://maps.google.com"
                  />
                  <ContactInfoCard
                    icon={Clock}
                    title={t("home.contactPage.info.hours.title")}
                    content={t("home.contactPage.info.hours.days")}
                    subContent={t("home.contactPage.info.hours.time")}
                  />
                </div>
              </MotionWrapper>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <MotionWrapper variant="slide-left" delay={0.4}>
                <div className="bg-neutral-100 dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      {t("home.contactPage.form.title")}
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      {t("home.contactPage.form.subtitle")}
                    </p>
                  </div>
                  <ContactClient />
                </div>
              </MotionWrapper>
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
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 lg:hover:scale-105">
      <div className="shrink-0 h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
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
