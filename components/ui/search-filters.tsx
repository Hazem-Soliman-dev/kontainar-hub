"use client";

import { X } from "lucide-react";
import type { SearchFilters as SearchFiltersType } from "../../lib/search/types";
import { getAllBrands } from "../../lib/search/search-utils";
import { featuredCategories } from "../../lib/mock/public";
import { trackFilterUsage } from "../../lib/search/analytics";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: SearchFiltersType) => void;
}

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const hasActiveFilters =
    filters.category !== undefined ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined ||
    filters.momentum !== undefined ||
    filters.region !== undefined ||
    filters.brand !== undefined;

  const clearFilters = () => {
    onFilterChange({});
  };

  const brands = getAllBrands();
  const allRegions = Array.from(
    new Set(
      featuredCategories.flatMap((cat) => cat.regions || [])
    )
  ).sort();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-white mx-1">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 mx-2"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-slate-400">
            Category
          </label>
          <select
            value={filters.category || ""}
            onChange={(e) => {
              const newCategory = e.target.value || undefined;
              if (newCategory) {
                trackFilterUsage("category", newCategory);
              }
              onFilterChange({
                ...filters,
                category: newCategory,
              });
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            {featuredCategories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-slate-400">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minPrice: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Store Rating */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-slate-400">
            Minimum Store Rating
          </label>
          <select
            value={filters.minRating || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minRating: e.target.value
                  ? parseFloat(e.target.value)
                  : undefined,
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>
        </div>

        {/* Product Momentum */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-slate-400">
            Product Momentum
          </label>
          <select
            value={filters.momentum || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                momentum: (e.target.value ||
                  undefined) as "surging" | "steady" | "emerging" | undefined,
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Momentum</option>
            <option value="surging">Surging</option>
            <option value="steady">Steady</option>
            <option value="emerging">Emerging</option>
          </select>
        </div>

        {/* Region */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-slate-400">
            Region
          </label>
          <select
            value={filters.region || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                region: e.target.value || undefined,
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Regions</option>
            {allRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-slate-400">
            Brand
          </label>
          <select
            value={filters.brand || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                brand: e.target.value || undefined,
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

