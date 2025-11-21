"use client";

import { X } from "lucide-react";
import type { BestSellerProduct } from "../../lib/mock/public";

interface ProductFiltersProps {
  products: BestSellerProduct[];
  filters: {
    category: string;
    momentum: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
  };
  onFilterChange: (filters: {
    category: string;
    momentum: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

export function ProductFilters({
  products,
  filters,
  onFilterChange,
}: ProductFiltersProps) {
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).sort();
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
  const momentums: ("surging" | "steady" | "emerging")[] = [
    "surging",
    "steady",
    "emerging",
  ];

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.momentum !== "all" ||
    filters.brand !== "all" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "";

  const clearFilters = () => {
    onFilterChange({
      category: "all",
      momentum: "all",
      brand: "all",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-200 bg-white dark:bg-neutral-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-200 mx-1">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 mx-2"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-200 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            Momentum
          </label>
          <select
            value={filters.momentum}
            onChange={(e) =>
              onFilterChange({ ...filters, momentum: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-200 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">All Momentum</option>
            {momentums.map((momentum) => (
              <option key={momentum} value={momentum}>
                {momentum.charAt(0).toUpperCase() + momentum.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) =>
              onFilterChange({ ...filters, brand: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-200 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            Min Price
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) =>
              onFilterChange({ ...filters, minPrice: e.target.value })
            }
            placeholder="0"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-200 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-700 dark:placeholder:text-neutral-700 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            Max Price
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) =>
              onFilterChange({ ...filters, maxPrice: e.target.value })
            }
            placeholder="No limit"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-200 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-700 dark:placeholder:text-neutral-700 focus:border-primary-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

