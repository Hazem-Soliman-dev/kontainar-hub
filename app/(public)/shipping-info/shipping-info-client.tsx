"use client";

import { Truck, Globe, Clock, MapPin, PackageCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { useLanguage } from "../../../components/providers/language-provider";

export function ShippingInfoClient() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Truck,
      title: t("home.shippingInfoPage.features.fast.title"),
      description: t("home.shippingInfoPage.features.fast.description"),
    },
    {
      icon: Globe,
      title: t("home.shippingInfoPage.features.global.title"),
      description: t("home.shippingInfoPage.features.global.description"),
    },
    {
      icon: PackageCheck,
      title: t("home.shippingInfoPage.features.secure.title"),
      description: t("home.shippingInfoPage.features.secure.description"),
    },
  ];

  const shippingMethods = [
    {
      method: t("home.shippingInfoPage.methods.standard.method"),
      deliveryTime: t("home.shippingInfoPage.methods.standard.deliveryTime"),
      cost: t("home.shippingInfoPage.methods.standard.cost"),
    },
    {
      method: t("home.shippingInfoPage.methods.express.method"),
      deliveryTime: t("home.shippingInfoPage.methods.express.deliveryTime"),
      cost: t("home.shippingInfoPage.methods.express.cost"),
    },
    {
      method: t("home.shippingInfoPage.methods.overnight.method"),
      deliveryTime: t("home.shippingInfoPage.methods.overnight.deliveryTime"),
      cost: t("home.shippingInfoPage.methods.overnight.cost"),
    },
    {
      method: t("home.shippingInfoPage.methods.international.method"),
      deliveryTime: t("home.shippingInfoPage.methods.international.deliveryTime"),
      cost: t("home.shippingInfoPage.methods.international.cost"),
    },
  ];

  const timelineItems = [
    {
      step: "1",
      title: t("home.shippingInfoPage.timeline.processing.title"),
      description: t("home.shippingInfoPage.timeline.processing.description"),
      icon: Clock,
    },
    {
      step: "2",
      title: t("home.shippingInfoPage.timeline.quality.title"),
      description: t("home.shippingInfoPage.timeline.quality.description"),
      icon: PackageCheck,
    },
    {
      step: "3",
      title: t("home.shippingInfoPage.timeline.shipped.title"),
      description: t("home.shippingInfoPage.timeline.shipped.description"),
      icon: Truck,
    },
    {
      step: "4",
      title: t("home.shippingInfoPage.timeline.delivery.title"),
      description: t("home.shippingInfoPage.timeline.delivery.description"),
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <PageHeader
        title={t("home.shippingInfoPage.hero.title")}
        description={t("home.shippingInfoPage.hero.description")}
      />

      <ContentSection>
        <div className="grid gap-8 md:grid-cols-3 mb-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
        </div>

        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-8 text-center">
                {t("home.shippingInfoPage.methods.title")}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-200">{t("home.shippingInfoPage.methods.table.method")}</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-200">{t("home.shippingInfoPage.methods.table.deliveryTime")}</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-200">{t("home.shippingInfoPage.methods.table.cost")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {shippingMethods.map((method, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-200">{method.method}</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">{method.deliveryTime}</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">{method.cost}</td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </ContentSection>

      <ContentSection className="bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="max-w-3xl mx-auto">
             <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-8 text-center">
                {t("home.shippingInfoPage.timeline.title")}
            </h2>
            <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <TimelineItem key={index} {...item} />
                ))}
            </div>
        </div>
      </ContentSection>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="mb-4 p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-neutral-200">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-2">{title}</h3>
            <p className="text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function TimelineItem({ step, title, description, icon: Icon }: any) {
    return (
        <div className="flex gap-4 md:gap-6">
            <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-neutral-100 dark:text-neutral-900 font-bold shadow-md z-10">
                    {step}
                </div>
                <div className="w-0.5 flex-1 bg-neutral-900 dark:bg-neutral-200 my-2"></div>
            </div>
            <div className="pb-8 pt-1">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
                    <Icon className="h-4 w-4 text-neutral-900 dark:text-neutral-200" />
                </div>
                <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

