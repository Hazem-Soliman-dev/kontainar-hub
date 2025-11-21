"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { useMemo } from "react";

import { useFavoritesStore } from "../../lib/store/favorites-store";
import { bestSellerProducts, featuredStores } from "../../lib/mock/public";
import { getProducts } from "../../lib/mock/products";
import { FavoriteButton } from "../../components/ui/favorite-button";
import { FavoritesFilters } from "../../components/ui/favorites-filters";
import { Breadcrumb } from "../../components/ui/breadcrumb";
import { ProductPriceOrRequest } from "../../components/ui/product-price-or-request";
import { useEffect, useState } from "react";
import type { BestSellerProduct, FeaturedStore } from "../../lib/mock/public";
import type { ProductRecord } from "../../lib/mock/products";
import { hasActivePlan } from "../../lib/utils/has-active-plan";
import { useAuthStore } from "../../lib/store/auth-store";
import type { SubscriptionSnapshot } from "../../lib/mock/subscriptions";

type FavoriteProduct = BestSellerProduct | ProductRecord;

export function FavoritesClient() {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>(
    []
  );
  const [favoriteStores, setFavoriteStores] = useState<FeaturedStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    rating: "all",
  });
  const authSubscription = useAuthStore((state) => state.subscription);
  const [hasActivePlanState, setHasActivePlanState] = useState(false);

  // Subscribe to store changes
  const productIds = useFavoritesStore((state) => state.productIds);
  const storeIds = useFavoritesStore((state) => state.storeIds);

  // Update state when auth store subscription changes (after hydration)
  useEffect(() => {
    setHasActivePlanState(hasActivePlan(authSubscription));
  }, [authSubscription]);

  // Listen for subscription changes and fetch as fallback
  useEffect(() => {
    const fetchSubscription = () => {
      fetch("/api/subscription")
        .then((res) => res.json())
        .then((data: { subscription: SubscriptionSnapshot | null }) => {
          setHasActivePlanState(hasActivePlan(data.subscription));
        })
        .catch(() => {
          setHasActivePlanState(false);
        });
    };

    // If no subscription in store after mount, fetch from API
    if (!authSubscription) {
      fetchSubscription();
    }

    window.addEventListener("subscription-changed", fetchSubscription);

    return () => {
      window.removeEventListener("subscription-changed", fetchSubscription);
    };
  }, [authSubscription]);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      const allProducts: FavoriteProduct[] = [
        ...bestSellerProducts,
        ...(await getProducts()),
      ];
      const matchedProducts = allProducts.filter((product) =>
        productIds.includes(product.id)
      );
      const matchedStores = featuredStores.filter((store) =>
        storeIds.includes(store.id)
      );
      setFavoriteProducts(matchedProducts);
      setFavoriteStores(matchedStores);
      setIsLoading(false);
    };

    loadFavorites();
  }, [productIds, storeIds]);

  const filteredProducts = useMemo(() => {
    if (filters.type === "stores") return [];

    return favoriteProducts.filter((product) => {
      // Category filter
      if (filters.category !== "all") {
        const productCategory = "category" in product ? product.category : null;
        if (productCategory !== filters.category) {
          return false;
        }
      }
      return true;
    });
  }, [favoriteProducts, filters]);

  const filteredStores = useMemo(() => {
    if (filters.type === "products") return [];

    return favoriteStores.filter((store) => {
      // Rating filter
      if (filters.rating !== "all") {
        const minRating = parseFloat(filters.rating);
        if (store.rating < minRating) {
          return false;
        }
      }
      return true;
    });
  }, [favoriteStores, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Loading favorites...
        </p>
      </div>
    );
  }

  const hasFavorites = favoriteProducts.length > 0 || favoriteStores.length > 0;
  const hasFilteredResults =
    filteredProducts.length > 0 || filteredStores.length > 0;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4">
          <Breadcrumb />
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative bg-neutral-900 dark:bg-neutral-900 py-10 sm:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary-500 dark:text-primary-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">
              My Favorites
            </h1>
          </div>
          <p className="text-lg text-neutral-900 dark:text-neutral-200 max-w-2xl">
            {hasFavorites
              ? `${favoriteProducts.length} products and ${favoriteStores.length} stores saved`
              : "Save your favorite products and stores for quick access"}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24">
        {hasFavorites && (
          <div className="mb-8">
            <FavoritesFilters
              products={favoriteProducts}
              stores={favoriteStores}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        )}

        {!hasFavorites ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 sm:p-16 text-center shadow-xl">
            <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-6">
              <Heart className="h-12 w-12 text-neutral-400 dark:text-neutral-500" />
            </div>
            <div>
              <p className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                No favorites yet
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                Start adding products and stores to your favorites to see them
                here
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary-500 dark:bg-primary-600 px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-neutral-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Browse Products
              </Link>
              <Link
                href="/stores"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-200 dark:border-primary-900/50 px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition-all hover:bg-primary-500 dark:hover:bg-primary-600/30"
              >
                Browse Stores
              </Link>
            </div>
          </div>
        ) : !hasFilteredResults ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center shadow-xl">
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
              No results match your filters
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              Try adjusting your filter criteria
            </p>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">
                  Favorite Products{" "}
                  <span className="text-neutral-500 dark:text-neutral-400">
                    ({filteredProducts.length})
                  </span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => {
                    const isBestSeller = "price" in product;
                    return (
                      <article
                        key={product.id}
                        className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                      >
                        <div className="absolute right-6 top-6 z-10">
                          <FavoriteButton
                            product={product}
                            size={18}
                            className="h-8 w-8"
                          />
                        </div>
                        <Link
                          href={`/products/${product.id}?from=favorites`}
                          className="flex flex-col gap-4"
                        >
                          {isBestSeller && "imageUrl" in product ? (
                            <>
                              <div className="relative h-48 w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 hover:shadow-sm transition-all duration-200 hover:-translate-y-1">
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  fill
                                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 line-clamp-2">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                                  {product.brand}
                                </p>
                                <p className="mt-2 text-xs text-neutral-900 dark:text-neutral-200">
                                  {product.category}
                                </p>
                                {product.summary && (
                                  <p className="mt-2 text-sm text-neutral-900 dark:text-neutral-200 line-clamp-2">
                                    {product.summary}
                                  </p>
                                )}
                                <div className="mt-4 flex items-center gap-2">
                                  <ProductPriceOrRequest
                                    product={product}
                                    hasActivePlan={hasActivePlanState}
                                    size="md"
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 line-clamp-2">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-primary-500 dark:text-primary-400 mt-1">
                                  {product.category}
                                </p>
                                <p className="mt-2 text-sm text-neutral-900 dark:text-neutral-200 line-clamp-3">
                                  {product.description}
                                </p>
                                <p className="mt-2 text-xs text-neutral-900 dark:text-neutral-200">
                                  Supplier: {product.supplier}
                                </p>
                              </div>
                            </>
                          )}
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {filteredStores.length > 0 && (
              <section className="space-y-6 mt-12">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">
                  Favorite Stores{" "}
                  <span className="text-neutral-500 dark:text-neutral-400">
                    ({filteredStores.length})
                  </span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredStores.map((store) => (
                    <article
                      key={store.id}
                      className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="absolute right-6 top-6 z-10">
                        <FavoriteButton
                          store={store}
                          size={18}
                          className="h-8 w-8"
                        />
                      </div>
                      <Link
                        href={`/stores/${store.id}?from=favorites`}
                        className="flex flex-col gap-4"
                      >
                        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 hover:shadow-sm transition-all duration-200 hover:-translate-y-1">
                          <Image
                            src={store.imageUrl}
                            alt={store.name}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
                            {store.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center text-primary-500 dark:text-primary-400">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="h-4 w-4"
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
                            </div>
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                              {store.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-sm text-primary-500 dark:text-primary-400 mb-2">
                            {store.domain}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                            {store.description}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <button className="w-full inline-flex items-center justify-center rounded-xl border-2 border-primary-200 dark:border-primary-900/50 px-4 py-2.5 text-sm font-semibold text-primary-700 dark:text-primary-400 transition-all hover:bg-primary-50 dark:hover:bg-primary-950/30">
                            View Store
                          </button>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
