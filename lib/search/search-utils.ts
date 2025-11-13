import type {
  BestSellerProduct,
  FeaturedStore,
  FeaturedCategory,
} from "../mock/public";
import {
  bestSellerProducts,
  featuredStores,
  featuredCategories,
} from "../mock/public";
import type { SearchFilters, SearchResult, ParsedQuery } from "./types";
import { trackSearch, trackZeroResults } from "./analytics";

/**
 * Basic query parsing - extracts simple patterns
 */
export function parseQuery(query: string): ParsedQuery {
  const text = query.trim().toLowerCase();
  const parsed: ParsedQuery = { text };

  // Extract price ranges (e.g., "under $50", "$20-$100", "under 50")
  const priceUnderMatch = text.match(/under\s*\$?(\d+)/);
  const priceRangeMatch = text.match(/\$?(\d+)\s*-\s*\$?(\d+)/);
  const priceOverMatch = text.match(/over\s*\$?(\d+)/);

  if (priceUnderMatch) {
    parsed.priceRange = { max: parseFloat(priceUnderMatch[1]) };
  } else if (priceRangeMatch) {
    parsed.priceRange = {
      min: parseFloat(priceRangeMatch[1]),
      max: parseFloat(priceRangeMatch[2]),
    };
  } else if (priceOverMatch) {
    parsed.priceRange = { min: parseFloat(priceOverMatch[1]) };
  }

  // Extract category keywords
  const categoryKeywords = featuredCategories.map((cat) =>
    cat.title.toLowerCase()
  );
  const foundCategories = categoryKeywords.filter((keyword) =>
    text.includes(keyword)
  );
  if (foundCategories.length > 0) {
    parsed.categories = foundCategories;
  }

  return parsed;
}

/**
 * Search products by query and filters
 */
export function searchProducts(
  query: string,
  filters: SearchFilters = {}
): BestSellerProduct[] {
  const queryLower = query.trim().toLowerCase();
  const parsed = parseQuery(query);

  let results = bestSellerProducts.filter((product) => {
    // Text search
    const matchesName = product.name.toLowerCase().includes(queryLower);
    const matchesBrand = product.brand.toLowerCase().includes(queryLower);
    const matchesCategory = product.category.toLowerCase().includes(queryLower);
    const matchesSummary = product.summary
      ?.toLowerCase()
      .includes(queryLower) ?? false;

    if (!matchesName && !matchesBrand && !matchesCategory && !matchesSummary) {
      return false;
    }

    // Category filter
    if (filters.category) {
      const categoryLower = filters.category.toLowerCase();
      if (
        !product.category.toLowerCase().includes(categoryLower) &&
        !categoryLower.includes(product.category.toLowerCase())
      ) {
        return false;
      }
    }

    // Price filters
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    if (parsed.priceRange) {
      if (
        parsed.priceRange.min !== undefined &&
        product.price < parsed.priceRange.min
      ) {
        return false;
      }
      if (
        parsed.priceRange.max !== undefined &&
        product.price > parsed.priceRange.max
      ) {
        return false;
      }
    }

    // Momentum filter
    if (filters.momentum && product.momentum !== filters.momentum) {
      return false;
    }

    // Brand filter
    if (filters.brand) {
      const brandLower = filters.brand.toLowerCase();
      if (!product.brand.toLowerCase().includes(brandLower)) {
        return false;
      }
    }

    return true;
  });

  // Basic ranking: exact matches first, then best sellers
  results = rankResults(results, query);

  return results;
}

/**
 * Search stores by query and filters
 */
export function searchStores(
  query: string,
  filters: SearchFilters = {}
): FeaturedStore[] {
  const queryLower = query.trim().toLowerCase();

  let results = featuredStores.filter((store) => {
    const matchesName = store.name.toLowerCase().includes(queryLower);
    const matchesDomain = store.domain.toLowerCase().includes(queryLower);
    const matchesDescription = store.description
      .toLowerCase()
      .includes(queryLower);

    if (!matchesName && !matchesDomain && !matchesDescription) {
      return false;
    }

    // Rating filter
    if (filters.minRating !== undefined && store.rating < filters.minRating) {
      return false;
    }

    return true;
  });

  // Basic ranking: higher rated stores first
  results.sort((a, b) => b.rating - a.rating);

  return results;
}

/**
 * Search categories by query
 */
export function searchCategories(query: string): FeaturedCategory[] {
  const queryLower = query.trim().toLowerCase();

  return featuredCategories.filter((category) => {
    const matchesTitle = category.title.toLowerCase().includes(queryLower);
    const matchesSummary = category.summary
      ?.toLowerCase()
      .includes(queryLower) ?? false;

    return matchesTitle || matchesSummary;
  });
}

/**
 * Basic relevance ranking for products
 */
function rankResults(
  products: BestSellerProduct[],
  query: string
): BestSellerProduct[] {
  const queryLower = query.trim().toLowerCase();

  return products.sort((a, b) => {
    // Exact name match gets highest priority
    const aExactMatch = a.name.toLowerCase() === queryLower;
    const bExactMatch = b.name.toLowerCase() === queryLower;
    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;

    // Name starts with query
    const aStartsWith = a.name.toLowerCase().startsWith(queryLower);
    const bStartsWith = b.name.toLowerCase().startsWith(queryLower);
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    // Best sellers (products with tags) get priority
    if (a.tag && !b.tag) return -1;
    if (!a.tag && b.tag) return 1;

    // Surging momentum gets priority
    if (a.momentum === "surging" && b.momentum !== "surging") return -1;
    if (a.momentum !== "surging" && b.momentum === "surging") return 1;

    // Lower price (better deals) gets slight priority
    return a.price - b.price;
  });
}

/**
 * Unified search across all types
 */
export function searchAll(
  query: string,
  filters: SearchFilters = {}
): SearchResult {
  const results = {
    products: searchProducts(query, filters),
    stores: searchStores(query, filters),
    categories: searchCategories(query),
  };

  const totalResults = results.products.length + results.stores.length + results.categories.length;

  // Track search analytics
  if (query.trim()) {
    if (totalResults === 0) {
      trackZeroResults(query);
    } else {
      trackSearch(query, filters as Record<string, unknown>, totalResults);
    }
  }

  return results;
}

/**
 * Get unique brands from products
 */
export function getAllBrands(): string[] {
  const brands = new Set(bestSellerProducts.map((p) => p.brand));
  return Array.from(brands).sort();
}

/**
 * Search brands by query
 */
export function searchBrands(query: string): string[] {
  const queryLower = query.trim().toLowerCase();
  const brands = getAllBrands();
  return brands.filter((brand) => brand.toLowerCase().includes(queryLower));
}

