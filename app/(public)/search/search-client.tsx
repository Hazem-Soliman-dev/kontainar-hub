"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Search, ArrowUpDown, X, Filter, SlidersHorizontal } from "lucide-react";
import { searchAll } from "../../../lib/search/search-utils";
import { parseAdvancedQuery } from "../../../lib/search/query-parser";
import {
  sortByRelevance,
  sortStoresByRelevance,
} from "../../../lib/search/ranking";
import { HeroSearch } from "../../../components/public/hero-search";
import { SearchFilters } from "../../../components/ui/search-filters";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { FavoriteButton } from "../../../components/ui/favorite-button";
import { AddToCartButton } from "../../../components/ui/add-to-cart-button";
import { ProductPriceOrRequest } from "../../../components/ui/product-price-or-request";
import { useSearchStore } from "../../../lib/store/search-store";
import { trackResultClick } from "../../../lib/search/analytics";
import type { SearchFilters as SearchFiltersType } from "../../../lib/search/types";
import { featuredCategories } from "../../../lib/mock/public";
import { hasActivePlan } from "../../../lib/utils/has-active-plan";
import { useAuthStore } from "../../../lib/store/auth-store";
import type { SubscriptionSnapshot } from "../../../lib/mock/subscriptions";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-desc";

export default function SearchClient() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const authSubscription = useAuthStore((state) => state.subscription);
  const user = useAuthStore((state) => state.user);
  const [hasActivePlanState, setHasActivePlanState] = useState(false);
  const { addSearch } = useSearchStore();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Fetch subscription status from API
  const fetchSubscription = useCallback(() => {
    fetch("/api/subscription")
      .then((res) => res.json())
      .then((data: { subscription: SubscriptionSnapshot | null }) => {
        setHasActivePlanState(hasActivePlan(data.subscription));
      })
      .catch(() => {
        setHasActivePlanState(false);
      });
  }, []);

  // Update state when auth store subscription changes (after hydration)
  useEffect(() => {
    setHasActivePlanState(hasActivePlan(authSubscription));
  }, [authSubscription]);

  // Listen for subscription changes and fetch as fallback
  useEffect(() => {
    // If no subscription in store after mount, fetch from API
    if (!authSubscription) {
      fetchSubscription();
    }

    const handleSubscriptionChange = () => {
      fetchSubscription();
    };

    window.addEventListener("subscription-changed", handleSubscriptionChange);

    return () => {
      window.removeEventListener(
        "subscription-changed",
        handleSubscriptionChange
      );
    };
  }, [authSubscription, fetchSubscription]);

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <main className="flex flex-col gap-8 pb-24">
        {/* Search Header */}
        <section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900 pt-12 pb-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary-600/10 blur-[100px]" />
                <div className="absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-secondary-500/10 blur-[100px]" />
            </div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 text-center z-10">
            <div className="w-full max-w-3xl">
              <HeroSearch />
            </div>
            {query && (
                <p className="text-neutral-900 dark:text-neutral-200 text-sm">
                    {t("home.searchPage.showingResultsFor")} <span className="text-neutral-900 dark:text-neutral-200 font-semibold">"{query}"</span>
                </p>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 -mt-12 relative z-20">
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-3xl shadow-strong border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 min-h-[500px] text-neutral-900 dark:text-neutral-200">
            <div className="mb-8">
                <Breadcrumb />
            </div>

          {!hasResults ? (
            <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
              <div className="h-24 w-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Search className="h-10 w-10 text-neutral-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
                    {t("home.searchPage.noResults.title")}
                </h2>
                <p className="text-neutral-900 dark:text-neutral-200 max-w-md mx-auto">
                    {query
                    ? t("home.searchPage.noResults.description").replace("{query}", query)
                    : t("home.searchPage.noResults.defaultDescription")}
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-500/20"
                >
                  {t("home.searchPage.noResults.browseCategories")}
                </Link>
                <Link
                  href="/stores"
                  className="rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  {t("home.searchPage.noResults.viewAllStores")}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Filters Sidebar (Desktop) */}
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                  <SearchFilters
                    filters={filters}
                    onFilterChange={updateFilters}
                  />
                </div>
              </aside>

              {/* Mobile Filters Trigger */}
              <div className="lg:hidden mb-4">
                  <button 
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 font-medium"
                  >
                      <span className="flex items-center gap-2"><Filter className="h-4 w-4" /> {t("home.searchPage.filters.title")}</span>
                      <span className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">{activeFilterCount}</span>
                  </button>
                  {isMobileFiltersOpen && (
                      <div className="mt-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                          <SearchFilters filters={filters} onFilterChange={updateFilters} />
                      </div>
                  )}
              </div>

              {/* Results Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="text-sm text-neutral-900 dark:text-neutral-200">
                    {query && (
                      <span>
                        {t("home.searchPage.results.found")
                          .replace("{products}", results.products.length.toString())
                          .replace("{stores}", results.stores.length.toString())}
                      </span>
                    )}
                    {category && !query && (
                      <span>
                        {t("home.searchPage.results.foundIn")
                          .replace("{products}", results.products.length.toString())
                          .replace("{category}", category)}
                      </span>
                    )}
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-neutral-500 dark:text-neutral-500 hidden sm:inline">{t("home.searchPage.results.sortBy")}</span>
                    <div className="relative">
                        <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="appearance-none rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 ps-4 pe-10 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none cursor-pointer transition-all hover:border-neutral-300 dark:hover:border-neutral-600"
                        >
                        <option value="relevance">{t("home.searchPage.results.sortOptions.relevance")}</option>
                        <option value="price-asc">{t("home.searchPage.results.sortOptions.priceAsc")}</option>
                        <option value="price-desc">{t("home.searchPage.results.sortOptions.priceDesc")}</option>
                        </select>
                        <ArrowUpDown className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900 dark:text-neutral-200 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {filters.category && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        {t("home.searchPage.filters.category").replace("{category}", filters.category)}
                        <button
                          type="button"
                          onClick={() =>
                            updateFilters({ ...filters, category: undefined })
                          }
                          className="ms-1 hover:text-primary-900 dark:hover:text-primary-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {/* Add other active filters here similarly */}
                    <button 
                        onClick={() => updateFilters({})}
                        className="text-xs text-neutral-900 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-200 underline decoration-neutral-300 underline-offset-4"
                    >
                        {t("home.searchPage.filters.clearAll")}
                    </button>
                  </div>
                )}

                {/* Related Searches */}
                {relatedSearches.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-medium text-neutral-900 dark:text-neutral-200 uppercase tracking-wider me-2">{t("home.searchPage.results.related")}</span>
                    {relatedSearches.map((related) => (
                        <Link
                          key={related}
                          href={`/search?q=${encodeURIComponent(related)}`}
                          className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-900 dark:text-neutral-200 transition hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {related}
                        </Link>
                      ))}
                  </div>
                )}

                {/* Products Grid */}
                {results.products.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 flex items-center gap-2">
                        {t("home.searchPage.results.products")}
                        <span className="text-sm font-normal text-neutral-900 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full">{results.products.length}</span>
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {results.products.map((product) => (
                        <div
                          key={product.id}
                          className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 shadow-sm transition-all hover:shadow-strong hover:-translate-y-1"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {product.tag && (
                                <span className="absolute start-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-neutral-100 dark:text-neutral-900 shadow-sm z-10">
                                    {product.tag}
                                </span>
                            )}
                            {product.momentum === "surging" && (
                                <span className="absolute end-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-neutral-100 dark:text-neutral-900 shadow-sm z-10 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                    {t("home.searchPage.badges.surging")}
                                </span>
                            )}
                            <div className="absolute end-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <FavoriteButton product={product} size={18} className="h-9 w-9 bg-neutral-100 dark:bg-neutral-900 shadow-sm" />
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col p-5">
                            <Link
                                href={`/products/${product.id}?from=search&q=${encodeURIComponent(query || category)}`}
                                className="flex flex-col gap-2 mb-4"
                                onClick={() => trackResultClick("product", product.id, query || category, results.products.indexOf(product) + 1)}
                            >
                                <h3 className="font-bold text-neutral-900 dark:text-neutral-200 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {highlightText(product.name, query || category)}
                                </h3>
                                <p className="text-xs font-medium text-neutral-900 dark:text-neutral-200">
                                    {product.brand}
                                </p>
                            </Link>
                            
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                <ProductPriceOrRequest
                                    product={product}
                                    hasActivePlan={hasActivePlanState}
                                    size="md"
                                />
                                {hasActivePlanState && user?.role === "trader" && (
                                    <AddToCartButton product={product} size="sm" className="rounded-full" />
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stores Grid */}
                {results.stores.length > 0 && (
                  <div className="space-y-6 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 flex items-center gap-2">
                        {t("home.searchPage.results.stores")}
                        <span className="text-sm font-normal text-neutral-900 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full">{results.stores.length}</span>
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-2">
                      {results.stores.map((store) => (
                        <div
                          key={store.id}
                          className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 shadow-sm transition-all hover:shadow-strong hover:-translate-y-1"
                        >
                          <div className="relative h-32 bg-neutral-100 dark:bg-neutral-900">
                             <Image
                                src={store.imageUrl}
                                alt={store.name}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                             <div className="absolute bottom-4 start-4 text-neutral-900 dark:text-neutral-200">
                                <h3 className="font-bold text-lg">{highlightText(store.name, query || category)}</h3>
                                <div className="flex items-center gap-1 text-amber-400 text-xs">
                                    <Star className="h-3 w-3 fill-current" />
                                    {t("home.searchPage.results.rating").replace("{rating}", store.rating.toFixed(1))}
                                </div>
                             </div>
                             <div className="absolute top-4 end-4">
                                <FavoriteButton store={store} size={18} className="h-8 w-8 bg-white/20 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 hover:bg-white hover:text-red-500 border-none" />
                             </div>
                          </div>
                          
                          <div className="p-5 flex flex-col gap-4">
                             <p className="text-sm text-neutral-900 dark:text-neutral-200 line-clamp-2">
                                {store.description}
                             </p>
                             <div className="flex items-center justify-between mt-auto">
                                <span className="text-xs font-medium text-neutral-900 dark:text-neutral-200 uppercase tracking-wider">{store.domain}</span>
                                <Link
                                    href={`/stores/${store.id}?from=search`}
                                    className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                                >
                                    {t("home.searchPage.results.visitStore")}
                                </Link>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Grid */}
                {results.categories.length > 0 && (
                  <div className="space-y-6 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                        {t("home.searchPage.results.categories")}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/search?category=${encodeURIComponent(category.title)}`}
                          className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 hover:border-primary-500 hover:shadow-md transition-all"
                        >
                          <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-2xl text-blue-500 dark:text-blue-400">
                            📦
                          </div>
                          <div>
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-200">
                                {category.title}
                            </h3>
                            <p className="text-xs text-neutral-900 dark:text-neutral-200">
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
          </div>
        </section>
      </main>
    </div>
  );
}
