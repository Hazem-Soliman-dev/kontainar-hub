"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

import { bestSellerProducts } from "../../../lib/mock/public";
import { FavoriteButton } from "../../../components/ui/favorite-button";
import { AddToCartButton } from "../../../components/ui/add-to-cart-button";
import { ProductFilters } from "../../../components/ui/product-filters";
import { Pagination } from "../../../components/ui/pagination";

const ITEMS_PER_PAGE = 8;

export function TopProductsClient() {
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
      if (
        filters.momentum !== "all" &&
        product.momentum !== filters.momentum
      ) {
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
            Top Products
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

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 shadow-sm transition hover:-translate-y-1 hover:border-purple-500/60"
              >
                <div className="absolute right-6 top-6 z-10">
                  <FavoriteButton product={product} size={18} className="h-8 w-8" />
                </div>
                <Link
                  href={`/products/${product.id}?from=top-products`}
                  className="flex flex-col gap-4"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-200/40 dark:bg-neutral-200/40">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={360}
                      height={220}
                      className="h-44 w-full object-cover transition duration-500 hover:scale-105"
                    />
                    {product.tag ? (
                      <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">
                        {product.tag}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-700">{product.brand}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-end gap-2">
                      <span className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
                        {formatCurrency(product.price)}
                      </span>
                      {product.previousPrice ? (
                        <span className="text-xs text-neutral-700 dark:text-neutral-700 line-through">
                          {formatCurrency(product.previousPrice)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
                <div className="absolute bottom-4 right-4 z-10">
                  <AddToCartButton product={product} size="sm" />
                </div>
              </div>
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

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}


