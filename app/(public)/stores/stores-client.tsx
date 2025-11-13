"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Star } from "lucide-react";

import { featuredStores } from "../../../lib/mock/public";
import { FavoriteButton } from "../../../components/ui/favorite-button";
import { StoreFilters } from "../../../components/ui/store-filters";
import { Pagination } from "../../../components/ui/pagination";

const ITEMS_PER_PAGE = 6;

export default function StoresClient() {
  const [filters, setFilters] = useState({
    rating: "all",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStores = useMemo(() => {
    return featuredStores.filter((store) => {
      // Rating filter
      if (filters.rating !== "all") {
        const minRating = parseFloat(filters.rating);
        if (store.rating < minRating) {
          return false;
        }
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = store.name.toLowerCase().includes(searchLower);
        const matchesDomain = store.domain.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesDomain) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);
  const paginatedStores = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStores.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStores, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="pb-24">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl lg:text-5xl">
            Verified stores ready for global trade
          </h1>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-6">
            <StoreFilters filters={filters} onFilterChange={setFilters} stores={featuredStores} />
          </div>

          <div className="mb-6 text-sm text-neutral-700 dark:text-neutral-700">
            Showing {paginatedStores.length} of {filteredStores.length} stores
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedStores.map((store) => (
              <article
                key={store.id}
                className="relative flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-600/20"
              >
                <div className="absolute right-6 top-6 z-10">
                  <FavoriteButton store={store} size={18} className="h-8 w-8" />
                </div>
                <Link
                  href={`/stores/${store.id}?from=stores`}
                  className="flex flex-col gap-4"
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-200">
                    <Image
                      src={store.imageUrl}
                      alt={store.name}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-50/80 dark:from-neutral-50/80 to-transparent p-4">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">
                        {store.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-300">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="h-4 w-4"
                          strokeWidth={
                            index < Math.round(store.rating) ? 0 : 1.5
                          }
                          fill={
                            index < Math.round(store.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                      <span className="text-xs text-neutral-700 dark:text-neutral-700">
                        ({store.rating.toFixed(1)})
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-700">
                      {store.domain}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-700">{store.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-700 dark:text-neutral-700">Login to message</span>
                    <span className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-600 dark:hover:bg-blue-600">
                      View profile
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </section>

        <section className="mx-auto mt-16 flex w-full max-w-4xl flex-col items-center gap-4 rounded-3xl border border-blue-500/20 bg-blue-500/10 dark:bg-blue-500/10 px-6 py-10 text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
            Showcase your store on MarketHub
          </h2>
          <p className="max-w-3xl text-sm text-blue-400 dark:text-blue-400">
            Suppliers and traders with active subscriptions receive personalised
            onboarding, marketplace promotion, and access to RFQ workflows.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-600 dark:hover:bg-blue-600"
            >
              Apply for access
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-6 py-3 text-sm font-semibold text-blue-400 dark:text-blue-400 transition hover:bg-blue-400/10 dark:hover:bg-blue-400/10"
            >
              Compare plans
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

