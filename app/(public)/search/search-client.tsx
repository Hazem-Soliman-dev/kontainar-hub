"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Search, ArrowUpDown, X } from "lucide-react";
import { searchAll } from "../../../lib/search/search-utils";
import { parseAdvancedQuery } from "../../../lib/search/query-parser";
import {
  sortByRelevance,
  sortStoresByRelevance,
} from "../../../lib/search/ranking";
import { HeroSearch } from "../../../components/public/hero-search";
import { SearchFilters } from "../../../components/ui/search-filters";
import { FavoriteButton } from "../../../components/ui/favorite-button";
import { AddToCartButton } from "../../../components/ui/add-to-cart-button";
import { useSearchStore } from "../../../lib/store/search-store";
import { trackResultClick } from "../../../lib/search/analytics";
import type { SearchFilters as SearchFiltersType } from "../../../lib/search/types";
import { featuredCategories } from "../../../lib/mock/public";

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-blue-500/20 text-blue-400">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-desc";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const { addSearch } = useSearchStore();

  // Track search in history
  useEffect(() => {
    if (query.trim()) {
      addSearch(query);
    }
  }, [query, addSearch]);

  // Parse filters from URL
  const filters: SearchFiltersType = useMemo(() => {
    const filters: SearchFiltersType = {};
    if (category) {
      filters.category = category;
    }
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minRating = searchParams.get("minRating");
    const momentum = searchParams.get("momentum");
    const region = searchParams.get("region");
    const brand = searchParams.get("brand");

    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (minRating) filters.minRating = parseFloat(minRating);
    if (momentum)
      filters.momentum = momentum as "surging" | "steady" | "emerging";
    if (region) filters.region = region;
    if (brand) filters.brand = brand;

    return filters;
  }, [category, searchParams]);

  // Update URL with filters
  const updateFilters = useCallback(
    (newFilters: SearchFiltersType) => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.minPrice)
        params.set("minPrice", newFilters.minPrice.toString());
      if (newFilters.maxPrice)
        params.set("maxPrice", newFilters.maxPrice.toString());
      if (newFilters.minRating)
        params.set("minRating", newFilters.minRating.toString());
      if (newFilters.momentum) params.set("momentum", newFilters.momentum);
      if (newFilters.region) params.set("region", newFilters.region);
      if (newFilters.brand) params.set("brand", newFilters.brand);
      router.push(`/search?${params.toString()}`);
    },
    [query, router]
  );

  // Get search results with smart ranking
  const results = useMemo(() => {
    if (!query.trim() && !category) {
      return { products: [], stores: [], categories: [] };
    }
    const searchQuery = query || category;
    const parsedQuery = parseAdvancedQuery(searchQuery);
    const rawResults = searchAll(searchQuery, filters);

    // Apply smart ranking
    const rankedProducts = sortByRelevance(
      rawResults.products,
      searchQuery,
      parsedQuery
    );
    const rankedStores = sortStoresByRelevance(rawResults.stores, searchQuery);

    // Apply sort options
    let sortedProducts = [...rankedProducts];
    if (sortBy === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      // For products, we don't have rating, so keep relevance
      sortedProducts = rankedProducts;
    }

    return {
      products: sortedProducts,
      stores: rankedStores,
      categories: rawResults.categories,
    };
  }, [query, category, filters, sortBy]);

  // Related searches
  const relatedSearches = useMemo(() => {
    if (!query.trim()) return [];
    const related: string[] = [];
    const queryLower = query.toLowerCase();

    // Add category-based suggestions
    featuredCategories.forEach((cat) => {
      if (cat.title.toLowerCase().includes(queryLower) && related.length < 3) {
        related.push(cat.title);
      }
    });

    // Add variations
    if (queryLower.includes("electronic")) {
      related.push("Electronics");
    }
    if (queryLower.includes("fashion")) {
      related.push("Fashion");
    }

    return related.slice(0, 5);
  }, [query]);

  const hasResults =
    results.products.length > 0 ||
    results.stores.length > 0 ||
    results.categories.length > 0;

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined
  ).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col gap-8 pb-24">
        {/* Search Bar */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
          <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Search Results
            </h1>
            <div className="w-full max-w-3xl">
              <HeroSearch />
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mx-auto w-full max-w-7xl px-6">
          {!hasResults ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <Search className="h-16 w-16 text-neutral-400 dark:text-neutral-400" />
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                No results found
              </h2>
              <p className="text-neutral-700 dark:text-neutral-700">
                {query
                  ? `We couldn't find anything matching "${query}"`
                  : "Try searching for products, stores, or categories"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Browse Categories
                </Link>
                <Link
                  href="/stores"
                  className="rounded-lg border border-neutral-200 dark:border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-700 transition hover:border-blue-500 hover:text-neutral-900 dark:hover:text-neutral-900"
                >
                  View All Stores
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-4">
                  <SearchFilters
                    filters={filters}
                    onFilterChange={updateFilters}
                  />
                </div>
              </aside>

              {/* Results Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Results Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-neutral-700 dark:text-neutral-700">
                    {query && (
                      <span>
                        Found {results.products.length} products,{" "}
                        {results.stores.length} stores,{" "}
                        {results.categories.length} categories for "{query}"
                      </span>
                    )}
                    {category && !query && (
                      <span>
                        Found {results.products.length} products,{" "}
                        {results.stores.length} stores,{" "}
                        {results.categories.length} categories in "{category}"
                      </span>
                    )}
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-neutral-700 dark:text-neutral-700" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-900 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-neutral-700 dark:text-neutral-700">
                      Active filters:
                    </span>
                    {filters.category && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400 dark:text-blue-400">
                        Category: {filters.category}
                        <button
                          type="button"
                          onClick={() =>
                            updateFilters({ ...filters, category: undefined })
                          }
                          className="hover:text-blue-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {filters.brand && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400 dark:text-blue-400">
                        Brand: {filters.brand}
                        <button
                          type="button"
                          onClick={() =>
                            updateFilters({ ...filters, brand: undefined })
                          }
                          className="hover:text-blue-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {(filters.minPrice !== undefined ||
                      filters.maxPrice !== undefined) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400 dark:text-blue-400">
                        Price: ${filters.minPrice || 0} - $
                        {filters.maxPrice || "∞"}
                        <button
                          type="button"
                          onClick={() =>
                            updateFilters({
                              ...filters,
                              minPrice: undefined,
                              maxPrice: undefined,
                            })
                          }
                          className="hover:text-blue-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}

                {/* Related Searches */}
                {relatedSearches.length > 0 && (
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4">
                    <h3 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-900">
                      People also searched for
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {relatedSearches.map((related) => (
                        <Link
                          key={related}
                          href={`/search?q=${encodeURIComponent(related)}`}
                          className="rounded-full border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-700 transition hover:bg-blue-500/20 hover:text-blue-400 dark:hover:text-blue-400"
                        >
                          {related}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {results.products.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                      Products
                    </h2>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {results.products.map((product) => (
                        <div
                          key={product.id}
                          className="relative flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 shadow-sm transition hover:-translate-y-1 hover:border-purple-500/60"
                        >
                          <div className="absolute right-6 top-6 z-10">
                            <FavoriteButton
                              product={product}
                              size={18}
                              className="h-8 w-8"
                            />
                          </div>
                          <Link
                            href={`/products/${
                              product.id
                            }?from=search&q=${encodeURIComponent(
                              query || category
                            )}`}
                            className="flex flex-col gap-4"
                            onClick={() =>
                              trackResultClick(
                                "product",
                                product.id,
                                query || category,
                                results.products.indexOf(product) + 1
                              )
                            }
                          >
                            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-200/40 dark:bg-neutral-200/40">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={360}
                                height={220}
                                className="h-44 w-full object-cover transition duration-500 hover:scale-105"
                              />
                              {product.tag && (
                                <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">
                                  {product.tag}
                                </span>
                              )}
                              {product.momentum === "surging" && (
                                <span className="absolute right-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
                                  Surging
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col gap-2">
                              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-900">
                                {highlightText(product.name, query || category)}
                              </h3>
                              <p className="text-sm text-neutral-700 dark:text-neutral-700">
                                {product.brand}
                              </p>
                              {product.signals &&
                                product.signals.length > 0 && (
                                  <p className="text-xs text-neutral-700 dark:text-neutral-700">
                                    {product.signals[0]}
                                  </p>
                                )}
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-end gap-2">
                                <span className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
                                  {formatCurrency(product.price)}
                                </span>
                                {product.previousPrice && (
                                  <span className="text-xs text-neutral-700 dark:text-neutral-700 line-through">
                                    {formatCurrency(product.previousPrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                          <div className="absolute bottom-4 right-4 z-10">
                            <AddToCartButton product={product} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stores */}
                {results.stores.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                      Stores
                    </h2>
                    <div className="grid gap-5 lg:grid-cols-2">
                      {results.stores.map((store) => (
                        <div
                          key={store.id}
                          className="relative flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
                        >
                          <div className="absolute right-6 top-6 z-10">
                            <FavoriteButton
                              store={store}
                              size={18}
                              className="h-8 w-8"
                            />
                          </div>
                          <Link
                            href={`/stores/${
                              store.id
                            }?from=search&q=${encodeURIComponent(
                              query || category
                            )}`}
                            className="flex flex-col gap-4"
                            onClick={() =>
                              trackResultClick(
                                "store",
                                store.id,
                                query || category,
                                results.stores.indexOf(store) + 1
                              )
                            }
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative h-16 w-16 overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-200">
                                <Image
                                  src={store.imageUrl}
                                  alt={store.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-neutral-900 dark:text-neutral-900">
                                  {highlightText(store.name, query || category)}
                                </p>
                                <div className="flex items-center gap-1 text-amber-300">
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                      key={index}
                                      className="h-4 w-4"
                                      strokeWidth={
                                        index < Math.round(store.rating)
                                          ? 0
                                          : 1.5
                                      }
                                      fill={
                                        index < Math.round(store.rating)
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  ))}
                                  <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-700">
                                    ({store.rating.toFixed(1)})
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-700">
                              {store.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-700">
                                {store.domain}
                              </span>
                              <span className="rounded-full bg-blue-500 px-4 py-2 text-xs uppercase tracking-wide text-white transition hover:bg-blue-600">
                                Enter Store
                              </span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {results.categories.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                      Categories
                    </h2>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {results.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/search?category=${encodeURIComponent(
                            category.title
                          )}`}
                          className="flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60 items-center justify-center text-center"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-300">
                            <span className="text-2xl">📦</span>
                          </div>
                          <div className="items-center justify-center text-center gap-1">
                            <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
                              {category.title}
                            </h3>
                            <p className="text-sm text-neutral-700 dark:text-neutral-700">
                              {category.stats}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
