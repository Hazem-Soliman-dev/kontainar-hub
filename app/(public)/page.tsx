import Image from "next/image";
import Link from "next/link";

import { createMetadata } from "../../lib/seo/metadata";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Dumbbell,
  Gamepad2,
  Home as HomeIcon,
  Laptop,
  Shirt,
  Sparkles,
  Star,
} from "lucide-react";

import {
  bestSellerProducts,
  featuredCategories,
  featuredStores,
  quickFilters,
} from "../../lib/mock/public";
import { FavoriteButton } from "../../components/ui/favorite-button";
import { AddToCartButton } from "../../components/ui/add-to-cart-button";
import { ProductPriceOrRequest } from "../../components/ui/product-price-or-request";
import { HeroSearch } from "../../components/public/hero-search";
import {
  getUserSubscriptionFromCookies,
  hasActivePlan,
} from "../../lib/utils/subscription-check";

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

export const metadata = createMetadata({
  title: "MarketHub | Discover Amazing Products",
  description:
    "Discover amazing products from trusted stores across every category.",
  path: "/",
  keywords: ["marketplace", "ecommerce", "featured products", "popular stores"],
});

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col gap-20 pb-26">
        <HeroSection />
        <CategoriesSection />
        <StoresSection />
        <BestSellersSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 py-12 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white lg:text-6xl">
          Discover Amazing Products
          <span className="block font-normal text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-5xl mt-2">
            From Trusted Stores
          </span>
        </h1>

        <HeroSearch />
      </div>
    </section>
  );
}

function CategoriesSection() {
  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [...featuredCategories, ...featuredCategories];

  return (
    <section
      id="categories"
      className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 pt-4 text-neutral-900 dark:text-neutral-900"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Featured Categories
        </h2>
      </div>

      <div className="overflow-hidden py-4">
        <div className="flex gap-3 sm:gap-5 animate-infinite-scroll">
          {duplicatedCategories.map((category, index) => {
            const Icon = categoryIconMap[category.icon];
            return (
              <div
                key={`${category.id}-${index}`}
                className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60 items-center justify-center min-w-[160px] sm:min-w-[200px] shrink-0"
              >
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-600/10 text-blue-300">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="items-center justify-center text-center gap-1">
                  <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                    {category.stats}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StoresSection() {
  return (
    <section
      id="stores"
      className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-4"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="items-center justify-center sm:text-left gap-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
            Featured Stores
          </h2>
        </div>
        <Link
          href="/stores"
          className="text-sm sm:text-md font-semibold text-blue-400 hover:text-blue-300"
        >
          View All Stores
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredStores
          .map((store) => (
            <div
              key={store.name}
              className="relative flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10">
                <FavoriteButton store={store} size={18} className="h-8 w-8" />
              </div>
              <Link
                href={`/stores/${store.id}?from=home&section=stores`}
                className="flex flex-col gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200">
                    <Image
                      src={store.imageUrl}
                      alt={store.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-900">
                      {store.name}
                    </p>
                    <div className="flex items-center gap-1 text-amber-300">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="h-3 w-3 sm:h-4 sm:w-4"
                          strokeWidth={
                            index < Math.round(store.rating) ? 0 : 1.5
                          }
                          fill={
                            index < Math.round(store.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                        ({store.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-700">
                  {store.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-700">
                    {store.domain}
                  </span>
                  <span className="rounded-full bg-blue-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs uppercase tracking-wide text-white transition hover:bg-blue-600">
                    Enter Store
                  </span>
                </div>
              </Link>
            </div>
          ))
          .slice(0, 3)}
      </div>
    </section>
  );
}

async function BestSellersSection() {
  const subscription = await getUserSubscriptionFromCookies();
  const userHasActivePlan = hasActivePlan(subscription);

  return (
    <section
      id="deals"
      className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
            Best Sellers
          </h2>
        </div>
        <Link
          href="/top-products"
          className="text-sm sm:text-md font-semibold text-blue-400 hover:text-blue-300"
        >
          View All Products
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bestSellerProducts.map((product) => (
          <div
            key={product.name}
            className="relative flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-3 sm:p-4 shadow-sm transition hover:-translate-y-1 hover:border-purple-500/60"
          >
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10">
              <FavoriteButton product={product} size={18} className="h-8 w-8" />
            </div>
            <Link
              href={`/products/${product.id}?from=home&section=best-sellers`}
              className="flex flex-col gap-3 sm:gap-4"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-200/40 dark:bg-neutral-200/40">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={360}
                  height={220}
                  className="h-36 sm:h-44 w-full object-cover transition duration-500 hover:scale-105"
                />
                {product.tag ? (
                  <span className="absolute left-2 sm:left-3 top-2 sm:top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">
                    {product.tag}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-900 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                  {product.brand}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <ProductPriceOrRequest
                  product={product}
                  hasActivePlan={userHasActivePlan}
                  size="md"
                />
              </div>
            </Link>
            {userHasActivePlan && (
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10">
                <AddToCartButton product={product} size="sm" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
