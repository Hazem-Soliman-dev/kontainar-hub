"use client";

import { 
  Newspaper, 
  Download, 
  Mail, 
  FileText, 
  Image as ImageIcon,
  Users,
  Globe2,
  TrendingUp,
  Calendar,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { useLanguage } from "../../../components/providers/language-provider";

export function PressClient() {
  const { t } = useLanguage();

  const pressReleases = [
    {
      date: t("home.pressPage.releases.release1.date"),
      title: t("home.pressPage.releases.release1.title"),
      excerpt: t("home.pressPage.releases.release1.excerpt"),
      category: t("home.pressPage.releases.release1.category"),
    },
    {
      date: t("home.pressPage.releases.release2.date"),
      title: t("home.pressPage.releases.release2.title"),
      excerpt: t("home.pressPage.releases.release2.excerpt"),
      category: t("home.pressPage.releases.release2.category"),
    },
    {
      date: t("home.pressPage.releases.release3.date"),
      title: t("home.pressPage.releases.release3.title"),
      excerpt: t("home.pressPage.releases.release3.excerpt"),
      category: t("home.pressPage.releases.release3.category"),
    },
    {
      date: t("home.pressPage.releases.release4.date"),
      title: t("home.pressPage.releases.release4.title"),
      excerpt: t("home.pressPage.releases.release4.excerpt"),
      category: t("home.pressPage.releases.release4.category"),
    },
  ];

  const mediaKit = [
    {
      icon: ImageIcon,
      title: t("home.pressPage.mediaKit.logo.title"),
      description: t("home.pressPage.mediaKit.logo.description"),
      action: t("home.pressPage.mediaKit.logo.action"),
    },
    {
      icon: FileText,
      title: t("home.pressPage.mediaKit.factSheet.title"),
      description: t("home.pressPage.mediaKit.factSheet.description"),
      action: t("home.pressPage.mediaKit.factSheet.action"),
    },
    {
      icon: Users,
      title: t("home.pressPage.mediaKit.bios.title"),
      description: t("home.pressPage.mediaKit.bios.description"),
      action: t("home.pressPage.mediaKit.bios.action"),
    },
    {
      icon: ImageIcon,
      title: t("home.pressPage.mediaKit.screenshots.title"),
      description: t("home.pressPage.mediaKit.screenshots.description"),
      action: t("home.pressPage.mediaKit.screenshots.action"),
    },
  ];

  const companyFacts = [
    { label: t("home.pressPage.facts.founded.label"), value: t("home.pressPage.facts.founded.value") },
    { label: t("home.pressPage.facts.headquarters.label"), value: t("home.pressPage.facts.headquarters.value") },
    { label: t("home.pressPage.facts.businesses.label"), value: t("home.pressPage.facts.businesses.value") },
    { label: t("home.pressPage.facts.countries.label"), value: t("home.pressPage.facts.countries.value") },
    { label: t("home.pressPage.facts.team.label"), value: t("home.pressPage.facts.team.value") },
    { label: t("home.pressPage.facts.products.label"), value: t("home.pressPage.facts.products.value") },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <PageHeader
        title={t("home.pressPage.hero.title")}
        description={t("home.pressPage.hero.description")}
      />

      <ContentSection>
        <div className="mx-auto max-w-7xl">
          {/* Press Releases Section */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                {t("home.pressPage.releases.title")}
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                {t("home.pressPage.releases.description")}
              </p>
            </div>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <PressReleaseCard key={index} {...release} />
              ))}
            </div>
          </div>

          {/* Company Facts Section */}
          <div className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-8 text-center">
                {t("home.pressPage.facts.title")}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companyFacts.map((fact, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {fact.value}
                    </div>
                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Kit Section */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                {t("home.pressPage.mediaKit.title")}
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                {t("home.pressPage.mediaKit.description")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {mediaKit.map((item, index) => (
                <MediaKitCard key={index} {...item} />
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-6 text-center">
                {t("home.pressPage.about.title")}
              </h2>
              <div className="space-y-4 text-lg text-neutral-900 dark:text-neutral-200 leading-relaxed">
                <p>
                  {t("home.pressPage.about.paragraph1")}
                </p>
                <p>
                  {t("home.pressPage.about.paragraph2")}
                </p>
                <p>
                  {t("home.pressPage.about.paragraph3")}
                </p>
              </div>
            </div>
          </div>

          {/* Press Contact Section */}
          <ContentSection className="bg-neutral-100/50 dark:bg-neutral-900/50">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-4">
                {t("home.pressPage.contact.title")}
              </h2>
              <p className="text-neutral-900 dark:text-neutral-200 mb-8">
                {t("home.pressPage.contact.description")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:press@tajirjomlahub.com"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-8 py-3 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4 rtl:rotate-180" />
                  press@tajirjomlahub.com
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white px-8 py-3 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
                >
                  {t("home.pressPage.contact.contactForm")}
                  <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left">
                <h3 className="font-bold text-neutral-900 dark:text-neutral-200 mb-4">{t("home.pressPage.contact.info.title")}</h3>
                <div className="space-y-2 text-sm text-neutral-900 dark:text-neutral-200">
                  <p><strong>{t("home.pressPage.contact.info.email.label")}:</strong> {t("home.pressPage.contact.info.email.value")}</p>
                  <p><strong>{t("home.pressPage.contact.info.phone.label")}:</strong> {t("home.pressPage.contact.info.phone.value")}</p>
                  <p><strong>{t("home.pressPage.contact.info.address.label")}:</strong> {t("home.pressPage.contact.info.address.value")}</p>
                  <p><strong>{t("home.pressPage.contact.info.responseTime.label")}:</strong> {t("home.pressPage.contact.info.responseTime.value")}</p>
                </div>
              </div>
            </div>
          </ContentSection>
        </div>
      </ContentSection>
    </div>
  );
}

function PressReleaseCard({ date, title, excerpt, category }: { date: string, title: string, excerpt: string, category: string }) {
  const { t } = useLanguage();
  
  return (
    <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
            {title}
          </h3>
          <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed">
            {excerpt}
          </p>
        </div>
        <Link
          href="/contact"
          className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-4 py-2 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
        >
          {t("home.pressPage.releases.readMore")}
          <ExternalLink className="ml-2 h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}

function MediaKitCard({ icon: Icon, title, description, action }: { icon: any, title: string, description: string, action: string }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
      <p className="mb-6 flex-1 text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
      <button className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-6 py-2.5 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors w-full sm:w-auto">
        <Download className="mr-2 h-4 w-4 rtl:rotate-180" />
        {action}
      </button>
    </div>
  );
}

