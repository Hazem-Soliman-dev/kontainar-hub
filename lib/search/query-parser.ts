import { featuredCategories, bestSellerProducts } from "../mock/public";
import type { ParsedQuery } from "./types";

/**
 * Extract price range from query text
 */
export function extractPriceRange(query: string): {
  min?: number;
  max?: number;
} | null {
  const text = query.toLowerCase().trim();

  // Patterns: "under $50", "under 50", "below $50"
  const underMatch = text.match(/(?:under|below|less than|max)\s*\$?(\d+)/);
  if (underMatch) {
    return { max: parseFloat(underMatch[1]) };
  }

  // Patterns: "over $50", "above $50", "more than $50", "min $50"
  const overMatch = text.match(/(?:over|above|more than|min|minimum)\s*\$?(\d+)/);
  if (overMatch) {
    return { min: parseFloat(overMatch[1]) };
  }

  // Patterns: "$20-$100", "$20 to $100", "20-100", "between $20 and $100"
  const rangeMatch = text.match(
    /\$?(\d+)\s*(?:-|to|and)\s*\$?(\d+)|between\s*\$?(\d+)\s*and\s*\$?(\d+)/i
  );
  if (rangeMatch) {
    const min = parseFloat(rangeMatch[1] || rangeMatch[3] || "0");
    const max = parseFloat(rangeMatch[2] || rangeMatch[4] || "0");
    if (min < max) {
      return { min, max };
    }
  }

  return null;
}

/**
 * Extract category keywords from query
 */
export function extractCategories(query: string): string[] {
  const text = query.toLowerCase().trim();
  const foundCategories: string[] = [];

  featuredCategories.forEach((category) => {
    const categoryLower = category.title.toLowerCase();
    if (text.includes(categoryLower)) {
      foundCategories.push(category.title);
    }
  });

  return foundCategories;
}

/**
 * Extract brand names from query
 */
export function extractBrands(query: string): string[] {
  const text = query.toLowerCase().trim();
  const brands = new Set(bestSellerProducts.map((p) => p.brand.toLowerCase()));
  const foundBrands: string[] = [];

  brands.forEach((brand) => {
    if (text.includes(brand)) {
      const product = bestSellerProducts.find(
        (p) => p.brand.toLowerCase() === brand
      );
      if (product) {
        foundBrands.push(product.brand);
      }
    }
  });

  return foundBrands;
}

/**
 * Detect search intent from query
 */
export function detectIntent(query: string): "product" | "store" | "category" | "mixed" {
  const text = query.toLowerCase().trim();

  // Category keywords
  const categoryKeywords = featuredCategories.map((cat) => cat.title.toLowerCase());
  const hasCategory = categoryKeywords.some((keyword) => text.includes(keyword));

  // Store indicators
  const storeIndicators = ["store", "shop", "retailer", "supplier", "vendor"];
  const hasStore = storeIndicators.some((indicator) => text.includes(indicator));

  // Product indicators
  const productIndicators = ["product", "item", "buy", "price", "$"];
  const hasProduct = productIndicators.some((indicator) => text.includes(indicator));

  if (hasCategory && !hasStore && !hasProduct) {
    return "category";
  }
  if (hasStore && !hasCategory && !hasProduct) {
    return "store";
  }
  if (hasProduct && !hasStore && !hasCategory) {
    return "product";
  }

  return "mixed";
}

/**
 * Parse advanced query with all features
 */
export function parseAdvancedQuery(query: string): ParsedQuery {
  const text = query.trim();
  const parsed: ParsedQuery = {
    text: text,
  };

  // Extract price range
  const priceRange = extractPriceRange(text);
  if (priceRange) {
    parsed.priceRange = priceRange;
  }

  // Extract categories
  const categories = extractCategories(text);
  if (categories.length > 0) {
    parsed.categories = categories;
  }

  // Extract brands
  const brands = extractBrands(text);
  if (brands.length > 0) {
    parsed.brands = brands;
  }

  // Detect intent
  parsed.intent = detectIntent(text);

  return parsed;
}

/**
 * Clean query text by removing filter keywords
 */
export function cleanQueryText(query: string): string {
  let cleaned = query;

  // Remove price range patterns
  cleaned = cleaned.replace(
    /(?:under|below|less than|over|above|more than|min|minimum|max|between)\s*\$?\d+(?:\s*(?:-|to|and)\s*\$?\d+)?/gi,
    ""
  );

  // Remove common filter words
  cleaned = cleaned.replace(/\b(?:store|shop|product|item)\b/gi, "");

  // Clean up extra spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}

