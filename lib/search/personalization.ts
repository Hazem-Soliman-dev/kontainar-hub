import { featuredCategories } from "../mock/public";
import { useSearchStore } from "../store/search-store";
import { getTrendingByCategory } from "./trending";

/**
 * Get personalized suggestions based on user's search history
 */
export function getPersonalizedSuggestions(
  userId?: string,
  context?: { category?: string; recentSearches?: string[] }
): string[] {
  try {
    const state = useSearchStore.getState();
    const recentSearches = context?.recentSearches || state.getRecentSearches(5);
    const popularSearches = state.getPopularSearches(5);

    // Combine recent and popular searches
    const suggestions = new Set<string>();

    // Add recent searches (user's own history)
    recentSearches.forEach((search) => suggestions.add(search));

    // Add popular searches (what others are searching)
    popularSearches.forEach((item) => suggestions.add(item.query));

    // If category context, add category-specific suggestions
    if (context?.category) {
      const categoryTrending = getTrendingByCategory(context.category, 3);
      categoryTrending.forEach((search) => suggestions.add(search));
    }

    return Array.from(suggestions).slice(0, 10);
  } catch {
    // Fallback to category-based suggestions
    if (context?.category) {
      return getTrendingByCategory(context.category, 5);
    }
    return [];
  }
}

/**
 * Get similar searches based on current query
 */
export function getSimilarSearches(query: string, limit: number = 5): string[] {
  const queryLower = query.toLowerCase().trim();
  const similar: string[] = [];

  try {
    const state = useSearchStore.getState();
    const allSearches = state.recentSearches;

    // Find searches that contain similar words
    const queryWords = queryLower.split(/\s+/);
    allSearches.forEach((item) => {
      const itemLower = item.query.toLowerCase();
      const itemWords = itemLower.split(/\s+/);

      // Check for word overlap
      const commonWords = queryWords.filter((word) =>
        itemWords.some((iw) => iw.includes(word) || word.includes(iw))
      );

      if (commonWords.length > 0 && itemLower !== queryLower) {
        similar.push(item.query);
      }
    });

    // Sort by frequency and recency
    similar.sort((a, b) => {
      const aItem = allSearches.find((s) => s.query.toLowerCase() === a.toLowerCase());
      const bItem = allSearches.find((s) => s.query.toLowerCase() === b.toLowerCase());
      if (!aItem || !bItem) return 0;
      return bItem.count - aItem.count || bItem.timestamp - aItem.timestamp;
    });

    return similar.slice(0, limit);
  } catch {
    // Fallback: return category-based suggestions if query matches a category
    const matchingCategory = featuredCategories.find((cat) =>
      queryLower.includes(cat.title.toLowerCase())
    );
    if (matchingCategory) {
      return getTrendingByCategory(matchingCategory.title, limit);
    }
    return [];
  }
}

/**
 * Get category-based suggestions
 */
export function getCategorySuggestions(category: string, limit: number = 5): string[] {
  return getTrendingByCategory(category, limit);
}

/**
 * Get "continue searching" suggestions for returning users
 */
export function getContinueSearchingSuggestions(limit: number = 5): string[] {
  try {
    const state = useSearchStore.getState();
    const recentSearches = state.getRecentSearches(limit);

    if (recentSearches.length > 0) {
      return recentSearches;
    }

    // If no history, return popular searches
    const popular = state.getPopularSearches(limit);
    return popular.map((item) => item.query);
  } catch {
    return [];
  }
}

/**
 * Get personalized quick filters based on search history
 */
export function getPersonalizedQuickFilters(limit: number = 5): string[] {
  try {
    const state = useSearchStore.getState();
    const popularSearches = state.getPopularSearches(limit * 2);

    // Extract categories from popular searches
    const categoryCounts = new Map<string, number>();
    popularSearches.forEach((item) => {
      featuredCategories.forEach((cat) => {
        if (item.query.toLowerCase().includes(cat.title.toLowerCase())) {
          const count = categoryCounts.get(cat.title) || 0;
          categoryCounts.set(cat.title, count + item.count);
        }
      });
    });

    // Sort by frequency and return top categories
    const sortedCategories = Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([category]) => category);

    // If we don't have enough, fill with default categories
    if (sortedCategories.length < limit) {
      const defaultCategories = featuredCategories
        .map((cat) => cat.title)
        .filter((cat) => !sortedCategories.includes(cat))
        .slice(0, limit - sortedCategories.length);
      sortedCategories.push(...defaultCategories);
    }

    return sortedCategories.slice(0, limit);
  } catch {
    // Fallback to default categories
    return featuredCategories.slice(0, limit).map((cat) => cat.title);
  }
}

