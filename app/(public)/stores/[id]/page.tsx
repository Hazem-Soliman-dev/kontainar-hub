import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Globe, Star, ShieldCheck, Mail, ArrowRight } from "lucide-react";

import { getStoreById } from "../../../../lib/mock/public";
import { bestSellerProducts } from "../../../../lib/mock/public";
import { StoreHero } from "../../../../components/public/store-hero";
import { StoreProducts } from "../../../../components/public/store-products";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <main className="pb-24">
        {/* Hero Section */}
        <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
            <Image
                src={store.imageUrl}
                alt={store.name}
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                <div className="mx-auto max-w-7xl w-full flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
                    <div className="flex items-end gap-6">
                        <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl border-4 border-neutral-900 dark:border-neutral-900 bg-white dark:bg-neutral-800 shadow-xl overflow-hidden relative -mb-12 sm:-mb-16 z-10">
                            <Image
                                src={store.imageUrl}
                                alt={store.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="mb-2">
                            <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">{store.name}</h1>
                            <div className="flex items-center gap-4 text-neutral-900 dark:text-neutral-200 text-sm sm:text-base">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                                    <span className="font-bold text-neutral-900 dark:text-neutral-200">{store.rating}</span>
                                    <span className="opacity-80">(1.2k reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>New York, USA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <FavoriteButton store={store} size={20} className="h-12 w-12 bg-white/10 backdrop-blur-md text-neutral-900 dark:text-neutral-200 hover:bg-white hover:text-red-500 border-neutral-900/20" />
                        <Link
                            href="/contact"
                            className="rounded-xl bg-white text-neutral-900 dark:text-neutral-200 px-6 py-3 font-bold hover:bg-neutral-100 transition-colors"
                        >
                            Contact Store
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-20 sm:pt-24">
            <div className="grid gap-12 lg:grid-cols-12">
                {/* Left Column: Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    {/* About */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-200">About {store.name}</h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            {store.description}
                        </p>
                    </section>

                    {/* Products */}
                    {storeProducts.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">Featured Products</h2>
                                <Link href={`/search?store=${store.id}`} className="text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-1">
                                    View all <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <StoreProducts
                                products={storeProducts}
                                storeName={store.name}
                            />
                        </section>
                    )}
                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-neutral-200">Store Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                <Globe className="h-5 w-5 text-neutral-500" />
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium uppercase">Website</p>
                                    <a href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                                        {store.domain}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                <ShieldCheck className="h-5 w-5 text-neutral-500" />
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium uppercase">Verification</p>
                                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">Verified Seller</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                <Star className="h-5 w-5 text-neutral-500" />
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium uppercase">Rating</p>
                                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">{store.rating} / 5.0</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                            <Link
                                href={`/login?redirect=/stores/${store.id}`}
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-neutral-900 dark:bg-white text-neutral-900 dark:text-neutral-200 py-3 font-bold hover:opacity-90 transition-opacity"
                            >
                                <Mail className="h-4 w-4" /> Send Message
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
