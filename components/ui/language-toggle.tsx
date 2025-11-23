"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "../providers/language-provider";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-full p-2 text-neutral-600 dark:text-neutral-300 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
      aria-label={t("common.language")}
      title={language === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">{t("common.language")}</span>
    </button>
  );
}
