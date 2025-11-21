"use client";

import useSWR from "swr";

import type { ProductRecord } from "../../lib/mock/products";
import { FavoriteButton } from "../ui/favorite-button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TrendingProducts() {
  const { data } = useSWR<ProductRecord[]>("/api/products", fetcher, {
    suspense: true,
  });

  if (!data?.length) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-6 text-sm text-neutral-500 dark:text-neutral-400">
        Live product activity is currently unavailable.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Live product activity
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Pulled from marketplace telemetry (updates every minute). Sign in to
          view quantities and buyer demand.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {data.map((product) => (
          <article
            key={product.id}
            className="relative flex flex-col gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm transition hover:-translate-y-0.5"
          >
            <div className="absolute right-4 top-4 z-10">
              <FavoriteButton product={product} size={18} className="h-8 w-8" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400">
                  {product.category}
                </p>
              </div>
              <span className={availabilityBadgeClass(product.availability)}>
                {labelForAvailability(product.availability)}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{product.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500">
              <span>
                Supplier:{" "}
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">{product.supplier}</span>
              </span>
              <span>
                Updated{" "}
                {new Date(product.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function availabilityBadgeClass(status: ProductRecord["availability"]) {
  switch (status) {
    case "in-stock":
      return "inline-flex rounded-full bg-success-50 dark:bg-success-500/10 px-3 py-1 text-xs font-semibold text-success-700 dark:text-success-400";
    case "low":
      return "inline-flex rounded-full bg-warning-50 dark:bg-warning-500/10 px-3 py-1 text-xs font-semibold text-warning-600 dark:text-warning-400";
    default:
      return "inline-flex rounded-full bg-danger-50 dark:bg-danger-500/10 px-3 py-1 text-xs font-semibold text-danger-600 dark:text-danger-400";
  }
}

function labelForAvailability(status: ProductRecord["availability"]) {
  switch (status) {
    case "in-stock":
      return "In stock";
    case "low":
      return "Low";
    default:
      return "Backorder";
  }
}
