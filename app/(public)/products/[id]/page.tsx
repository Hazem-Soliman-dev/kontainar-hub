import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, Star, ArrowRight } from "lucide-react";

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
import { cn } from "@/lib/utils";

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

  // Normalize product data for display
  const displayProduct = {
    ...product,
    brand: isBestSeller ? product.brand : (product as any).supplier,
    description: isBestSeller ? product.summary : (product as any).description,
    imageUrl: isBestSeller ? product.imageUrl : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80", // Placeholder
    tag: isBestSeller ? product.tag : undefined,
    signals: isBestSeller ? product.signals : undefined,
    momentum: isBestSeller ? product.momentum : undefined,
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <main className="flex flex-col">
        {/* Breadcrumb Section */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4">
                <Breadcrumb currentPageName={product.name} />
            </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-8 pb-12">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Images */}
            <div className="lg:col-span-7 space-y-8">
              <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                 <ProductHero product={product as any} isBestSeller={isBestSeller} />
              </div>
              
              {/* Product Description (Desktop) */}
              <div className="hidden lg:block space-y-8">
                 <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-200">Product Description</h2>
                    <ProductDescription product={product as any} isBestSeller={isBestSeller} />
                 </div>
                 
                 {displayProduct.signals && (
                    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-200">Market Signals</h2>
                        <MarketSignals
                            signals={displayProduct.signals}
                            momentum={displayProduct.momentum}
                        />
                    </div>
                 )}
              </div>
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-8">
                <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-strong">
                    {/* Header */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between">
                            <Link href={`/search?category=${encodeURIComponent(product.category)}`} className="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 hover:underline">
                                {product.category}
                            </Link>
                            {displayProduct.tag && (
                                <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                                    {displayProduct.tag}
                                </span>
                            )}
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-200 leading-tight">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current text-neutral-300 dark:text-neutral-700" />
                            </div>
                            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">4.2 (128 reviews)</span>
                        </div>

                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                            <span className="font-medium">Brand:</span>
                            <span className="text-neutral-900 dark:text-neutral-200 font-semibold">{displayProduct.brand}</span>
                        </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-end gap-3">
                            <ProductPriceOrRequest
                                product={product as any}
                                hasActivePlan={userHasActivePlan}
                                size="lg"
                                className="text-lg font-bold text-neutral-900 dark:text-neutral-200 bg-neutral-400 dark:bg-neutral-500 px-3 py-1 rounded-xl"
                            />
                        </div>

                        <ProductActions
                            product={product as any}
                            isBestSeller={isBestSeller}
                            hasActivePlan={userHasActivePlan}
                        />
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Truck className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Fast Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <RefreshCw className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Free Returns</span>
                        </div>
                    </div>
                </div>

                {/* Store Info Card (Mock) */}
                <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                             {/* Mock Store Image */}
                             <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20" />
                             <span className="absolute inset-0 flex items-center justify-center font-bold text-primary-600">S</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-neutral-900 dark:text-neutral-200">Sold by {displayProduct.brand || "Store Name"}</h3>
                            <div className="flex items-center gap-1 text-xs text-neutral-500">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span>4.8 (2.5k sales)</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/stores" className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                        Visit Store <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
              </div>
            </div>

            {/* Product Description (Mobile) */}
            <div className="lg:hidden space-y-8">
                 <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-200">Product Description</h2>
                    <ProductDescription product={product as any} isBestSeller={isBestSeller} />
                 </div>
                 
                 {displayProduct.signals && (
                    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-200">Market Signals</h2>
                        <MarketSignals
                            signals={displayProduct.signals}
                            momentum={displayProduct.momentum}
                        />
                    </div>
                 )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
