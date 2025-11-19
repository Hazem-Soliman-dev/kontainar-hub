"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

import { useCartStore, type CartItem } from "../../lib/store/cart-store";
import { CartFilters } from "../../components/ui/cart-filters";
import { Pagination } from "../../components/ui/pagination";

const ITEMS_PER_PAGE = 5;

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function CartClient() {
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
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl lg:text-5xl">
              Shopping Cart
            </h1>
            <p className="text-md text-neutral-700 dark:text-neutral-700">
              Your cart is empty. Start adding products to your cart.
            </p>
          </header>

          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-12 text-center">
            <p className="text-lg text-neutral-700 dark:text-neutral-700">
              Your cart is empty
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-700">
              Browse our products and add items to your cart.
            </p>
            <div className="mt-4">
              <Link
                href="/best-sellers"
                className="rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-600 dark:hover:bg-blue-600"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl lg:text-5xl">
            Shopping Cart
          </h1>
          <p className="text-md text-neutral-700 dark:text-neutral-700">
            Review selected MarketHub products and finalize your checkout or
            sourcing requests.
          </p>
        </header>

        {items.length > 0 && (
          <div>
            <CartFilters
              filters={filters}
              onFilterChange={setFilters}
              items={items}
            />
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-12 text-center">
            <p className="text-lg text-neutral-700 dark:text-neutral-700">
              No items match your filters
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-700">
              Try adjusting your filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="text-sm text-neutral-700 dark:text-neutral-700">
              Showing {paginatedItems.length} of {filteredItems.length} items
              {items.length !== filteredItems.length &&
                ` (${items.length} total in cart)`}
            </div>

            <section className="space-y-4">
              {paginatedItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-5 shadow-sm md:flex-row md:items-center md:justify-between"
                >
                  <Link
                    href={`/products/${item.id}?from=cart`}
                    className="flex flex-1 gap-4"
                  >
                    {item.imageUrl && (
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-200">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
                        {item.name}
                      </h2>
                      <p className="text-sm text-neutral-700 dark:text-neutral-700">
                        {item.brand}
                      </p>
                      <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-700">
                        {item.category}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-neutral-900 dark:text-neutral-900">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-200 dark:hover:bg-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2rem] text-center text-md font-semibold text-neutral-900 dark:text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-200 dark:hover:bg-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="min-w-[6rem] text-right">
                      <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/50 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            <section className="rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 text-sm text-neutral-700 dark:text-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-700">
                Taxes and final shipping costs are calculated once suppliers
                confirm your request.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/checkout"
                  className="rounded-sm bg-blue-500 px-4 py-2 font-semibold text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-600 dark:hover:bg-blue-600"
                >
                  Proceed to checkout
                </Link>
                <Link
                  href="/favorites"
                  className="rounded-sm border border-blue-400/50 px-4 py-2 font-semibold text-blue-400 dark:text-blue-400 transition hover:bg-blue-400/10 dark:hover:bg-blue-400/10"
                >
                  Move to favorites
                </Link>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded-sm border border-red-400/50 px-4 py-2 font-semibold text-red-400 dark:text-red-400 transition hover:bg-red-400/10 dark:hover:bg-red-400/10"
                  >
                    Clear cart
                  </button>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
