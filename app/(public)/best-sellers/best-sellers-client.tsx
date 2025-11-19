"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import { bestSellerProducts } from "../../../lib/mock/public";
import { FavoriteButton } from "../../../components/ui/favorite-button";
import { AddToCartButton } from "../../../components/ui/add-to-cart-button";
import { ProductFilters } from "../../../components/ui/product-filters";
import { Pagination } from "../../../components/ui/pagination";

const tagStyles: Record<"surging" | "steady" | "emerging", string> = {
  surging: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
  steady: "bg-blue-500/10 text-blue-300 border-blue-500/40",
  emerging: "bg-amber-500/10 text-amber-300 border-amber-500/40",
};

const ITEMS_PER_PAGE = 4;

export function BestSellersClient() {
  const [filters, setFilters] = useState({
    category: "all",
    momentum: "all",
    brand: "all",
    minPrice: "",
    maxPrice: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return bestSellerProducts.filter((product) => {
      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      // Momentum filter
      if (filters.momentum !== "all" && product.momentum !== filters.momentum) {
        return false;
      }

      // Brand filter
      if (filters.brand !== "all" && product.brand !== filters.brand) {
        return false;
      }

      // Price filters
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice);
        if (isNaN(minPrice) || product.price < minPrice) {
          return false;
        }
      }

      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice);
        if (isNaN(maxPrice) || product.price > maxPrice) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="pb-24">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl lg:text-5xl">
            Top-performing products in global trade
          </h1>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-6">
            <ProductFilters
              products={bestSellerProducts}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          <div className="mb-6 text-sm text-neutral-700 dark:text-neutral-700">
            Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
            products
          </div>

          <div className="flex flex-col gap-6">
            {paginatedProducts.map((product) => (
              <article
                key={product.id}
                className="relative rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-500/60 md:p-8"
              >
                <div className="absolute right-6 top-6 z-10">
                  <FavoriteButton
                    product={product}
                    size={18}
                    className="h-8 w-8"
                  />
                </div>
                <Link
                  href={`/products/${product.id}?from=best-sellers`}
                  className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
                >
                  <div className="flex max-w-3xl flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 dark:text-blue-400">
                      {product.category}
                    </span>
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                      {product.name}
                    </h2>
                    <p className="text-sm text-neutral-700 dark:text-neutral-700">
                      {product.summary}
                    </p>
                    {product.momentum ? (
                      <span
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                          tagStyles[product.momentum]
                        }`}
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-current" />
                        {momentumLabel(product.momentum)}
                      </span>
                    ) : null}
                  </div>

                  <div className="w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-5">
                    <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-700">
                      <p className="text-xs font-semibold uppercase tracking-widest">
                        Market signals
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">
                        {product.brand}
                      </p>
                    </div>
                    {product.signals ? (
                      <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-700">
                        {product.signals.map((signal) => (
                          <li key={signal} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500" />
                            <span>{signal}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Link>
                <div className="absolute bottom-6 left-6 z-10">
                  <Link
                    href="/login?redirect=/best-sellers"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Login to unlock buyers
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="absolute bottom-6 right-6 z-10">
                  <AddToCartButton product={product} size="sm" />
                </div>
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

        <section className="mx-auto mt-16 flex w-full max-w-5xl flex-col items-center gap-4 rounded-3xl border border-blue-500/20 bg-blue-500/10 dark:bg-blue-500/10 px-6 py-10 text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
            Turn these signals into purchase orders
          </h2>
          <p className="max-w-3xl text-md text-blue-400 dark:text-blue-400">
            MarketHub surfaces marketplace intelligence so you can move fast.
            Activate your account to receive tailored recommendations and RFQ
            flows.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-600 dark:hover:bg-blue-600"
            >
              Create account
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-6 py-3 text-sm font-semibold text-blue-400 dark:text-blue-400 transition hover:bg-blue-400/10 dark:hover:bg-blue-400/10"
            >
              View subscriptions
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function momentumLabel(tone: "surging" | "steady" | "emerging") {
  switch (tone) {
    case "surging":
      return "Surging momentum";
    case "steady":
      return "Steady demand";
    case "emerging":
    default:
      return "Emerging trend";
  }
}
