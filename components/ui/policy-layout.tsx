"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { useLanguage } from "@/components/providers/language-provider";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

interface PolicySection {
  title: string;
  content: React.ReactNode;
}

interface PolicyLayoutProps {
  title: string;
  description?: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export function PolicyLayout({
  title,
  description,
  lastUpdated,
  sections,
}: PolicyLayoutProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <PageHeader
        title={title}
        description={description}
      >
        <div className="mt-4 text-sm text-neutral-900 dark:text-neutral-200">
          {t("home.policyPages.lastUpdated")}: {lastUpdated}
        </div>
      </PageHeader>

      <ContentSection>
        <MotionWrapper variant="fade-up" delay={0.1} className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-8 sm:p-12 shadow-sm text-neutral-900 dark:text-neutral-200">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {sections.map((section, index) => (
                <div key={index} className="mb-10 last:mb-0">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-neutral-900 dark:text-neutral-200 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </ContentSection>
    </div>
  );
}
