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
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return bestSellerProducts.filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category) return false;
      if (filters.momentum !== "all" && product.momentum !== filters.momentum) return false;
      if (filters.brand !== "all" && product.brand !== filters.brand) return false;
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
      <div className="relative bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-br from-primary-900/40 via-purple-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-tl from-secondary-900/40 via-blue-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
            Top Performing Products
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500 dark:text-neutral-400 mb-10">
            Discover high-demand inventory with real-time market signals. Source smarter with data-driven insights.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-24">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Breadcrumb />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors sm:hidden"
            >
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200 mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Filters
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
                  Showing {paginatedProducts.length} of {filteredProducts.length} results
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
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
                      
                      <div className="absolute top-3 right-3 z-10">
                        <FavoriteButton
                          product={product}
                          size={18}
                          className="h-9 w-9 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform text-neutral-900 dark:text-neutral-200"
                        />
                      </div>

                      {product.tag && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-xs font-bold text-neutral-900 dark:text-neutral-200 shadow-sm text-white">
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
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              product.momentum === 'surging' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              product.momentum === 'emerging' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                              'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                            }`}>
                              {product.momentum}
                            </span>
                          )}
                        </div>
                        <Link href={`/products/${product.id}?from=top-products`}>
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200 leading-tight mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          by {product.brand}
                        </p>
                      </div>

                      <div className="mt-auto border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
                        <ProductPriceOrRequest
                          product={product}
                          hasActivePlan={true}
                          size="lg"
                          className="text-lg font-bold text-neutral-900 dark:text-neutral-200 bg-neutral-400 dark:bg-neutral-500 px-3 py-1 rounded-xl"
                        />
                        <AddToCartButton product={product} size="sm" className="rounded-xl px-4" />
                      </div>
                    </div>
                  </div>
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
        <div className="mt-16 relative rounded-3xl overflow-hidden bg-neutral-900 px-6 py-16 sm:px-12 sm:py-20 text-center">
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
             <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/30 via-transparent to-transparent blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-200">
              Turn these signals into purchase orders
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              MarketHub surfaces marketplace intelligence so you can move fast. Activate your account to receive tailored recommendations and RFQ flows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 px-8 py-4 font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto rounded-xl border border-neutral-700 dark:border-neutral-200 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 px-8 py-4 font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                View Subscriptions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
