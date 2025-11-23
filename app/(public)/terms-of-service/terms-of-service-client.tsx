"use client";

import { PolicyLayout } from "@/components/ui/policy-layout";
import { useLanguage } from "../../../components/providers/language-provider";

export function TermsOfServiceClient() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("home.termsOfServicePage.sections.acceptance.title"),
      content: t("home.termsOfServicePage.sections.acceptance.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.useLicense.title"),
      content: t("home.termsOfServicePage.sections.useLicense.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.userAccounts.title"),
      content: t("home.termsOfServicePage.sections.userAccounts.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.marketplaceRules.title"),
      content: t("home.termsOfServicePage.sections.marketplaceRules.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.disclaimer.title"),
      content: t("home.termsOfServicePage.sections.disclaimer.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.limitations.title"),
      content: t("home.termsOfServicePage.sections.limitations.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.governingLaw.title"),
      content: t("home.termsOfServicePage.sections.governingLaw.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.changes.title"),
      content: t("home.termsOfServicePage.sections.changes.content"),
    },
    {
      title: t("home.termsOfServicePage.sections.contact.title"),
      content: t("home.termsOfServicePage.sections.contact.content"),
    },
  ];

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PolicyLayout
      title={t("home.termsOfServicePage.title")}
      description={t("home.termsOfServicePage.description")}
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}

