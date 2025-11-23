"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { TrendingUp, Filter, ArrowRight } from "lucide-react";

import { bestSellerProducts } from "../../../lib/mock/public";
import { FavoriteButton } from "../../../components/ui/favorite-button";
import { AddToCartButton } from "../../../components/ui/add-to-cart-button";
import { ProductPriceOrRequest } from "../../../components/ui/product-price-or-request";
import { ProductFilters } from "../../../components/ui/product-filters";
import { Pagination } from "../../../components/ui/pagination";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { useLanguage } from "../../../components/providers/language-provider";
import { useAuthStore } from "../../../lib/store/auth-store";
import { hasActivePlan } from "../../../lib/utils/has-active-plan";
import type { SubscriptionSnapshot } from "../../../lib/mock/subscriptions";
import { MotionWrapper } from "../../../components/ui/motion-wrapper";

const ITEMS_PER_PAGE = 8;

export function TopProductsClient() {
  const { t } = useLanguage();
  const authSubscription = useAuthStore((state) => state.subscription);
  const user = useAuthStore((state) => state.user);
  const [hasActivePlanState, setHasActivePlanState] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    momentum: "all",
    brand: "all",
    minPrice: "",
    maxPrice: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Update state when auth store subscription changes
  useEffect(() => {
    setHasActivePlanState(hasActivePlan(authSubscription));
  }, [authSubscription]);

  // Listen for subscription changes
  useEffect(() => {
    const fetchSubscription = () => {
      fetch("/api/subscription")
        .then((res) => res.json())
        .then((data: { subscription: SubscriptionSnapshot | null }) => {
          setHasActivePlanState(hasActivePlan(data.subscription));
        })
        .catch(() => {
          setHasActivePlanState(false);
        });
    };

    if (!authSubscription) {
      fetchSubscription();
    }

    window.addEventListener("subscription-changed", fetchSubscription);

    return () => {
      window.removeEventListener("subscription-changed", fetchSubscription);
    };
  }, [authSubscription]);

  const filteredProducts = useMemo(() => {
    return bestSellerProducts.filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category)
        return false;
      if (filters.momentum !== "all" && product.momentum !== filters.momentum)
        return false;
      if (filters.brand !== "all" && product.brand !== filters.brand)
        return false;
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice);
        if (isNaN(minPrice) || product.price < minPrice) return false;
      }
      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice);
        if (isNaN(maxPrice) || product.price > maxPrice) return false;
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-br from-primary-900/40 via-purple-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-tl from-secondary-900/40 via-blue-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper variant="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
              {t("home.topProductsPage.hero.title")}
            </h1>
          </MotionWrapper>
          <MotionWrapper variant="fade-up" delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-neutral-500 dark:text-neutral-400 mb-10">
              {t("home.topProductsPage.hero.description")}
            </p>
          </MotionWrapper>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-24">
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Breadcrumb />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors sm:hidden"
            >
              <Filter className="h-4 w-4" /> {t("home.topProductsPage.filters")}
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200 mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5" />{" "}
                  {t("home.topProductsPage.filters")}
                </h3>
                <ProductFilters
                  products={bestSellerProducts}
                  filters={filters}
                  onFilterChange={setFilters}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.topProductsPage.showingResults")
                    .replace("{count}", paginatedProducts.length.toString())
                    .replace("{total}", filteredProducts.length.toString())}
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProducts.map((product, index) => (
                  <MotionWrapper key={product.id} delay={index * 0.05} variant="fade-up">
                    <div
                      className="group relative flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-hidden hover:shadow-sm transition-all duration-300 hover:-translate-y-1 lg:hover:scale-[1.02] lg:duration-500"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-3 end-3 z-10">
                          <FavoriteButton
                            product={product}
                            size={18}
                            className="h-9 w-9 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
                          />
                        </div>

                        {product.tag && (
                          <span className="absolute top-3 start-3 px-3 py-1 rounded-full bg-rose-500 text-xs font-bold text-white shadow-sm">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                              {product.category}
                            </span>
                            {product.momentum && (
                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  product.momentum === "surging"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : product.momentum === "emerging"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                                }`}
                              >
                                {t(
                                  `home.topProductsPage.momentum.${product.momentum}` as any
                                ) || product.momentum}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/products/${product.id}?from=top-products`}
                          >
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200 leading-tight mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {t("home.topProductsPage.by")} {product.brand}
                          </p>
                        </div>

                        <div className="mt-auto border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
                          <ProductPriceOrRequest
                            product={product}
                            hasActivePlan={hasActivePlanState}
                            size="lg"
                            className="text-lg font-bold text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-xl"
                          />
                          {hasActivePlanState && user?.role === "trader" && (
                            <AddToCartButton
                              product={product}
                              size="sm"
                              className="rounded-xl px-4"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <MotionWrapper variant="fade-up" delay={0.3} className="mt-16 relative rounded-3xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 px-6 py-16 sm:px-12 sm:py-20 text-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/30 via-transparent to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-200">
              {t("home.topProductsPage.cta.title")}
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              {t("home.topProductsPage.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 px-8 py-4 font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                {t("home.topProductsPage.cta.createAccount")}
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto rounded-xl border border-neutral-700 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 px-8 py-4 font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                {t("home.topProductsPage.cta.viewSubscriptions")}{" "}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </MotionWrapper>
      </main>
    </div>
  );
}
