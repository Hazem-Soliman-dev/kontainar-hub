import { notFound } from "next/navigation";

import {
  getUnifiedProductById,
  isBestSellerProduct,
} from "../../../../lib/mock/product-utils";
import { ProductHero } from "../../../../components/public/product-hero";
import { ProductActions } from "../../../../components/public/product-actions";
import { ProductDescription } from "../../../../components/public/product-description";
import { MarketSignals } from "../../../../components/public/market-signals";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import { ProductPriceOrRequest } from "../../../../components/ui/product-price-or-request";
import {
  getUserSubscriptionFromCookies,
  hasActivePlan,
} from "../../../../lib/utils/subscription-check";

export default async function ProductDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string; section?: string }>;
}) {
  const { id } = await params;
  const { from, section } = await searchParams;
  const product = await getUnifiedProductById(id);

  if (!product) {
    notFound();
  }

  const isBestSeller = isBestSellerProduct(product);
  const subscription = await getUserSubscriptionFromCookies();
  const userHasActivePlan = hasActivePlan(subscription);

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb currentPageName={product.name} />

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <ProductHero product={product} isBestSeller={isBestSeller} />

          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                {product.category}
              </span>
              <h1 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              {isBestSeller && (
                <p className="mt-2 text-base sm:text-lg text-neutral-700 dark:text-neutral-700">
                  {product.brand}
                </p>
              )}
            </div>

            {isBestSeller && (
              <div className="flex items-end gap-2 sm:gap-3">
                <ProductPriceOrRequest
                  product={product}
                  hasActivePlan={userHasActivePlan}
                  size="lg"
                  className="text-2xl sm:text-3xl font-bold"
                />
                {product.tag && userHasActivePlan && (
                  <span className="rounded-full bg-rose-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-900">
                    {product.tag}
                  </span>
                )}
              </div>
            )}

            <ProductActions
              product={product}
              isBestSeller={isBestSeller}
              hasActivePlan={userHasActivePlan}
            />
            
            <ProductDescription product={product} isBestSeller={isBestSeller} />

            {isBestSeller && product.signals && (
              <MarketSignals
                signals={product.signals}
                momentum={product.momentum}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
