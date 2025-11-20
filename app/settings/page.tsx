import type { ReactNode } from "react";

import { createMetadata } from "../../lib/seo/metadata";
import { Breadcrumb } from "../../components/ui/breadcrumb";

export const metadata = createMetadata({
  title: "Account Settings",
  description:
    "Control notification preferences, marketplace alerts, and privacy options for your MarketHub profile.",
  path: "/settings",
});

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-8 pb-12">
        <header className="space-y-2">
          <Breadcrumb />
        </header>

        <section className="space-y-6">
          <PreferenceCard
            title="Communication"
            description="Choose how MarketHub keeps you in the loop about RFQ activity and supplier responses."
          >
            <ToggleRow label="Email alerts" defaultChecked />
            <ToggleRow label="Weekly marketplace digest" />
            <ToggleRow label="SMS notifications" />
          </PreferenceCard>

          <PreferenceCard
            title="Privacy"
            description="Control who can view your sourcing activity and saved lists."
          >
            <ToggleRow label="Display profile to suppliers" defaultChecked />
            <ToggleRow label="Allow message requests" defaultChecked />
            <ToggleRow label="Share anonymous demand signals" />
          </PreferenceCard>
        </section>

        <section className="rounded-3xl border border-blue-500/20 bg-blue-500/10 dark:bg-blue-500/10 px-6 py-8 text-sm text-blue-400 dark:text-blue-400 mt-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
            Need more control?
          </h2>
          <p className="mt-2">
            Advanced analytics, team roles, and single sign-on settings become
            available once you upgrade to a paid plan.
          </p>
        </section>
      </main>
    </div>
  );
}

function PreferenceCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="space-y-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">{title}</h2>
        <p className="mt-2 text-md text-neutral-700 dark:text-neutral-700">{description}</p>
      </div>
      <div className="space-y-3 text-md text-neutral-700 dark:text-neutral-700">{children}</div>
    </article>
  );
}

function ToggleRow({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-3">
      <span>{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4"
      />
    </label>
  );
}
