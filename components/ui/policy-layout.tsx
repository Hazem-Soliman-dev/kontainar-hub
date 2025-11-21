"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { cn } from "@/lib/utils";

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
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <PageHeader
        title={title}
        description={description}
      >
        <div className="mt-4 text-sm text-neutral-900 dark:text-neutral-200">
          Last updated: {lastUpdated}
        </div>
      </PageHeader>

      <ContentSection>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-12 shadow-sm text-neutral-900 dark:text-neutral-200">
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
        </div>
      </ContentSection>
    </div>
  );
}
