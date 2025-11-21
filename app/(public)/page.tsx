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
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

import {
  bestSellerProducts,
  featuredCategories,
  featuredStores,
} from "../../lib/mock/public";
import { FavoriteButton } from "../../components/ui/favorite-button";
import { AddToCartButton } from "../../components/ui/add-to-cart-button";
import { ProductPriceOrRequest } from "../../components/ui/product-price-or-request";
import { HeroSearch } from "../../components/public/hero-search";
import {
  getUserSubscriptionFromCookies,
  hasActivePlan,
} from "../../lib/utils/subscription-check";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 ">
      <main className="flex flex-col gap-24 pb-24">
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedStoresSection />
        <BestSellersSection />
        <TrustSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900 pt-20 pb-32 lg:pt-32 lg:pb-40">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[100px] animate-pulse" />
        <div className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-secondary-500/20 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute left-[20%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-[80px] animate-pulse delay-2000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center z-10">
        
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-6xl lg:text-7xl mb-6">
          Discover Extraordinary Products
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
          Connect with top-tier suppliers and discover unique items from around the world. 
          Secure payments, verified sellers, and seamless logistics.
        </p>

        <div className="mx-auto max-w-2xl relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 opacity-30 blur-lg" />
          <div className="relative">
            <HeroSearch />
          </div>
        </div>

        {/* Floating Elements (Decorative) */}
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-10 animate-float-slow">
            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-glow">
                <Laptop className="h-8 w-8 text-primary-400" />
            </div>
        </div>
        <div className="hidden lg:block absolute top-1/3 right-10 animate-float-slower">
            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-glow">
                <Shirt className="h-8 w-8 text-secondary-400" />
            </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
    return (
        <section className="relative -mt-16 z-20 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 p-8 shadow-strong border border-neutral-300 dark:border-neutral-700 text-center">
                    {[
                        { label: "Active Users", value: "50K+", icon: TrendingUp, color: "text-primary-500" },
                        { label: "Verified Sellers", value: "2K+", icon: ShieldCheck, color: "text-secondary-500" },
                        { label: "Products Listed", value: "100K+", icon: Zap, color: "text-accent-500" },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-4 justify-center">
                            <div className={cn("p-3 rounded-2xl bg-blue-50 dark:bg-blue-900", stat.color)}>
                                <stat.icon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">{stat.value}</div>
                                <div className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CategoriesSection() {
  const duplicatedCategories = [...featuredCategories, ...featuredCategories];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">

      <div className="relative overflow-hidden py-4 -mx-4 px-4">
        <div className="flex gap-6 animate-infinite-scroll hover:[animation-play-state:paused]">
          {duplicatedCategories.map((category, index) => {
            const Icon = categoryIconMap[category.icon];
            return (
              <Link
                href={`/products?category=${category.id}`}
                key={`${category.id}-${index}`}
                className="group relative flex h-64 w-52 shrink-0 flex-col justify-end overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 p-6 transition-all hover:-translate-y-2 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-neutral-50/60 dark:bg-neutral-900/60 z-10" />
                {/* Placeholder for category image if available, using gradient for now */}
                <div className="absolute inset-0 bg-neutral-300 dark:bg-neutral-700 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="relative z-20">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-900 backdrop-blur-md text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800">
                        <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {category.title}
                    </h3>
                    <p className="text-sm text-neutral-900 dark:text-neutral-100">
                        {category.stats}
                    </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedStoresSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl">
            Featured Stores
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Shop from our most trusted and top-rated sellers
          </p>
        </div>
        <Link href="/stores" className="hidden sm:flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            View All Stores <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredStores.slice(0, 3).map((store) => (
            <div
              key={store.name}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-soft transition-all hover:shadow-strong hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                 <Image
                    src={store.imageUrl}
                    alt={store.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                 />
                 <div className="absolute top-4 right-4">
                    <FavoriteButton store={store} size={20} className="h-10 w-10 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black" />
                 </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                        {store.name}
                    </h3>
                    <div className="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        {store.rating.toFixed(1)}
                    </div>
                </div>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-6">
                    {store.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                        {store.domain}
                    </span>
                    <Link href={`/stores/${store.id}`} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                        Visit Store
                    </Link>
                </div>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}

async function BestSellersSection() {
  const subscription = await getUserSubscriptionFromCookies();
  const userHasActivePlan = hasActivePlan(subscription);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl">
            Best Sellers
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Top-rated products flying off the shelves
          </p>
        </div>
        <Link href="/top-products" className="hidden sm:flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bestSellerProducts.map((product) => (
          <div
            key={product.name}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-soft transition-all hover:shadow-strong hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        {product.tag}
                    </span>
                )}
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FavoriteButton product={product} size={18} className="h-9 w-9 bg-white shadow-sm" />
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-2">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-500">
                        {product.brand}
                    </p>
                    <Link href={`/products/${product.id}`} className="block mt-1">
                        <h3 className="font-bold text-neutral-900 dark:text-neutral-200 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                    <ProductPriceOrRequest
                        product={product}
                        hasActivePlan={userHasActivePlan}
                        size="lg"
                    />
                    {userHasActivePlan && (
                        <AddToCartButton product={product} size="sm" className="rounded-full" />
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
    return (
        <section className="bg-neutral-900 py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-12">
                    Trusted by Businesses Worldwide
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for partner logos */}
                    {['Acme Corp', 'Global Tech', 'Logistics Pro', 'Trade Union'].map((partner, i) => (
                        <div key={i} className="flex items-center justify-center h-16 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-200">{partner}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

