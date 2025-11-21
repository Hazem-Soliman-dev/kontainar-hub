"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SearchAutocomplete } from "../ui/search-autocomplete";
import { useSearchStore } from "../../lib/store/search-store";
import { quickFilters } from "../../lib/mock/public";

export function HeroSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { addSearch } = useSearchStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addSearch(searchQuery.trim());
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickFilterClick = (filter: string) => {
    router.push(`/search?category=${encodeURIComponent(filter)}`);
  };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 sm:gap-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex w-full overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm backdrop-blur">
          <div className="flex-1">
            <SearchAutocomplete
              query={searchQuery}
              onQueryChange={setSearchQuery}
            />
          </div>
          <button
            type="submit"
            className="text-white px-2 sm:px-3 my-2 mx-2 sm:mx-4 rounded-full text-md bg-blue-600 transition hover:bg-blue-700"
            aria-label="Search"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Popular Search
        </p>
        {quickFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleQuickFilterClick(filter)}
            className="rounded-full bg-blue-50 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur transition hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

