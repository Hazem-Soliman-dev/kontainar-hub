"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  count: number;
}

interface SearchState {
  recentSearches: SearchHistoryItem[];
  addSearch: (query: string) => void;
  clearHistory: () => void;
  getPopularSearches: (limit?: number) => SearchHistoryItem[];
  getRecentSearches: (limit?: number) => string[];
}

const MAX_HISTORY = 15;

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      recentSearches: [],

      addSearch: (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        set((state) => {
          const existingIndex = state.recentSearches.findIndex(
            (item) => item.query.toLowerCase() === trimmedQuery.toLowerCase()
          );

          let newSearches: SearchHistoryItem[];

          if (existingIndex >= 0) {
            // Update existing search
            newSearches = [...state.recentSearches];
            newSearches[existingIndex] = {
              ...newSearches[existingIndex],
              timestamp: Date.now(),
              count: newSearches[existingIndex].count + 1,
            };
            // Move to front
            const item = newSearches.splice(existingIndex, 1)[0];
            newSearches.unshift(item);
          } else {
            // Add new search
            newSearches = [
              {
                query: trimmedQuery,
                timestamp: Date.now(),
                count: 1,
              },
              ...state.recentSearches,
            ].slice(0, MAX_HISTORY);
          }

          return { recentSearches: newSearches };
        });
      },

      clearHistory: () => {
        set({ recentSearches: [] });
      },

      getPopularSearches: (limit = 10) => {
        const state = get();
        return [...state.recentSearches]
          .sort((a, b) => b.count - a.count)
          .slice(0, limit);
      },

      getRecentSearches: (limit = 10) => {
        const state = get();
        return state.recentSearches.slice(0, limit).map((item) => item.query);
      },
    }),
    {
      name: "search-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

