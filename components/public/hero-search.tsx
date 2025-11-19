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
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex w-full overflow-hidden rounded-full border bg-white shadow-sm backdrop-blur">
          <div className="flex-1">
            <SearchAutocomplete
              query={searchQuery}
              onQueryChange={setSearchQuery}
            />
          </div>
          <button
            type="submit"
            className="text-white px-3 my-2 mx-4 rounded-full text-md bg-blue-600 transition hover:bg-blue-700"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <p className="text-sm font-medium text-white/90">
          Popular Search
        </p>
        {quickFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleQuickFilterClick(filter)}
            className="rounded-full bg-white/20 px-3 py-1 text-md font-medium text-white backdrop-blur transition hover:bg-white/30"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

