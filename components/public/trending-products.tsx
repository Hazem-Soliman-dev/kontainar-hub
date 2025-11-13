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
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
        Live product activity is currently unavailable.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-slate-900">
          Live product activity
        </h2>
        <p className="text-sm text-slate-600">
          Pulled from marketplace telemetry (updates every minute). Sign in to
          view quantities and buyer demand.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {data.map((product) => (
          <article
            key={product.id}
            className="relative flex flex-col gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="absolute right-4 top-4 z-10">
              <FavoriteButton product={product} size={18} className="h-8 w-8" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="text-xs uppercase tracking-wide text-blue-600">
                  {product.category}
                </p>
              </div>
              <span className={availabilityBadgeClass(product.availability)}>
                {labelForAvailability(product.availability)}
              </span>
            </div>
            <p className="text-sm text-slate-600">{product.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>
                Supplier:{" "}
                <span className="font-semibold">{product.supplier}</span>
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
      return "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700";
    case "low":
      return "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700";
    default:
      return "inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700";
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
