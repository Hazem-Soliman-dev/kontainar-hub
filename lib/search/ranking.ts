import type {
  BestSellerProduct,
  FeaturedStore,
} from "../mock/public";
import type { ParsedQuery, RelevanceScore } from "./types";
import { parseAdvancedQuery } from "./query-parser";

/**
 * Calculate relevance score for a product
 */
export function calculateRelevanceScore(
  product: BestSellerProduct,
  query: string,
  parsedQuery?: ParsedQuery
): RelevanceScore {
  const parsed = parsedQuery || parseAdvancedQuery(query);
  const queryLower = query.toLowerCase().trim();
  const factors = {
    exactMatch: 0,
    partialMatch: 0,
    categoryMatch: 0,
    brandMatch: 0,
    bestSeller: 0,
    momentum: 0,
    rating: 0,
  };

  const nameLower = product.name.toLowerCase();
  const brandLower = product.brand.toLowerCase();
  const categoryLower = product.category.toLowerCase();

  // Exact match (highest priority)
  if (nameLower === queryLower) {
    factors.exactMatch = 100;
  } else if (nameLower.startsWith(queryLower)) {
    factors.exactMatch = 80;
  } else if (nameLower.includes(queryLower)) {
    factors.exactMatch = 60;
  }

  // Partial match
  const queryWords = queryLower.split(/\s+/);
  const nameWords = nameLower.split(/\s+/);
  const matchingWords = queryWords.filter((word) =>
    nameWords.some((nw) => nw.includes(word) || word.includes(nw))
  ).length;
  factors.partialMatch = (matchingWords / queryWords.length) * 40;

  // Category match
  if (parsed.categories) {
    parsed.categories.forEach((cat) => {
      if (categoryLower.includes(cat.toLowerCase())) {
        factors.categoryMatch = 30;
      }
    });
  } else if (queryLower.includes(categoryLower) || categoryLower.includes(queryLower)) {
    factors.categoryMatch = 20;
  }

  // Brand match
  if (parsed.brands) {
    if (parsed.brands.some((b) => b.toLowerCase() === brandLower)) {
      factors.brandMatch = 25;
    }
  } else if (queryLower.includes(brandLower) || brandLower.includes(queryLower)) {
    factors.brandMatch = 15;
  }

  // Best seller boost
  if (product.tag) {
    factors.bestSeller = 20;
  }

  // Momentum boost
  if (product.momentum === "surging") {
    factors.momentum = 15;
  } else if (product.momentum === "steady") {
    factors.momentum = 5;
  }

  // Calculate total score (capped at 100)
  const score = Math.min(
    100,
    factors.exactMatch +
      factors.partialMatch +
      factors.categoryMatch +
      factors.brandMatch +
      factors.bestSeller +
      factors.momentum
  );

  return { score, factors };
}

/**
 * Calculate relevance score for a store
 */
export function calculateStoreRelevanceScore(
  store: FeaturedStore,
  query: string
): RelevanceScore {
  const queryLower = query.toLowerCase().trim();
  const factors = {
    exactMatch: 0,
    partialMatch: 0,
    categoryMatch: 0,
    brandMatch: 0,
    bestSeller: 0,
    momentum: 0,
    rating: 0,
  };

  const nameLower = store.name.toLowerCase();
  const domainLower = store.domain.toLowerCase();
  const descLower = store.description.toLowerCase();

  // Exact match
  if (nameLower === queryLower) {
    factors.exactMatch = 100;
  } else if (nameLower.startsWith(queryLower)) {
    factors.exactMatch = 80;
  } else if (nameLower.includes(queryLower) || domainLower.includes(queryLower)) {
    factors.exactMatch = 60;
  }

  // Partial match
  const queryWords = queryLower.split(/\s+/);
  const nameWords = nameLower.split(/\s+/);
  const matchingWords = queryWords.filter((word) =>
    nameWords.some((nw) => nw.includes(word) || word.includes(nw))
  ).length;
  factors.partialMatch = (matchingWords / queryWords.length) * 30;

  // Description match
  if (descLower.includes(queryLower)) {
    factors.partialMatch += 20;
  }

  // Rating boost (higher rated stores get priority)
  factors.rating = store.rating * 5; // Convert 0-5 rating to 0-25 score points

  const score = Math.min(
    100,
    factors.exactMatch + factors.partialMatch + factors.rating
  );

  return { score, factors };
}

/**
 * Sort products by relevance
 */
export function sortByRelevance(
  products: BestSellerProduct[],
  query: string,
  parsedQuery?: ParsedQuery
): BestSellerProduct[] {
  const parsed = parsedQuery || parseAdvancedQuery(query);

  return products
    .map((product) => ({
      product,
      relevance: calculateRelevanceScore(product, query, parsed),
    }))
    .sort((a, b) => {
      // First by relevance score
      if (b.relevance.score !== a.relevance.score) {
        return b.relevance.score - a.relevance.score;
      }
      // Then by best seller status
      if (a.product.tag && !b.product.tag) return -1;
      if (!a.product.tag && b.product.tag) return 1;
      // Then by momentum
      const momentumOrder = { surging: 3, steady: 2, emerging: 1 };
      const aMomentum = momentumOrder[a.product.momentum || "emerging"];
      const bMomentum = momentumOrder[b.product.momentum || "emerging"];
      if (bMomentum !== aMomentum) {
        return bMomentum - aMomentum;
      }
      // Finally by price (lower is better for deals)
      return a.product.price - b.product.price;
    })
    .map((item) => item.product);
}

/**
 * Sort stores by relevance
 */
export function sortStoresByRelevance(
  stores: FeaturedStore[],
  query: string
): FeaturedStore[] {
  return stores
    .map((store) => ({
      store,
      relevance: calculateStoreRelevanceScore(store, query),
    }))
    .sort((a, b) => {
      // First by relevance score
      if (b.relevance.score !== a.relevance.score) {
        return b.relevance.score - a.relevance.score;
      }
      // Then by rating
      return b.store.rating - a.store.rating;
    })
    .map((item) => item.store);
}

/**
 * Boost best sellers in results
 */
export function boostBestSellers<T extends BestSellerProduct>(
  products: T[]
): T[] {
  return products.sort((a, b) => {
    if (a.tag && !b.tag) return -1;
    if (!a.tag && b.tag) return 1;
    return 0;
  });
}

/**
 * Boost products with surging momentum
 */
export function boostMomentum<T extends BestSellerProduct>(
  products: T[]
): T[] {
  return products.sort((a, b) => {
    const momentumOrder = { surging: 3, steady: 2, emerging: 1 };
    const aMomentum = momentumOrder[a.momentum || "emerging"];
    const bMomentum = momentumOrder[b.momentum || "emerging"];
    return bMomentum - aMomentum;
  });
}

