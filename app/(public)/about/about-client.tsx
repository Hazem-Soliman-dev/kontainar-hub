"use client";

import { Building2, Users, Target, Award, CheckCircle2, Globe2, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "../../../components/providers/language-provider";
import { MotionWrapper } from "../../../components/ui/motion-wrapper";

export function AboutClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/40 via-purple-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-secondary-900/40 via-blue-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper variant="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
              {t("home.aboutPage.hero.title")}
            </h1>
          </MotionWrapper>
          <MotionWrapper variant="fade-up" delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10">
              {t("home.aboutPage.hero.description")}
            </p>
          </MotionWrapper>
        </div>
      </div>

      <main className="relative z-10">
        {/* Mission Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <MotionWrapper variant="slide-right" delay={0.2}>
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl">
                  {t("home.aboutPage.mission.title")}
                </h2>
                <div className="space-y-6 text-lg text-neutral-900 dark:text-neutral-200">
                  <p>
                    {t("home.aboutPage.mission.paragraph1")}
                  </p>
                  <p>
                    {t("home.aboutPage.mission.paragraph2")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-1">
                      {t("home.aboutPage.mission.stats.countries.value")}
                    </div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                      {t("home.aboutPage.mission.stats.countries.label")}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-3xl font-bold text-secondary-700 dark:text-secondary-400 mb-1">
                      {t("home.aboutPage.mission.stats.businesses.value")}
                    </div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                      {t("home.aboutPage.mission.stats.businesses.label")}
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
            <MotionWrapper variant="slide-left" delay={0.4}>
              <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
                    <Globe2 className="h-32 w-32 text-neutral-300 dark:text-neutral-700 opacity-50" />
                 </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-neutral-50 dark:bg-neutral-900/50 py-20 sm:py-24 border-y border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                {t("home.aboutPage.values.title")}
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                {t("home.aboutPage.values.description")}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <MotionWrapper delay={0.1} className="h-full">
                <ValueCard
                  icon={Target}
                  title={t("home.aboutPage.values.cards.trust.title")}
                  description={t("home.aboutPage.values.cards.trust.description")}
                  color="blue"
                />
              </MotionWrapper>
              <MotionWrapper delay={0.2} className="h-full">
                <ValueCard
                  icon={Users}
                  title={t("home.aboutPage.values.cards.customer.title")}
                  description={t("home.aboutPage.values.cards.customer.description")}
                  color="indigo"
                />
              </MotionWrapper>
              <MotionWrapper delay={0.3} className="h-full">
                <ValueCard
                  icon={Zap}
                  title={t("home.aboutPage.values.cards.innovation.title")}
                  description={t("home.aboutPage.values.cards.innovation.description")}
                  color="purple"
                />
              </MotionWrapper>
              <MotionWrapper delay={0.4} className="h-full">
                <ValueCard
                  icon={Award}
                  title={t("home.aboutPage.values.cards.excellence.title")}
                  description={t("home.aboutPage.values.cards.excellence.description")}
                  color="emerald"
                />
              </MotionWrapper>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
              {t("home.aboutPage.whyChoose.title")}
            </h2>
            <p className="text-lg text-neutral-900 dark:text-neutral-200">
              {t("home.aboutPage.whyChoose.description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                title: t("home.aboutPage.whyChoose.features.globalReach.title"), 
                desc: t("home.aboutPage.whyChoose.features.globalReach.desc"), 
                icon: Globe2 
              },
              { 
                title: t("home.aboutPage.whyChoose.features.verifiedPartners.title"), 
                desc: t("home.aboutPage.whyChoose.features.verifiedPartners.desc"), 
                icon: ShieldCheck 
              },
              { 
                title: t("home.aboutPage.whyChoose.features.securePayments.title"), 
                desc: t("home.aboutPage.whyChoose.features.securePayments.desc"), 
                icon: CheckCircle2 
              },
              { 
                title: t("home.aboutPage.whyChoose.features.support.title"), 
                desc: t("home.aboutPage.whyChoose.features.support.desc"), 
                icon: Users 
              },
              { 
                title: t("home.aboutPage.whyChoose.features.analytics.title"), 
                desc: t("home.aboutPage.whyChoose.features.analytics.desc"), 
                icon: Target 
              },
              { 
                title: t("home.aboutPage.whyChoose.features.shipping.title"), 
                desc: t("home.aboutPage.whyChoose.features.shipping.desc"), 
                icon: Zap 
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex-shrink-0 mt-1 rounded-xl bg-primary-50 dark:bg-primary-900/20 p-2 text-primary-700 dark:text-primary-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-200 text-lg mb-1">{item.title}</h3>
                  <p className="text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 lg:hover:scale-105 duration-500 h-full">
      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[color as keyof typeof colorStyles]}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
      <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

