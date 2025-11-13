import type {
  BestSellerProduct,
  FeaturedStore,
  FeaturedCategory,
} from "../mock/public";

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  momentum?: "surging" | "steady" | "emerging";
  region?: string;
  brand?: string;
}

export interface SearchResult {
  products: BestSellerProduct[];
  stores: FeaturedStore[];
  categories: FeaturedCategory[];
}

export interface SearchSuggestion {
  type: "product" | "store" | "category" | "brand";
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  icon?: string;
}

export interface GroupedSuggestions {
  products: SearchSuggestion[];
  stores: SearchSuggestion[];
  categories: SearchSuggestion[];
  brands: SearchSuggestion[];
}

export interface ParsedQuery {
  text: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  categories?: string[];
  brands?: string[];
  intent?: "product" | "store" | "category" | "mixed";
}

export interface RelevanceScore {
  score: number;
  factors: {
    exactMatch: number;
    partialMatch: number;
    categoryMatch: number;
    brandMatch: number;
    bestSeller: number;
    momentum: number;
    rating: number;
  };
}

