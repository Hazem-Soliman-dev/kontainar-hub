import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  Dumbbell,
  Gamepad2,
  Home as HomeIcon,
  Laptop,
  Shirt,
  Sparkles,
} from "lucide-react";

import { featuredCategories } from "../../../lib/mock/public";
import { createMetadata } from "../../../lib/seo/metadata";

const categoryIconMap: Record<
  (typeof featuredCategories)[number]["icon"],
  LucideIcon
> = {
  electronics: Laptop,
  fashion: Shirt,
  home: HomeIcon,
  sports: Dumbbell,
  beauty: Sparkles,
  gaming: Gamepad2,
};

export const metadata = createMetadata({
  title: "Featured Categories",
  description:
    "Explore trending categories and sourcing signals across the MarketHub marketplace.",
  path: "/categories",
  keywords: [
    "featured categories",
    "supplier discovery",
    "marketplace insights",
  ],
});

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="pb-24">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Categories buyers are searching right now
          </h1>
          <p className="max-w-3xl text-md text-slate-400">
            Browse highlighted categories with emerging demand. Sign in to
            unlock supplier performance data, pricing trends, and regional
            availability tailored to your team.
          </p>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredCategories.map((category) => {
              const Icon = categoryIconMap[category.icon];
              return (
                <article
                  key={category.id}
                  className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-600/20"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {category.title}
                      </h2>
                      <p className="text-sm text-slate-400">{category.stats}</p>
                    </div>
                  </div>
                  {category.summary ? (
                    <p className="text-sm text-slate-400">{category.summary}</p>
                  ) : null}
                  {category.regions ? (
                    <div className="space-y-2 text-xs text-slate-500">
                      <p className="font-semibold uppercase tracking-widest text-slate-500">
                        Active regions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.regions.map((region) => (
                          <span
                            key={region}
                            className="rounded-full bg-slate-900/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-slate-400"
                          >
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-4xl rounded-3xl border border-blue-500/20 bg-blue-500/10 px-6 py-10 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Ready for full visibility?
          </h2>
          <p className="mt-3 text-sm text-blue-200">
            MarketHub subscribers unlock live supplier catalogs, verified
            compliance documents, and direct RFQ workflows.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Start your free trial
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-6 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/10"
            >
              Explore plans
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
