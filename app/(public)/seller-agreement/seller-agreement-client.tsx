"use client";

import { PolicyLayout } from "@/components/ui/policy-layout";
import { useLanguage } from "../../../components/providers/language-provider";

export function SellerAgreementClient() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("home.sellerAgreementPage.sections.introduction.title"),
      content: t("home.sellerAgreementPage.sections.introduction.content"),
    },
    {
      title: t("home.sellerAgreementPage.sections.obligations.title"),
      content: t("home.sellerAgreementPage.sections.obligations.content"),
    },
    {
      title: t("home.sellerAgreementPage.sections.fees.title"),
      content: t("home.sellerAgreementPage.sections.fees.content"),
    },
    {
      title: t("home.sellerAgreementPage.sections.prohibitedItems.title"),
      content: t("home.sellerAgreementPage.sections.prohibitedItems.content"),
    },
    {
      title: t("home.sellerAgreementPage.sections.intellectualProperty.title"),
      content: t("home.sellerAgreementPage.sections.intellectualProperty.content"),
    },
    {
      title: t("home.sellerAgreementPage.sections.termination.title"),
      content: t("home.sellerAgreementPage.sections.termination.content"),
    },
    {
      title: t("home.sellerAgreementPage.sections.indemnification.title"),
      content: t("home.sellerAgreementPage.sections.indemnification.content"),
    },
    {
      title: t("home.sellerAgreementPage.sections.contact.title"),
      content: t("home.sellerAgreementPage.sections.contact.content"),
    },
  ];

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PolicyLayout
      title={t("home.sellerAgreementPage.title")}
      description={t("home.sellerAgreementPage.description")}
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}

