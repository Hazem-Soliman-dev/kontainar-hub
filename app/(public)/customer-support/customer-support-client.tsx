"use client";

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
import { useLanguage } from "../../../components/providers/language-provider";

export function CustomerSupportClient() {
  const { t } = useLanguage();

  const commonQuestions = [
    { 
      q: t("home.customerSupportPage.questions.question1.q"), 
      a: t("home.customerSupportPage.questions.question1.a") 
    },
    { 
      q: t("home.customerSupportPage.questions.question2.q"), 
      a: t("home.customerSupportPage.questions.question2.a") 
    },
    { 
      q: t("home.customerSupportPage.questions.question3.q"), 
      a: t("home.customerSupportPage.questions.question3.a") 
    },
    { 
      q: t("home.customerSupportPage.questions.question4.q"), 
      a: t("home.customerSupportPage.questions.question4.a") 
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
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
            {t("home.customerSupportPage.hero.title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10">
            {t("home.customerSupportPage.hero.description")}
          </p>
          
          <div className="relative mx-auto max-w-xl">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 opacity-50 blur transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                <input
                  type="text"
                  placeholder={t("home.customerSupportPage.hero.searchPlaceholder")}
                  className="h-12 w-full rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 pl-12 pr-4 text-neutral-900 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
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
              title={t("home.customerSupportPage.contact.email.title")}
              description={t("home.customerSupportPage.contact.email.description")}
              contact={t("home.customerSupportPage.contact.email.contact")}
              action="mailto:support@tajirjomlahub.com"
              color="blue"
            />
            <ContactCard
              icon={Phone}
              title={t("home.customerSupportPage.contact.phone.title")}
              description={t("home.customerSupportPage.contact.phone.description")}
              contact={t("home.customerSupportPage.contact.phone.contact")}
              action="tel:+15551234567"
              color="indigo"
            />
            <ContactCard
              icon={MessageSquare}
              title={t("home.customerSupportPage.contact.chat.title")}
              description={t("home.customerSupportPage.contact.chat.description")}
              contact={t("home.customerSupportPage.contact.chat.contact")}
              action="#"
              color="purple"
            />
            <ContactCard
              icon={Clock}
              title={t("home.customerSupportPage.contact.response.title")}
              description={t("home.customerSupportPage.contact.response.description")}
              contact={t("home.customerSupportPage.contact.response.contact")}
              action={null}
              color="emerald"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-3xl mb-6">
                {t("home.customerSupportPage.commonQuestions.title")}
              </h2>
              <div className="space-y-4">
                {commonQuestions.map((item, i) => (
                  <div key={i} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-200 mb-2">{item.q}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/faq" className="inline-flex items-center text-primary-700 hover:text-primary-700 font-bold group">
                  {t("home.customerSupportPage.commonQuestions.viewAll")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-3xl mb-6">
                {t("home.customerSupportPage.resources.title")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ResourceCard
                  icon={HelpCircle}
                  title={t("home.customerSupportPage.resources.faq.title")}
                  description={t("home.customerSupportPage.resources.faq.description")}
                  link="/faq"
                  color="blue"
                />
                <ResourceCard
                  icon={FileText}
                  title={t("home.customerSupportPage.resources.shipping.title")}
                  description={t("home.customerSupportPage.resources.shipping.description")}
                  link="/shipping-info"
                  color="indigo"
                />
                <ResourceCard
                  icon={FileText}
                  title={t("home.customerSupportPage.resources.returns.title")}
                  description={t("home.customerSupportPage.resources.returns.description")}
                  link="/returns-refunds"
                  color="purple"
                />
                <ResourceCard
                  icon={FileText}
                  title={t("home.customerSupportPage.resources.seller.title")}
                  description={t("home.customerSupportPage.resources.seller.description")}
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
  const { t } = useLanguage();
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
      className={`flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm transition-all ${action ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''}`}
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
      className="flex items-start gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4 shadow-sm transition-all hover:shadow-lg hover:border-primary-500/30 hover:-translate-y-0.5"
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

