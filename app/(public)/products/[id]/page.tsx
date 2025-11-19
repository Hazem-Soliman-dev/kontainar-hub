import { notFound } from "next/navigation";

import {
  getUnifiedProductById,
  isBestSellerProduct,
} from "../../../../lib/mock/product-utils";
import { ProductHero } from "../../../../components/public/product-hero";
import { ProductActions } from "../../../../components/public/product-actions";
import { ProductDescription } from "../../../../components/public/product-description";
import { MarketSignals } from "../../../../components/public/market-signals";
import { BackButton } from "../../../../components/public/back-button";

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

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

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
        <BackButton from={from} section={section} />

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductHero product={product} isBestSeller={isBestSeller} />

          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl">
                {product.name}
              </h1>
              {isBestSeller && (
                <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-700">
                  {product.brand}
                </p>
              )}
            </div>

            {isBestSeller && (
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-900">
                  {formatCurrency(product.price)}
                </span>
                {product.previousPrice && (
                  <span className="text-lg text-neutral-900 dark:text-neutral-900 line-through">
                    {formatCurrency(product.previousPrice)}
                  </span>
                )}
                {product.tag && (
                  <span className="rounded-full bg-rose-500 px-3 py-1 text-sm font-bold text-neutral-900 dark:text-neutral-900">
                    {product.tag}
                  </span>
                )}
              </div>
            )}

            <ProductActions product={product} isBestSeller={isBestSeller} />
            
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
