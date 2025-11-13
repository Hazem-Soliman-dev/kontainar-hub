/**
 * Search Analytics Integration
 * 
 * This is a mock implementation that can be easily replaced with a real analytics service.
 * Replace the functions below with calls to your analytics provider (e.g., Google Analytics, Mixpanel, etc.)
 */

interface SearchEvent {
  query: string;
  filters?: Record<string, unknown>;
  resultCount?: number;
  timestamp: number;
}

interface FilterEvent {
  filterType: string;
  filterValue: unknown;
  query?: string;
  timestamp: number;
}

interface ClickEvent {
  type: "product" | "store" | "category" | "suggestion";
  id: string;
  query?: string;
  position?: number;
  timestamp: number;
}

// In-memory storage for mock analytics (replace with real service)
const mockAnalytics: {
  searches: SearchEvent[];
  filters: FilterEvent[];
  clicks: ClickEvent[];
  zeroResults: string[];
} = {
  searches: [],
  filters: [],
  clicks: [],
  zeroResults: [],
};

/**
 * Track a search query
 */
export function trackSearch(
  query: string,
  filters?: Record<string, unknown>,
  resultCount?: number
): void {
  const event: SearchEvent = {
    query: query.trim(),
    filters,
    resultCount,
    timestamp: Date.now(),
  };

  // Mock: Store in memory (replace with real analytics call)
  mockAnalytics.searches.push(event);
  console.log("[Analytics] Search tracked:", event);

  // Example: Replace with real analytics
  // gtag('event', 'search', { search_term: query, ... });
  // mixpanel.track('Search', { query, filters, resultCount });
}

/**
 * Track filter usage
 */
export function trackFilterUsage(
  filterType: string,
  filterValue: unknown,
  query?: string
): void {
  const event: FilterEvent = {
    filterType,
    filterValue,
    query,
    timestamp: Date.now(),
  };

  // Mock: Store in memory (replace with real analytics call)
  mockAnalytics.filters.push(event);
  console.log("[Analytics] Filter usage tracked:", event);

  // Example: Replace with real analytics
  // gtag('event', 'filter_used', { filter_type: filterType, filter_value: filterValue });
}

/**
 * Track result clicks
 */
export function trackResultClick(
  type: "product" | "store" | "category" | "suggestion",
  id: string,
  query?: string,
  position?: number
): void {
  const event: ClickEvent = {
    type,
    id,
    query,
    position,
    timestamp: Date.now(),
  };

  // Mock: Store in memory (replace with real analytics call)
  mockAnalytics.clicks.push(event);
  console.log("[Analytics] Result click tracked:", event);

  // Example: Replace with real analytics
  // gtag('event', 'click', { item_type: type, item_id: id, query, position });
}

/**
 * Track zero-result searches
 */
export function trackZeroResults(query: string): void {
  // Mock: Store in memory (replace with real analytics call)
  mockAnalytics.zeroResults.push(query);
  console.log("[Analytics] Zero results tracked:", query);

  // Example: Replace with real analytics
  // gtag('event', 'search', { search_term: query, no_results: true });
}

/**
 * Track search-to-purchase conversion (when user adds to cart from search)
 */
export function trackSearchToPurchase(
  productId: string,
  query: string,
  timeToPurchase?: number
): void {
  const event = {
    productId,
    query,
    timeToPurchase,
    timestamp: Date.now(),
  };

  // Mock: Store in memory (replace with real analytics call)
  console.log("[Analytics] Search-to-purchase tracked:", event);

  // Example: Replace with real analytics
  // gtag('event', 'purchase', { transaction_id: productId, search_term: query });
}

/**
 * Get popular searches (for analytics dashboard)
 */
export function getPopularSearches(limit: number = 10): Array<{ query: string; count: number }> {
  // Mock: Calculate from stored searches (replace with real analytics query)
  const searchCounts = new Map<string, number>();
  mockAnalytics.searches.forEach((search) => {
    const count = searchCounts.get(search.query) || 0;
    searchCounts.set(search.query, count + 1);
  });

  return Array.from(searchCounts.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Get zero-result queries (for improving search)
 */
export function getZeroResultQueries(limit: number = 10): string[] {
  return mockAnalytics.zeroResults.slice(0, limit);
}

/**
 * Get filter usage statistics
 */
export function getFilterUsageStats(): Record<string, number> {
  // Mock: Calculate from stored filter events (replace with real analytics query)
  const filterCounts: Record<string, number> = {};
  mockAnalytics.filters.forEach((filter) => {
    const key = `${filter.filterType}:${String(filter.filterValue)}`;
    filterCounts[key] = (filterCounts[key] || 0) + 1;
  });
  return filterCounts;
}

/**
 * Clear mock analytics data (for testing)
 */
export function clearMockAnalytics(): void {
  mockAnalytics.searches = [];
  mockAnalytics.filters = [];
  mockAnalytics.clicks = [];
  mockAnalytics.zeroResults = [];
}

