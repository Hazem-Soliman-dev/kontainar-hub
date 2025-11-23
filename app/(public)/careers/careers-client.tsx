"use client";

import { 
  Briefcase, 
  Users, 
  Heart, 
  Zap, 
  Globe2, 
  DollarSign, 
  GraduationCap,
  Calendar,
  MapPin,
  ArrowRight,
  Mail,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { useLanguage } from "../../../components/providers/language-provider";
import { MotionWrapper } from "../../../components/ui/motion-wrapper";

export function CareersClient() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t("home.careersPage.benefits.compensation.title"),
      description: t("home.careersPage.benefits.compensation.description"),
      color: "blue",
    },
    {
      icon: Heart,
      title: t("home.careersPage.benefits.health.title"),
      description: t("home.careersPage.benefits.health.description"),
      color: "emerald",
    },
    {
      icon: GraduationCap,
      title: t("home.careersPage.benefits.learning.title"),
      description: t("home.careersPage.benefits.learning.description"),
      color: "purple",
    },
    {
      icon: Calendar,
      title: t("home.careersPage.benefits.flexible.title"),
      description: t("home.careersPage.benefits.flexible.description"),
      color: "indigo",
    },
    {
      icon: Globe2,
      title: t("home.careersPage.benefits.impact.title"),
      description: t("home.careersPage.benefits.impact.description"),
      color: "blue",
    },
    {
      icon: Zap,
      title: t("home.careersPage.benefits.innovation.title"),
      description: t("home.careersPage.benefits.innovation.description"),
      color: "purple",
    },
  ];

  const openPositions = [
    {
      title: t("home.careersPage.positions.seniorDeveloper.title"),
      department: t("home.careersPage.positions.seniorDeveloper.department"),
      location: t("home.careersPage.positions.seniorDeveloper.location"),
      type: t("home.careersPage.positions.seniorDeveloper.type"),
    },
    {
      title: t("home.careersPage.positions.productManager.title"),
      department: t("home.careersPage.positions.productManager.department"),
      location: t("home.careersPage.positions.productManager.location"),
      type: t("home.careersPage.positions.productManager.type"),
    },
    {
      title: t("home.careersPage.positions.uxDesigner.title"),
      department: t("home.careersPage.positions.uxDesigner.department"),
      location: t("home.careersPage.positions.uxDesigner.location"),
      type: t("home.careersPage.positions.uxDesigner.type"),
    },
    {
      title: t("home.careersPage.positions.businessDev.title"),
      department: t("home.careersPage.positions.businessDev.department"),
      location: t("home.careersPage.positions.businessDev.location"),
      type: t("home.careersPage.positions.businessDev.type"),
    },
    {
      title: t("home.careersPage.positions.customerSuccess.title"),
      department: t("home.careersPage.positions.customerSuccess.department"),
      location: t("home.careersPage.positions.customerSuccess.location"),
      type: t("home.careersPage.positions.customerSuccess.type"),
    },
    {
      title: t("home.careersPage.positions.dataAnalyst.title"),
      department: t("home.careersPage.positions.dataAnalyst.department"),
      location: t("home.careersPage.positions.dataAnalyst.location"),
      type: t("home.careersPage.positions.dataAnalyst.type"),
    },
  ];

  const values = [
    t("home.careersPage.values.innovation"),
    t("home.careersPage.values.transparency"),
    t("home.careersPage.values.workLifeBalance"),
    t("home.careersPage.values.diversity"),
    t("home.careersPage.values.customerFirst"),
    t("home.careersPage.values.collaboration"),
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <PageHeader
        title={t("home.careersPage.hero.title")}
        description={t("home.careersPage.hero.description")}
      />

      <ContentSection>
        <div className="mx-auto max-w-7xl">
          {/* Why Work Here Section */}
          <MotionWrapper variant="fade-up" delay={0.1} className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                {t("home.careersPage.whyWork.title")}
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                {t("home.careersPage.whyWork.description")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </MotionWrapper>

          {/* Our Values Section */}
          <MotionWrapper variant="scale-up" delay={0.2} className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-8 text-center">
                {t("home.careersPage.values.title")}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-900 dark:text-neutral-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>

          {/* Open Positions Section */}
          <MotionWrapper variant="fade-up" delay={0.3} className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                {t("home.careersPage.openPositions.title")}
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                {t("home.careersPage.openPositions.description")}
              </p>
            </div>

            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <JobCard key={index} {...position} />
              ))}
            </div>
          </MotionWrapper>

          {/* Application Process Section */}
          <MotionWrapper variant="scale-up" delay={0.4} className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-8 text-center">
                {t("home.careersPage.process.title")}
              </h2>
              <div className="space-y-6">
                <ProcessStep
                  number="1"
                  title={t("home.careersPage.process.steps.apply.title")}
                  description={t("home.careersPage.process.steps.apply.description")}
                />
                <ProcessStep
                  number="2"
                  title={t("home.careersPage.process.steps.review.title")}
                  description={t("home.careersPage.process.steps.review.description")}
                />
                <ProcessStep
                  number="3"
                  title={t("home.careersPage.process.steps.interview.title")}
                  description={t("home.careersPage.process.steps.interview.description")}
                />
                <ProcessStep
                  number="4"
                  title={t("home.careersPage.process.steps.offer.title")}
                  description={t("home.careersPage.process.steps.offer.description")}
                />
              </div>
            </div>
          </MotionWrapper>

          {/* Contact Section */}
          <ContentSection className="bg-neutral-100/50 dark:bg-neutral-900/50">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-4">
                {t("home.careersPage.contact.title")}
              </h2>
              <p className="text-neutral-900 dark:text-neutral-200 mb-8">
                {t("home.careersPage.contact.description")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-8 py-3 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
                >
                  {t("home.careersPage.contact.contactUs")}
                  <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                </Link>
                <a
                  href="mailto:careers@tajirjomlahub.com"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-8 py-3 text-sm font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4 rtl:rotate-180" />
                  careers@tajirjomlahub.com
                </a>
              </div>
            </div>
          </ContentSection>
        </div>
      </ContentSection>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 lg:hover:scale-[1.02] duration-500">
      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[color as keyof typeof colorStyles]}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
      <p className="flex-1 text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function JobCard({ title, department, location, type }: { title: string, department: string, location: string, type: string }) {
  const { t } = useLanguage();
  
  return (
    <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 lg:hover:scale-[1.01] duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {type}
            </span>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-6 py-2.5 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors whitespace-nowrap"
        >
          {t("home.careersPage.openPositions.applyNow")}
          <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200 mb-2">{title}</h3>
        <p className="text-neutral-900 dark:text-neutral-200">{description}</p>
      </div>
    </div>
  );
}

