"use client";

import { X } from "lucide-react";
import type { CartItem } from "../../lib/store/cart-store";
import { useLanguage } from "../../components/providers/language-provider";

interface CartFiltersProps {
  items: CartItem[];
  filters: {
    category: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
  };
  onFilterChange: (filters: {
    category: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

export function CartFilters({
  items,
  filters,
  onFilterChange,
}: CartFiltersProps) {
  const { t } = useLanguage();
  const categories = Array.from(
    new Set(items.map((item) => item.category))
  ).sort();
  const brands = Array.from(new Set(items.map((item) => item.brand))).sort();

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.brand !== "all" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "";

  const clearFilters = () => {
    onFilterChange({
      category: "all",
      brand: "all",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-200 mx-1">
          {t("home.cartPage.filters.title")}
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 mx-2"
          >
            <X className="h-3 w-3" />
            {t("home.cartPage.filters.clearAll")}
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            {t("home.cartPage.filters.category.label")}
          </label>
          <select
            value={filters.category}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">
              {t("home.cartPage.filters.category.all")}
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            {t("home.cartPage.filters.brand.label")}
          </label>
          <select
            value={filters.brand}
            onChange={(e) =>
              onFilterChange({ ...filters, brand: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">{t("home.cartPage.filters.brand.all")}</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            {t("home.cartPage.filters.minPrice.label")}
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) =>
              onFilterChange({ ...filters, minPrice: e.target.value })
            }
            placeholder={t("home.cartPage.filters.minPrice.placeholder")}
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-700 dark:placeholder:text-neutral-700 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            {t("home.cartPage.filters.maxPrice.label")}
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) =>
              onFilterChange({ ...filters, maxPrice: e.target.value })
            }
            placeholder={t("home.cartPage.filters.maxPrice.placeholder")}
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-700 dark:placeholder:text-neutral-700 focus:border-primary-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
