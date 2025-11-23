"use client";

import { PolicyLayout } from "@/components/ui/policy-layout";
import { useLanguage } from "../../../components/providers/language-provider";

export function PrivacyPolicyClient() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("home.privacyPolicyPage.sections.introduction.title"),
      content: t("home.privacyPolicyPage.sections.introduction.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.informationWeCollect.title"),
      content: t("home.privacyPolicyPage.sections.informationWeCollect.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.howWeUse.title"),
      content: t("home.privacyPolicyPage.sections.howWeUse.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.informationSharing.title"),
      content: t("home.privacyPolicyPage.sections.informationSharing.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.dataSecurity.title"),
      content: t("home.privacyPolicyPage.sections.dataSecurity.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.yourRights.title"),
      content: t("home.privacyPolicyPage.sections.yourRights.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.cookies.title"),
      content: t("home.privacyPolicyPage.sections.cookies.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.childrensPrivacy.title"),
      content: t("home.privacyPolicyPage.sections.childrensPrivacy.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.changes.title"),
      content: t("home.privacyPolicyPage.sections.changes.content"),
    },
    {
      title: t("home.privacyPolicyPage.sections.contact.title"),
      content: t("home.privacyPolicyPage.sections.contact.content"),
    },
  ];

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PolicyLayout
      title={t("home.privacyPolicyPage.title")}
      description={t("home.privacyPolicyPage.description")}
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}

