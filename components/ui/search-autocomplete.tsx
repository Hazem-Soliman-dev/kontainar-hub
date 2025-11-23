"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../providers/language-provider";
import type { LucideIcon } from "lucide-react";
import {
  Laptop,
  Shirt,
  Home as HomeIcon,
  Dumbbell,
  Sparkles,
  Gamepad2,
  BookOpen,
  Store,
  Tag,
  ChevronRight,
  Clock,
  TrendingUp,
  Sparkles as SparklesIcon,
} from "lucide-react";
import {
  searchProducts,
  searchStores,
  searchCategories,
  searchBrands,
} from "../../lib/search/search-utils";
import { featuredCategories } from "../../lib/mock/public";
import { useSearchStore } from "../../lib/store/search-store";
import { getTrendingSearches } from "../../lib/search/trending";
import {
  getPersonalizedSuggestions,
  getContinueSearchingSuggestions,
} from "../../lib/search/personalization";
import type {
  SearchSuggestion,
  GroupedSuggestions,
} from "../../lib/search/types";

const categoryIconMap: Record<
  (typeof featuredCategories)[number]["icon"],
  LucideIcon
> = {
  electronics: Laptop,
  fashion: Shirt,
  home: HomeIcon,
  sports: Dumbbell,
  beauty: Sparkles,
  gaming: Gamepad2,
  books: BookOpen,
};

interface SearchAutocompleteProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSelect?: (suggestion: SearchSuggestion) => void;
  maxResults?: number;
  className?: string;
}



export function SearchAutocomplete({
  query,
  onQueryChange,
  onSelect,
  maxResults = 5,
  className = "",
}: SearchAutocompleteProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { getRecentSearches, clearHistory } = useSearchStore();

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Generate suggestions
  const suggestions = useMemo<GroupedSuggestions>(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      return { products: [], stores: [], categories: [], brands: [] };
    }

    const products = searchProducts(debouncedQuery)
      .slice(0, maxResults)
      .map((product) => ({
        type: "product" as const,
        id: product.id,
        title: product.name,
        subtitle: product.brand,
        imageUrl: product.imageUrl,
      }));

    const stores = searchStores(debouncedQuery)
      .slice(0, maxResults)
      .map((store) => ({
        type: "store" as const,
        id: store.id,
        title: store.name,
        subtitle: store.domain,
        imageUrl: store.imageUrl,
      }));

    const categories = searchCategories(debouncedQuery)
      .slice(0, maxResults)
      .map((category) => {
        const Icon = categoryIconMap[category.icon];
        return {
          type: "category" as const,
          id: category.id,
          title: category.title,
          subtitle: category.stats,
          icon: category.icon,
        };
      });

    const brands = searchBrands(debouncedQuery)
      .slice(0, maxResults)
      .map((brand) => ({
        type: "brand" as const,
        id: brand,
        title: brand,
      }));

    return { products, stores, categories, brands };
  }, [debouncedQuery, maxResults]);

  const allSuggestions = useMemo(() => {
    const flat: SearchSuggestion[] = [];
    suggestions.products.forEach((s) => flat.push(s));
    suggestions.stores.forEach((s) => flat.push(s));
    suggestions.categories.forEach((s) => flat.push(s));
    suggestions.brands.forEach((s) => flat.push(s));
    return flat;
  }, [suggestions]);

  const hasResults = useMemo(() => {
    return (
      suggestions.products.length > 0 ||
      suggestions.stores.length > 0 ||
      suggestions.categories.length > 0 ||
      suggestions.brands.length > 0
    );
  }, [suggestions]);

  // Get recent searches, trending, and personalized suggestions
  const recentSearches = useMemo(
    () => getRecentSearches(5),
    [getRecentSearches]
  );
  const trendingSearches = useMemo(() => getTrendingSearches(5), []);
  const personalizedSuggestions = useMemo(
    () => getPersonalizedSuggestions(undefined, { recentSearches }),
    [recentSearches]
  );
  const continueSearching = useMemo(
    () => getContinueSearchingSuggestions(3),
    []
  );

  const showPersonalized = !debouncedQuery.trim() || debouncedQuery.length < 2;

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || !hasResults) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < allSuggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && allSuggestions[selectedIndex]) {
            handleSelect(allSuggestions[selectedIndex]);
          } else if (query.trim()) {
            handleSearch(query);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }
    },
    [isOpen, hasResults, selectedIndex, allSuggestions, query]
  );

  const handleSelect = useCallback(
    (suggestion: SearchSuggestion) => {
      if (onSelect) {
        onSelect(suggestion);
      } else {
        if (suggestion.type === "product") {
          router.push(`/products/${suggestion.id}`);
        } else if (suggestion.type === "store") {
          router.push(`/stores/${suggestion.id}`);
        } else if (suggestion.type === "category") {
          router.push(
            `/search?category=${encodeURIComponent(suggestion.title)}`
          );
        } else if (suggestion.type === "brand") {
          router.push(
            `/search?q=${encodeURIComponent(
              suggestion.title
            )}&brand=${encodeURIComponent(suggestion.title)}`
          );
        }
      }
      setIsOpen(false);
      setSelectedIndex(-1);
    },
    [onSelect, router]
  );

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    },
    [router]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onQueryChange(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (hasResults) {
      setIsOpen(true);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-blue-500/20 text-blue-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const renderSuggestion = (
    suggestion: SearchSuggestion,
    index: number,
    groupTitle: string
  ) => {
    const isSelected = selectedIndex === index;
    const iconKey =
      suggestion.type === "category" && suggestion.icon
        ? (suggestion.icon as keyof typeof categoryIconMap)
        : null;
    const Icon = iconKey ? categoryIconMap[iconKey] : null;

    return (
      <button
        key={`${suggestion.type}-${suggestion.id}`}
        type="button"
        onClick={() => handleSelect(suggestion)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
          isSelected
            ? "bg-blue-500/20 text-blue-300"
            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
        }`}
      >
        {suggestion.imageUrl ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-700">
            <Image
              src={suggestion.imageUrl}
              alt={suggestion.title}
              fill
              className="object-cover"
            />
          </div>
        ) : Icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-300">
            <Icon className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
            {suggestion.type === "brand" ? (
              <Tag className="h-5 w-5" />
            ) : (
              <Store className="h-5 w-5" />
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-white">
            {highlightText(suggestion.title, debouncedQuery)}
          </div>
          {suggestion.subtitle && (
            <div className="text-xs text-slate-400">{suggestion.subtitle}</div>
          )}
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
      </button>
    );
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={t("home.hero.placeholder")} 
          className="w-full bg-transparent px-12 py-4 text-md text-slate-600 placeholder:text-slate-600 focus:outline-none dark:text-slate-300 dark:placeholder:text-slate-300"
        />
      </div>

      {isOpen && (hasResults || showPersonalized) && (
        <div
          ref={suggestionsRef}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-sm backdrop-blur"
        >
          {/* Recent Searches */}
          {showPersonalized && recentSearches.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearHistory();
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, idx) => (
                  <button
                    key={search}
                    type="button"
                    onClick={() => {
                      onQueryChange(search);
                      handleSearch(search);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                      selectedIndex === idx - 100
                        ? "bg-blue-500/20 text-blue-300"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <Clock className="h-4 w-4 shrink-0 text-slate-500" />
                    <span className="flex-1 text-sm">{search}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {showPersonalized && trendingSearches.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <TrendingUp className="h-3 w-3" />
                Trending Now
              </div>
              <div className="space-y-1">
                {trendingSearches.map((search, idx) => (
                  <button
                    key={search}
                    type="button"
                    onClick={() => {
                      onQueryChange(search);
                      handleSearch(search);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                      selectedIndex === idx - 200
                        ? "bg-blue-500/20 text-blue-300"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 shrink-0 text-slate-500" />
                    <span className="flex-1 text-sm">{search}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personalized Suggestions */}
          {showPersonalized && personalizedSuggestions.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <SparklesIcon className="h-3 w-3" />
                For You
              </div>
              <div className="space-y-1">
                {personalizedSuggestions.slice(0, 3).map((search, idx) => (
                  <button
                    key={search}
                    type="button"
                    onClick={() => {
                      onQueryChange(search);
                      handleSearch(search);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                      selectedIndex === idx - 300
                        ? "bg-blue-500/20 text-blue-300"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <SparklesIcon className="h-4 w-4 shrink-0 text-slate-500" />
                    <span className="flex-1 text-sm">{search}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {!showPersonalized && hasResults && (
            <>
              {suggestions.products.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Products ({suggestions.products.length})
                  </div>
                  <div className="space-y-1">
                    {suggestions.products.map((suggestion, idx) =>
                      renderSuggestion(suggestion, idx, "products")
                    )}
                  </div>
                </div>
              )}

              {suggestions.stores.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Stores ({suggestions.stores.length})
                  </div>
                  <div className="space-y-1">
                    {suggestions.stores.map((suggestion, idx) =>
                      renderSuggestion(
                        suggestion,
                        suggestions.products.length + idx,
                        "stores"
                      )
                    )}
                  </div>
                </div>
              )}

              {suggestions.categories.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Categories ({suggestions.categories.length})
                  </div>
                  <div className="space-y-1">
                    {suggestions.categories.map((suggestion, idx) =>
                      renderSuggestion(
                        suggestion,
                        suggestions.products.length +
                          suggestions.stores.length +
                          idx,
                        "categories"
                      )
                    )}
                  </div>
                </div>
              )}

              {suggestions.brands.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Brands ({suggestions.brands.length})
                  </div>
                  <div className="space-y-1">
                    {suggestions.brands.map((suggestion, idx) =>
                      renderSuggestion(
                        suggestion,
                        suggestions.products.length +
                          suggestions.stores.length +
                          suggestions.categories.length +
                          idx,
                        "brands"
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="mt-2 border-t border-slate-800 pt-2">
                <Link
                  href={`/search?q=${encodeURIComponent(debouncedQuery)}`}
                  className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  View all results for "{debouncedQuery}"
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
