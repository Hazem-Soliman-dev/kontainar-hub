"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Search,
  Store,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import { featuredStores as stores } from "../../../lib/mock/public";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { FavoriteButton } from "../../../components/ui/favorite-button";
import { cn } from "@/lib/utils";
import { useLanguage } from "../../../components/providers/language-provider";
import { MotionWrapper } from "../../../components/ui/motion-wrapper";

export default function StoresClient() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "top-rated" | "new">("all");

  const filteredStores = useMemo(() => {
    let result = [...stores];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          store.description.toLowerCase().includes(query) ||
          store.domain.toLowerCase().includes(query)
      );
    }

    // Apply filter
    if (filter === "top-rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filter === "new") {
      // Mock "new" by reversing original order for now
      result.reverse();
    }

    return result;
  }, [searchQuery, filter]);

  const featuredStore = stores[0]; // Mock featured store

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <main className="flex flex-col gap-12 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900 pt-16 pb-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-primary-600/20 blur-[120px]" />
            <div className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-secondary-500/20 blur-[120px]" />
          </div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

          <div className="relative mx-auto max-w-7xl px-6 text-center z-10">
            <MotionWrapper variant="fade-up" delay={0.1}>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-6xl mb-6">
                {t("home.storesPage.hero.title")}
              </h1>
            </MotionWrapper>
            <MotionWrapper variant="fade-up" delay={0.2}>
              <p className="mx-auto max-w-2xl text-lg text-neutral-500 dark:text-neutral-400 mb-10">
                {t("home.storesPage.hero.description")}
              </p>
            </MotionWrapper>

            {/* Search Bar */}
            <MotionWrapper variant="scale-up" delay={0.3} className="mx-auto max-w-2xl relative">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-500" />
                <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl shadow-sm">
                  <Search className="absolute start-4 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  <input
                    type="text"
                    placeholder={t("home.storesPage.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none py-4 ps-12 pe-4 text-neutral-900 dark:text-neutral-500 placeholder-neutral-400 focus:ring-0 text-lg outline-none"
                  />
                </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-6 -mt-20 relative z-20">
          <div className="mb-8">
            <Breadcrumb />
          </div>

          {/* Featured Store (if no search) */}
          {!searchQuery && (
            <MotionWrapper variant="fade-up" delay={0.2} className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-amber-500" />
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.storesPage.featuredStore")}
                </h2>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-neutral-50 dark:bg-neutral-900 shadow-sm group">
                <div className="absolute inset-0">
                  <Image
                    src={featuredStore.imageUrl}
                    alt={featuredStore.name}
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/50 to-transparent" />
                </div>
                <div className="relative p-8 sm:p-12 flex flex-col items-start gap-6 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-2xl bg-white p-1">
                      <div className="h-full w-full rounded-xl bg-neutral-100 relative overflow-hidden">
                        <Image
                          src={featuredStore.imageUrl}
                          alt={featuredStore.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                        {featuredStore.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">
                          {featuredStore.rating}
                        </span>
                        <span className="text-neutral-400 ms-1">
                          ({Math.floor(Math.random() * 500) + 50} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-neutral-300 leading-relaxed">
                    {featuredStore.description}
                  </p>
                  <Link
                    href={`/stores/${featuredStore.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-neutral-50 dark:text-neutral-200 px-6 py-3 font-bold transition hover:bg-neutral-800 dark:hover:bg-neutral-300"
                  >
                    {t("home.storesPage.visitStore")}{" "}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </MotionWrapper>
          )}

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 w-fit">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  filter === "all"
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                {t("home.storesPage.filters.all")}
              </button>
              <button
                onClick={() => setFilter("top-rated")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  filter === "top-rated"
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                <Star className="h-4 w-4" /> {t("home.storesPage.filters.topRated")}
              </button>
              <button
                onClick={() => setFilter("new")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  filter === "new"
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                <TrendingUp className="h-4 w-4" /> {t("home.storesPage.filters.newest")}
              </button>
            </div>
            <p className="text-sm text-neutral-500">
              {t("home.storesPage.filters.showing")}{" "}
              <span className="font-bold text-neutral-900 dark:text-neutral-200">
                {filteredStores.length}
              </span>{" "}
              {t("home.storesPage.filters.stores")}
            </p>
          </div>

          {/* Stores Grid */}
          {filteredStores.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStores.map((store, index) => (
                <MotionWrapper key={store.id} delay={index * 0.05} variant="fade-up">
                  <div
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 lg:hover:scale-[1.02] duration-500 h-full"
                  >
                    {/* Cover Image */}
                    <div className="relative h-40 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <Image
                        src={store.imageUrl}
                        alt={store.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 end-4 z-10">
                        <FavoriteButton
                          store={store}
                          size={18}
                          className="h-9 w-9 bg-white/20 backdrop-blur-md text-neutral-900 dark:text-neutral-200 hover:bg-white hover:text-red-500 border-none"
                        />
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="relative px-6 pt-12 pb-6 flex-1 flex flex-col">
                      {/* Logo */}
                      <div className="absolute -top-10 start-6 h-20 w-20 rounded-2xl border-4 border-neutral-900 dark:border-neutral-900 bg-white dark:bg-neutral-800 shadow-md overflow-hidden">
                        <Image
                          src={store.imageUrl}
                          alt={store.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Link
                            href={`/stores/${store.id}`}
                            className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                          >
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                              {store.name}
                            </h3>
                          </Link>
                          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            {store.domain}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800/50">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                            {store.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-6 flex-1">
                        {store.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="h-8 w-8 rounded-full border-2 border-neutral-900 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500"
                            >
                              P{i}
                            </div>
                          ))}
                          <div className="h-8 w-8 rounded-full border-2 border-neutral-900 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500">
                            +12
                          </div>
                        </div>
                        <Link
                          href={`/stores/${store.id}`}
                          className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                        >
                          {t("home.storesPage.visit")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <Store className="h-16 w-16 text-neutral-300 mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
                {t("home.storesPage.noStores.title")}
              </h3>
              <p className="text-neutral-500 max-w-md">
                {t("home.storesPage.noStores.description")}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="mt-6 text-primary-600 font-semibold hover:underline"
              >
                {t("home.storesPage.noStores.clear")}
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-50 dark:bg-neutral-900 px-6 py-16 sm:px-16 sm:py-24 text-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-[20%] -top-[20%] h-[600px] w-[600px] rounded-full bg-primary-600/20 blur-[120px]" />
              <div className="absolute -right-[20%] bottom-[20%] h-[600px] w-[600px] rounded-full bg-secondary-500/20 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                {t("home.storesPage.cta.title")}
              </h2>
              <p className="mx-auto max-w-xl text-lg text-neutral-500 dark:text-neutral-400 mb-8">
                {t("home.storesPage.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register?role=seller"
                  className="rounded-xl px-8 py-3.5 text-base font-bold text-neutral-900 dark:text-neutral-200 shadow-sm hover:text-blue-600 transition-colors"
                >
                  {t("home.storesPage.cta.becomeSeller")}
                </Link>
                <Link
                  href="/seller-agreement"
                  className="rounded-xl border border-neutral-700 bg-neutral-800/50 px-8 py-3.5 text-base font-bold text-neutral-900 dark:text-neutral-200 backdrop-blur-sm hover:bg-neutral-800 hover:text-blue-600 transition-colors"
                >
                  {t("home.storesPage.cta.learnMore")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
