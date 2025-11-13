"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useMemo } from "react";

import { useFavoritesStore } from "../../lib/store/favorites-store";
import { bestSellerProducts, featuredStores } from "../../lib/mock/public";
import { getProducts } from "../../lib/mock/products";
import { FavoriteButton } from "../../components/ui/favorite-button";
import { FavoritesFilters } from "../../components/ui/favorites-filters";
import { useEffect, useState } from "react";
import type { BestSellerProduct, FeaturedStore } from "../../lib/mock/public";
import type { ProductRecord } from "../../lib/mock/products";

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

  // Subscribe to store changes
  const productIds = useFavoritesStore((state) => state.productIds);
  const storeIds = useFavoritesStore((state) => state.storeIds);

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
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral-700 dark:text-neutral-700">
          Loading favorites...
        </p>
      </div>
    );
  }

  const hasFavorites = favoriteProducts.length > 0 || favoriteStores.length > 0;
  const hasFilteredResults =
    filteredProducts.length > 0 || filteredStores.length > 0;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl lg:text-5xl">
            My Favorites
          </h1>
          <p className="text-md text-neutral-700 dark:text-neutral-700">
            Your saved products and stores for quick access.
          </p>
        </header>

        {hasFavorites && (
          <div>
            <FavoritesFilters
              products={favoriteProducts}
              stores={favoriteStores}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        )}

        {!hasFavorites ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-12 text-center">
            <p className="text-lg text-neutral-700 dark:text-neutral-700">
              No favorites yet
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-700">
              Start adding products and stores to your favorites to see them
              here.
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="/best-sellers"
                className="rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Browse Products
              </Link>
              <Link
                href="/stores"
                className="rounded-full border border-blue-400/50 px-6 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/10"
              >
                Browse Stores
              </Link>
            </div>
          </div>
        ) : !hasFilteredResults ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <p className="text-lg text-slate-400">
              No results match your filters
            </p>
            <p className="text-sm text-slate-500">
              Try adjusting your filter criteria.
            </p>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                  Favorite Products ({filteredProducts.length})
                </h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => {
                    const isBestSeller = "price" in product;
                    return (
                      <article
                        key={product.id}
                        className="relative flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-lg shadow-purple-950/20"
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
                              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-200">
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-neutral-700 dark:text-neutral-700">
                                  {product.brand}
                                </p>
                                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
                                  {product.category}
                                </p>
                                {product.summary && (
                                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
                                    {product.summary}
                                  </p>
                                )}
                                <div className="mt-4 flex items-center gap-2">
                                  <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                                    ${product.price.toFixed(2)}
                                  </span>
                                  {product.previousPrice && (
                                    <span className="text-sm text-neutral-700 dark:text-neutral-700 line-through">
                                      ${product.previousPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-blue-400">
                                  {product.category}
                                </p>
                                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
                                  {product.description}
                                </p>
                                <p className="mt-2 text-xs text-neutral-700 dark:text-neutral-700">
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
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                  Favorite Stores ({filteredStores.length})
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredStores.map((store) => (
                    <article
                      key={store.id}
                      className="relative flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-lg shadow-blue-950/20"
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
                        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-200">
                          <Image
                            src={store.imageUrl}
                            alt={store.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                            {store.name}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-amber-300">
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
                            <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-700">
                              ({store.rating.toFixed(1)})
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
                            {store.domain}
                          </p>
                          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
                            {store.description}
                          </p>
                        </div>
                        <div className="mt-auto flex flex-wrap gap-3">
                          <span className="rounded-sm border border-blue-400/50 px-3 py-1 text-sm font-semibold text-blue-400 dark:text-blue-400 transition hover:bg-blue-400/10 dark:hover:bg-blue-400/10">
                            Request intro
                          </span>
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
