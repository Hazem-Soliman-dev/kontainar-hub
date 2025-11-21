"use client";

import { X } from "lucide-react";
import type { BestSellerProduct, FeaturedStore } from "../../lib/mock/public";
import type { ProductRecord } from "../../lib/mock/products";

type FavoriteProduct = BestSellerProduct | ProductRecord;

interface FavoritesFiltersProps {
  products: FavoriteProduct[];
  stores: FeaturedStore[];
  filters: {
    type: string;
    category: string;
    rating: string;
  };
  onFilterChange: (filters: {
    type: string;
    category: string;
    rating: string;
  }) => void;
}

export function FavoritesFilters({
  products,
  stores,
  filters,
  onFilterChange,
}: FavoritesFiltersProps) {
  const categories = Array.from(
    new Set(
      products
        .map((p) => ("category" in p ? p.category : null))
        .filter((c): c is string => c !== null)
    )
  ).sort();

  const hasActiveFilters =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.rating !== "all";

  const clearFilters = () => {
    onFilterChange({
      type: "all",
      category: "all",
      rating: "all",
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-200 mx-1">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-500 mx-2"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              onFilterChange({ ...filters, type: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="products">Products Only</option>
            <option value="stores">Stores Only</option>
          </select>
        </div>

        {filters.type !== "stores" && categories.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {filters.type !== "products" && (
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
              Minimum Rating
            </label>
            <select
              value={filters.rating}
              onChange={(e) =>
                onFilterChange({ ...filters, rating: e.target.value })
              }
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

