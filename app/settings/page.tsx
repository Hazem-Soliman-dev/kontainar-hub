"use client";

import type { ReactNode } from "react";
import { Bell, Shield, Settings as SettingsIcon } from "lucide-react";

import { createMetadata } from "../../lib/seo/metadata";
import { Breadcrumb } from "../../components/ui/breadcrumb";

function SettingsPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-b-3xl">
      <div className="px-2 py-6 w-full md:w-[80%] m-auto">
        <Breadcrumb />
      </div>
      {/* Hero Section */}
      <div className="relative bg-neutral-900 dark:bg-neutral-900 py-10 sm:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="h-8 w-8 text-primary-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100">
              Settings
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Manage your notification preferences and privacy settings
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24">
        <div className="space-y-6">
          <PreferenceCard
            icon={Bell}
            title="Communication"
            description="Choose how MarketHub keeps you in the loop about RFQ activity and supplier responses."
          >
            <ToggleRow label="Email alerts" defaultChecked />
            <ToggleRow label="Weekly marketplace digest" />
            <ToggleRow label="SMS notifications" />
          </PreferenceCard>

          <PreferenceCard
            icon={Shield}
            title="Privacy"
            description="Control who can view your sourcing activity and saved lists."
          >
            <ToggleRow label="Display profile to suppliers" defaultChecked />
            <ToggleRow label="Allow message requests" defaultChecked />
            <ToggleRow label="Share anonymous demand signals" />
          </PreferenceCard>
        </div>

        <div className="mt-8 rounded-2xl border border-primary-200 dark:border-primary-900/50 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/30 dark:to-transparent p-6 sm:p-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            Need more control?
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Advanced analytics, team roles, and single sign-on settings become
            available once you upgrade to a paid plan.
          </p>
          <a
            href="/plans"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 dark:bg-primary-400 px-6 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 transition-all hover:bg-primary-700 hover:scale-105"
          >
            View Plans
          </a>
        </div>
      </main>
    </div>
  );
}

function PreferenceCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="rounded-xl bg-primary-100 dark:bg-primary-900/50 p-3">
          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
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
    <label className="group flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 p-4 cursor-pointer transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800/50">
      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {label}
      </span>
      <div className="relative">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-full peer-checked:bg-blue-600 dark:peer-checked:bg-blue-400 transition-colors"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-neutral-100 dark:bg-neutral-900 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
      </div>
    </label>
  );
}

export default SettingsPage;
