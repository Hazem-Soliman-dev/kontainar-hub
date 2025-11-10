import Image from "next/image";
import Link from "next/link";

import { createMetadata } from "../../lib/seo/metadata";
import type { LucideIcon } from "lucide-react";
import {
  Dumbbell,
  Gamepad2,
  Home as HomeIcon,
  Laptop,
  Search,
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Amazing Products
          <span className="block font-normal text-white/80 text-2xl lg:text-5xl mt-2">
            From Trusted Stores
          </span>
        </h1>

        <div className="flex w-full max-w-3xl overflow-hidden rounded-full border bg-white shadow-lg backdrop-blur">
          <input
            type="text"
            placeholder="Search products, stores, or brands..."
            className="w-full bg-transparent px-6 py-4 text-md text-slate-900 placeholder:text-slate-900/60 focus:outline-none"
          />
          <button
            type="button"
            className="text-white px-3 my-2 mx-4 rounded-full text-md bg-blue-600 transition hover:bg-blue-700"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {quickFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="rounded-full bg-white/20 px-3 py-1 text-md font-medium text-white backdrop-blur transition hover:bg-white/30"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section
      id="categories"
      className="mx-auto w-full max-w-7xl space-y-6 px-6 pt-4 text-slate-100"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-3xl font-semibold text-white">Featured Categories</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        {featuredCategories.map((category) => {
          const Icon = categoryIconMap[category.icon];
          return (
            <div
              key={category.title}
              className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-600/20 items-center justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-300">
                <Icon className="h-8 w-8" />
              </div>
              <div className="items-center justify-center text-center gap-1">
                <h3 className="text-md font-semibold text-white">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-400">{category.stats}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StoresSection() {
  return (
    <section
      id="stores"
      className="mx-auto w-full max-w-7xl space-y-6 px-6 text-slate-100 mt-4"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="items-center justify-center text-center gap-1">
          <h2 className="text-3xl font-semibold text-white ">Featured Stores</h2>
        </div>
        <Link
          href="/stores"
          className="text-md font-semibold text-blue-400 hover:text-blue-300"
        >
          View All Stores
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {featuredStores.map((store) => (
          <div
            key={store.name}
            className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-600/20"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-3xl border border-slate-700">
                <Image
                  src={store.imageUrl}
                  alt={store.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{store.name}</p>
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4"
                      strokeWidth={index < Math.round(store.rating) ? 0 : 1.5}
                      fill={
                        index < Math.round(store.rating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-300">
                    ({store.rating.toFixed(1)})
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              {store.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {store.domain}
              </span>
              <button
                type="button"
                className="rounded-full bg-blue-500 px-4 py-2 text-xs uppercase tracking-wide text-white transition hover:bg-blue-600"
              >
                <Link href={`/stores/${store.id}`} className="text-white">Enter Store</Link>
              </button>
            </div>
          </div>
        )).slice(0, 3)}
      </div>
    </section>
  );
}

function BestSellersSection() {
  return (
    <section
      id="deals"
      className="mx-auto w-full max-w-7xl space-y-6 px-6 text-slate-100"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Best Sellers</h2>
        </div>
        <Link
          href="/best-sellers"
          className="text-md font-semibold text-blue-400 hover:text-blue-300"
        >
          View All Products
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {bestSellerProducts.map((product) => (
          <div
            key={product.name}
            className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-purple-950/20 transition hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-purple-500/20"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/40">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={360}
                height={220}
                className="h-44 w-full object-cover transition duration-500 hover:scale-105"
              />
              {product.tag ? (
                <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">
                  {product.tag}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-white">
                {product.name}
              </h3>
              <p className="text-sm text-slate-400">{product.brand}</p>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-end gap-2">
                <span className="text-md font-semibold text-white">
                  {formatCurrency(product.price)}
                </span>
                {product.previousPrice ? (
                  <span className="text-xs text-slate-500 line-through">
                    {formatCurrency(product.previousPrice)}
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
