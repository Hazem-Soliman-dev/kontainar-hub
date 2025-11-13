import { notFound } from "next/navigation";
import Link from "next/link";

import { getStoreById } from "../../../../lib/mock/public";
import { bestSellerProducts } from "../../../../lib/mock/public";
import { StoreHero } from "../../../../components/public/store-hero";
import { StoreProducts } from "../../../../components/public/store-products";
import { BackButton } from "../../../../components/public/back-button";
import { FavoriteButton } from "../../../../components/ui/favorite-button";

export default async function StoreDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string; section?: string }>;
}) {
  const { id } = await params;
  const { from, section } = await searchParams;
  const store = getStoreById(id);

  if (!store) {
    notFound();
  }

  // Find products from this store by matching brand name
  const storeProducts = bestSellerProducts.filter(
    (product) => product.brand === store.name
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
        <BackButton from={from} section={section} />

        <StoreHero store={store} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">About</h2>
                <p className="mt-2 text-neutral-700 dark:text-neutral-700 leading-relaxed">
                  {store.description}
                </p>
              </div>

              {storeProducts.length > 0 && (
                <StoreProducts
                  products={storeProducts}
                  storeName={store.name}
                />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">Store Info</h3>
                <FavoriteButton store={store} size={20} className="h-10 w-10" />
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-neutral-700 dark:text-neutral-700">Domain:</span>
                  <p className="mt-1 font-semibold text-neutral-900 dark:text-neutral-900">
                    {store.domain}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-700 dark:text-neutral-700">Rating:</span>
                  <p className="mt-1 font-semibold text-neutral-900 dark:text-neutral-900">
                    {store.rating.toFixed(1)} / 5.0
                  </p>
                </div>
                {storeProducts.length > 0 && (
                  <div>
                    <span className="text-neutral-700 dark:text-neutral-700">Products:</span>
                    <p className="mt-1 font-semibold text-neutral-900 dark:text-neutral-900">
                      {storeProducts.length} featured
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/login?redirect=/stores/${store.id}`}
                  className="rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-semibold text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-600 dark:hover:bg-blue-600"
                >
                  Enter Store
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border border-blue-400/50 px-4 py-3 text-center text-sm font-semibold text-blue-400 dark:text-blue-400 transition hover:bg-blue-400/10 dark:hover:bg-blue-400/10"
                >
                  Request Intro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
