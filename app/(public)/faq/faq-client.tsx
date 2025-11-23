"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/accordion";
import Link from "next/link";
import { useLanguage } from "../../../components/providers/language-provider";

export function FAQClient() {
  const { t } = useLanguage();

  const faqCategories = [
    {
      category: t("home.faqPage.categories.account.category"),
      questions: [
        {
          title: t("home.faqPage.categories.account.questions.createAccount.title"),
          content: t("home.faqPage.categories.account.questions.createAccount.content"),
        },
        {
          title: t("home.faqPage.categories.account.questions.payToCreate.title"),
          content: t("home.faqPage.categories.account.questions.payToCreate.content"),
        },
        {
          title: t("home.faqPage.categories.account.questions.resetPassword.title"),
          content: t("home.faqPage.categories.account.questions.resetPassword.content"),
        },
        {
          title: t("home.faqPage.categories.account.questions.multipleAccounts.title"),
          content: t("home.faqPage.categories.account.questions.multipleAccounts.content"),
        },
      ],
    },
    {
      category: t("home.faqPage.categories.orders.category"),
      questions: [
        {
          title: t("home.faqPage.categories.orders.questions.placeOrder.title"),
          content: t("home.faqPage.categories.orders.questions.placeOrder.content"),
        },
        {
          title: t("home.faqPage.categories.orders.questions.cancelOrder.title"),
          content: t("home.faqPage.categories.orders.questions.cancelOrder.content"),
        },
        {
          title: t("home.faqPage.categories.orders.questions.trackOrder.title"),
          content: t("home.faqPage.categories.orders.questions.trackOrder.content"),
        },
        {
          title: t("home.faqPage.categories.orders.questions.paymentMethods.title"),
          content: t("home.faqPage.categories.orders.questions.paymentMethods.content"),
        },
      ],
    },
    {
      category: t("home.faqPage.categories.shipping.category"),
      questions: [
        {
          title: t("home.faqPage.categories.shipping.questions.shippingOptions.title"),
          content: t("home.faqPage.categories.shipping.questions.shippingOptions.content"),
        },
        {
          title: t("home.faqPage.categories.shipping.questions.internationalShipping.title"),
          content: t("home.faqPage.categories.shipping.questions.internationalShipping.content"),
        },
        {
          title: t("home.faqPage.categories.shipping.questions.damagedPackage.title"),
          content: t("home.faqPage.categories.shipping.questions.damagedPackage.content"),
        },
        {
          title: t("home.faqPage.categories.shipping.questions.changeAddress.title"),
          content: t("home.faqPage.categories.shipping.questions.changeAddress.content"),
        },
      ],
    },
    {
      category: t("home.faqPage.categories.subscriptions.category"),
      questions: [
        {
          title: t("home.faqPage.categories.subscriptions.questions.availablePlans.title"),
          content: t("home.faqPage.categories.subscriptions.questions.availablePlans.content"),
        },
        {
          title: t("home.faqPage.categories.subscriptions.questions.upgradeDowngrade.title"),
          content: t("home.faqPage.categories.subscriptions.questions.upgradeDowngrade.content"),
        },
        {
          title: t("home.faqPage.categories.subscriptions.questions.cancelSubscription.title"),
          content: t("home.faqPage.categories.subscriptions.questions.cancelSubscription.content"),
        },
        {
          title: t("home.faqPage.categories.subscriptions.questions.refunds.title"),
          content: t("home.faqPage.categories.subscriptions.questions.refunds.content"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <PageHeader
        title={t("home.faqPage.title")}
        description={t("home.faqPage.description")}
      />

      <ContentSection>
        <div className="mx-auto max-w-4xl space-y-12">
            {faqCategories.map((category, index) => (
                <div key={index} className="scroll-mt-24" id={category.category.toLowerCase().replace(/\s+/g, '-')}>
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                        {category.category}
                    </h2>
                    <SimpleAccordion items={category.questions} />
                </div>
            ))}
        </div>
      </ContentSection>

      <ContentSection className="bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-4">
                {t("home.faqPage.stillHaveQuestions.title")}
            </h2>
            <p className="text-neutral-900 dark:text-neutral-200 mb-8">
                {t("home.faqPage.stillHaveQuestions.description")}
            </p>
            <div className="flex justify-center gap-4">
                 <Link href="/customer-support" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-neutral-100 dark:text-neutral-900 shadow-sm hover:bg-blue-700">
                    {t("home.faqPage.stillHaveQuestions.contactSupport")}
                 </Link>
            </div>
        </div>
      </ContentSection>
    </div>
  );
}

