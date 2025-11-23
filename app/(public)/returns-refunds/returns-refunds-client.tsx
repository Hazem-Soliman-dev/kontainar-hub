"use client";

import { PolicyLayout } from "@/components/ui/policy-layout";
import { useLanguage } from "../../../components/providers/language-provider";

export function ReturnsRefundsClient() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("home.returnsRefundsPage.sections.overview.title"),
      content: t("home.returnsRefundsPage.sections.overview.content"),
    },
    {
      title: t("home.returnsRefundsPage.sections.eligibility.title"),
      content: t("home.returnsRefundsPage.sections.eligibility.content"),
    },
    {
      title: t("home.returnsRefundsPage.sections.process.title"),
      content: t("home.returnsRefundsPage.sections.process.content"),
    },
    {
      title: t("home.returnsRefundsPage.sections.refunds.title"),
      content: t("home.returnsRefundsPage.sections.refunds.content"),
    },
    {
      title: t("home.returnsRefundsPage.sections.shipping.title"),
      content: t("home.returnsRefundsPage.sections.shipping.content"),
    },
    {
      title: t("home.returnsRefundsPage.sections.exchanges.title"),
      content: t("home.returnsRefundsPage.sections.exchanges.content"),
    },
    {
      title: t("home.returnsRefundsPage.sections.contact.title"),
      content: t("home.returnsRefundsPage.sections.contact.content"),
    },
  ];

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PolicyLayout
      title={t("home.returnsRefundsPage.title")}
      description={t("home.returnsRefundsPage.description")}
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}

