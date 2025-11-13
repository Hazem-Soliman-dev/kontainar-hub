import { featuredCategories } from "../mock/public";
import { useSearchStore } from "../store/search-store";

/**
 * Mock trending searches - can be replaced with real analytics
 */
const MOCK_TRENDING_SEARCHES = [
  "wireless headphones",
  "electronics",
  "fashion",
  "home decor",
  "sports equipment",
  "beauty products",
  "gaming accessories",
  "smart home",
  "fitness gear",
  "laptop",
];

/**
 * Get trending searches based on frequency
 */
export function getTrendingSearches(limit: number = 10): string[] {
  // In a real implementation, this would query analytics
  // For now, combine mock data with popular searches from history
  try {
    const popularSearches = useSearchStore.getState().getPopularSearches(limit);
    const trendingFromHistory = popularSearches.map((item) => item.query);

    // Combine with mock trending, prioritizing history
    const combined = [
      ...trendingFromHistory,
      ...MOCK_TRENDING_SEARCHES.filter(
        (search) => !trendingFromHistory.includes(search)
      ),
    ];

    return combined.slice(0, limit);
  } catch {
    // Fallback to mock data if store not available
    return MOCK_TRENDING_SEARCHES.slice(0, limit);
  }
}

/**
 * Get trending searches by category
 */
export function getTrendingByCategory(category: string, limit: number = 5): string[] {
  const categoryLower = category.toLowerCase();
  const categoryItem = featuredCategories.find(
    (cat) => cat.title.toLowerCase() === categoryLower
  );

  if (!categoryItem) {
    return [];
  }

  // Mock category-specific trending
  const categoryTrending: Record<string, string[]> = {
    electronics: ["wireless headphones", "laptop", "smartphone", "tablet", "smartwatch"],
    fashion: ["summer dress", "sneakers", "jacket", "jeans", "accessories"],
    home: ["table lamp", "furniture", "decor", "kitchen", "bedding"],
    sports: ["resistance bands", "yoga mat", "dumbbells", "running shoes", "gym bag"],
    beauty: ["skincare", "makeup", "hair care", "perfume", "cosmetics"],
    gaming: ["gaming mouse", "keyboard", "headset", "controller", "monitor"],
  };

  return categoryTrending[categoryLower] || [];
}

/**
 * Get time-based trending (last 24 hours)
 */
export function getTrendingLast24Hours(limit: number = 10): string[] {
  try {
    const state = useSearchStore.getState();
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    const recentSearches = state.recentSearches
      .filter((item) => item.timestamp >= oneDayAgo)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
      .map((item) => item.query);

    if (recentSearches.length > 0) {
      return recentSearches;
    }

    // Fallback to general trending
    return getTrendingSearches(limit);
  } catch {
    return getTrendingSearches(limit);
  }
}

/**
 * Get trending searches for the last week
 */
export function getTrendingLastWeek(limit: number = 10): string[] {
  try {
    const state = useSearchStore.getState();
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const recentSearches = state.recentSearches
      .filter((item) => item.timestamp >= oneWeekAgo)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
      .map((item) => item.query);

    if (recentSearches.length > 0) {
      return recentSearches;
    }

    // Fallback to general trending
    return getTrendingSearches(limit);
  } catch {
    return getTrendingSearches(limit);
  }
}

