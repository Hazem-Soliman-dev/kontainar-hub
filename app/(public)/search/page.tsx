import { Suspense } from "react";
import { createMetadata } from "../../../lib/seo/metadata";
import SearchClient from "./search-client";

export const metadata = createMetadata({
  title: "Search Results | MarketHub",
  description: "Search for products, stores, and categories on MarketHub",
  path: "/search",
  keywords: ["search", "products", "stores", "marketplace"],
});

function SearchFallback() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400">Loading search results...</p>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}

