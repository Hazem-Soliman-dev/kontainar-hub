"use client";

import {
  Store,
  BarChart3,
  Package,
  Shield,
  Search,
  Users,
  TrendingUp,
  HeadphonesIcon,
  ArrowRight,
  Zap,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../../../components/providers/language-provider";
import { MotionWrapper } from "../../../components/ui/motion-wrapper";

export function ServicesClient() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Store,
      title: t("home.servicesPage.services.marketplace.title"),
      description: t("home.servicesPage.services.marketplace.description"),
      color: "blue",
    },
    {
      icon: BarChart3,
      title: t("home.servicesPage.services.analytics.title"),
      description: t("home.servicesPage.services.analytics.description"),
      color: "indigo",
    },
    {
      icon: Package,
      title: t("home.servicesPage.services.inventory.title"),
      description: t("home.servicesPage.services.inventory.description"),
      color: "purple",
    },
    {
      icon: Shield,
      title: t("home.servicesPage.services.secure.title"),
      description: t("home.servicesPage.services.secure.description"),
      color: "emerald",
    },
    {
      icon: Search,
      title: t("home.servicesPage.services.search.title"),
      description: t("home.servicesPage.services.search.description"),
      color: "blue",
    },
    {
      icon: Users,
      title: t("home.servicesPage.services.tools.title"),
      description: t("home.servicesPage.services.tools.description"),
      color: "indigo",
    },
    {
      icon: TrendingUp,
      title: t("home.servicesPage.services.insights.title"),
      description: t("home.servicesPage.services.insights.description"),
      color: "purple",
    },
    {
      icon: HeadphonesIcon,
      title: t("home.servicesPage.services.support.title"),
      description: t("home.servicesPage.services.support.description"),
      color: "emerald",
    },
    {
      icon: Globe2,
      title: t("home.servicesPage.services.logistics.title"),
      description: t("home.servicesPage.services.logistics.description"),
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/40 via-purple-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-secondary-900/40 via-blue-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
        </div>

        <MotionWrapper variant="fade-up" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
            {t("home.servicesPage.hero.title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10">
            {t("home.servicesPage.hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white px-8 py-3 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
            >
              {t("home.servicesPage.hero.getStarted")}
              <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 px-8 py-3 text-sm font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {t("home.servicesPage.hero.contactSales")}
            </Link>
          </div>
        </MotionWrapper>
      </div>

      <main className="relative z-10 -mt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <MotionWrapper key={index} delay={index * 0.1} variant="fade-up">
                <ServiceCard {...service} />
              </MotionWrapper>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionWrapper variant="scale-up" delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 to-secondary-900 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-white/10 via-white/5 to-transparent -rotate-12 blur-3xl opacity-30" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-6">
                  {t("home.servicesPage.cta.title")}
                </h2>
                <p className="text-lg text-neutral-900 dark:text-neutral-200 mb-8">
                  {t("home.servicesPage.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-neutral-100 px-8 py-3 text-sm font-bold hover:bg-neutral-800 transition-colors shadow-lg shadow-black/20"
                  >
                    {t("home.servicesPage.cta.createAccount")}
                    <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900/50 backdrop-blur-sm border border-neutral-900/70 text-neutral-100 px-8 py-3 text-sm font-bold hover:bg-neutral-800/70 transition-colors"
                  >
                    {t("home.servicesPage.cta.contactSales")}
                  </Link>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </section>
      </main>
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
}) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple:
      "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 lg:hover:scale-[1.02] duration-500">
      <div
        className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
          colorStyles[color as keyof typeof colorStyles]
        }`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">
        {title}
      </h3>
      <p className="flex-1 text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
