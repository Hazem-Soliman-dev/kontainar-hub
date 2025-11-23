"use client";

import { X } from "lucide-react";
import type { BestSellerProduct, FeaturedStore } from "../../lib/mock/public";
import type { ProductRecord } from "../../lib/mock/products";
import { useLanguage } from "../../components/providers/language-provider";

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
  const { t } = useLanguage();
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
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-200 mx-1">
          {t("home.favoritesPage.filters.title")}
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-500 mx-2"
          >
            <X className="h-3 w-3" />
            {t("home.favoritesPage.filters.clearAll")}
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
            {t("home.favoritesPage.filters.type.label")}
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              onFilterChange({ ...filters, type: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">{t("home.favoritesPage.filters.type.all")}</option>
            <option value="products">{t("home.favoritesPage.filters.type.productsOnly")}</option>
            <option value="stores">{t("home.favoritesPage.filters.type.storesOnly")}</option>
          </select>
        </div>

        {filters.type !== "stores" && categories.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
              {t("home.favoritesPage.filters.category.label")}
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
            >
              <option value="all">{t("home.favoritesPage.filters.category.all")}</option>
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
              {t("home.favoritesPage.filters.rating.label")}
            </label>
            <select
              value={filters.rating}
              onChange={(e) =>
                onFilterChange({ ...filters, rating: e.target.value })
              }
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none"
            >
              <option value="all">{t("home.favoritesPage.filters.rating.all")}</option>
              <option value="4.5">{t("home.favoritesPage.filters.rating.option45")}</option>
              <option value="4.0">{t("home.favoritesPage.filters.rating.option40")}</option>
              <option value="3.5">{t("home.favoritesPage.filters.rating.option35")}</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

