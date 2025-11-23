"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

import { useCartStore, type CartItem } from "../../lib/store/cart-store";
import { CartFilters } from "../../components/ui/cart-filters";
import { Pagination } from "../../components/ui/pagination";
import { Breadcrumb } from "../../components/ui/breadcrumb";
import { useLanguage } from "../../components/providers/language-provider";

const ITEMS_PER_PAGE = 5;

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function CartClient() {
  const { t } = useLanguage();
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [filters, setFilters] = useState({
    category: "all",
    brand: "all",
    minPrice: "",
    maxPrice: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (filters.category !== "all" && item.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand !== "all" && item.brand !== filters.brand) {
        return false;
      }

      // Price filters
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice);
        if (isNaN(minPrice) || item.price < minPrice) {
          return false;
        }
      }

      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice);
        if (isNaN(maxPrice) || item.price > maxPrice) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
        <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4">
            <Breadcrumb />
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-neutral-50 dark:bg-neutral-900 py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-400" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">
                {t("home.cartPage.title")}
              </h1>
            </div>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {t("home.cartPage.description")}
            </p>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24">
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-12 sm:p-16 text-center shadow-xl">
            <div className="rounded-full bg-neutral-100 dark:bg-neutral-900 p-6">
              <ShoppingBag className="h-12 w-12 text-neutral-900 dark:text-neutral-200" />
            </div>
            <div>
              <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
                {t("home.cartPage.empty.title")}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {t("home.cartPage.empty.description")}
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3 text-sm font-semibold text-neutral-900 dark:text-neutral-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              {t("home.cartPage.empty.browseProducts")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4">
          <Breadcrumb />
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-10 sm:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="h-8 w-8 text-neutral-900 dark:text-neutral-200" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">
              {t("home.cartPage.title")}
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            {items.length}{" "}
            {items.length === 1
              ? t("home.cartPage.item")
              : t("home.cartPage.items")}{" "}
            {t("home.cartPage.itemsCount")}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24">
        {items.length > 0 && (
          <div className="mb-8">
            <CartFilters
              filters={filters}
              onFilterChange={setFilters}
              items={items}
            />
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-12 text-center shadow-xl">
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
              {t("home.cartPage.filters.noMatch.title")}
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              {t("home.cartPage.filters.noMatch.description")}
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-sm text-neutral-900 dark:text-neutral-200 mb-4">
                {t("home.cartPage.showingItems")
                  .replace("{shown}", paginatedItems.length.toString())
                  .replace("{total}", filteredItems.length.toString())}
                {items.length !== filteredItems.length &&
                  ` ${t("home.cartPage.totalInCart").replace(
                    "{total}",
                    items.length.toString()
                  )}`}
              </div>

              {paginatedItems.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/products/${item.id}?from=cart`}
                      className="flex flex-1 gap-4"
                    >
                      {item.imageUrl && (
                        <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 hover:shadow-sm transition-all duration-200 hover:-translate-y-1">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-200 line-clamp-2 mb-1">
                          {item.name}
                        </h2>
                        <p className="text-sm text-neutral-900 dark:text-neutral-200 mb-1">
                          {item.brand}
                        </p>
                        <p className="text-xs text-neutral-900 dark:text-neutral-200 mb-2">
                          {item.category}
                        </p>
                        <p className="text-sm font-semibold text-primary-500 dark:text-primary-400">
                          {formatCurrency(item.price)} {t("home.cartPage.each")}
                        </p>
                      </div>
                    </Link>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-105 active:scale-95"
                          aria-label={t(
                            "home.cartPage.ariaLabels.decreaseQuantity"
                          )}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2.5rem] text-center text-base font-bold text-neutral-900 dark:text-neutral-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-105 active:scale-95"
                          aria-label={t(
                            "home.cartPage.ariaLabels.increaseQuantity"
                          )}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-200">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 transition-all hover:bg-red-100 dark:hover:bg-red-950/50 hover:scale-105 active:scale-95"
                          aria-label={t(
                            "home.cartPage.ariaLabels.removeFromCart"
                          )}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-900/50 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-6">
                  {t("home.cartPage.orderSummary.title")}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-900 dark:text-neutral-200">
                      {t("home.cartPage.orderSummary.items").replace(
                        "{count}",
                        filteredItems.length.toString()
                      )}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
                        {t("home.cartPage.orderSummary.subtotal")}
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-900 dark:text-neutral-200 mb-6 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {t("home.cartPage.orderSummary.taxesNote")}
                </p>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 dark:bg-primary-600 px-6 py-3.5 text-base font-semibold text-neutral-900 dark:text-neutral-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t("home.cartPage.buttons.proceedToCheckout")}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/favorites"
                    className="w-full inline-flex items-center justify-center rounded-xl border-2 border-primary-200 dark:border-primary-900/50 px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition-all hover:bg-primary-500 dark:hover:bg-primary-600/30"
                  >
                    {t("home.cartPage.buttons.moveToFavorites")}
                  </Link>
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full inline-flex items-center justify-center rounded-xl border-2 border-red-200 dark:border-red-900/50 px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition-all hover:bg-red-500 dark:hover:bg-red-600/30"
                    >
                      {t("home.cartPage.buttons.clearCart")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
