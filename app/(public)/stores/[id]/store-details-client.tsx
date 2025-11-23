"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Globe,
  Star,
  ShieldCheck,
  Mail,
  ArrowRight,
} from "lucide-react";
import { StoreProducts } from "../../../../components/public/store-products";
import { FavoriteButton } from "../../../../components/ui/favorite-button";
import { useLanguage } from "../../../../components/providers/language-provider";
import { MotionWrapper } from "../../../../components/ui/motion-wrapper";

interface StoreDetailsClientProps {
  store: any;
  storeProducts: any[];
}

export function StoreDetailsClient({
  store,
  storeProducts,
}: StoreDetailsClientProps) {
  const { t } = useLanguage();

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

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <div className="mx-auto max-w-7xl w-full flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
              <MotionWrapper variant="fade-up" delay={0.1} className="flex items-end gap-6">
                <div className="mb-2">
                  <h1 className="text-3xl sm:text-5xl font-bold text-red-500 dark:text-red-400 mb-2">
                    {store.name}
                  </h1>
                  <div className="flex items-center gap-4 text-dark-500 dark:text-dark-400 text-sm sm:text-base">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-yellow-500 dark:text-yellow-400">
                        {store.rating}
                      </span>
                      <span className="opacity-80">
                        {t("home.storePage.reviews").replace("{count}", "1.2k")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {t("home.storePage.location") || "New York, USA"}
                      </span>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
              <MotionWrapper variant="fade-up" delay={0.2} className="flex items-center gap-3 mb-2">
                <FavoriteButton
                  store={store}
                  size={20}
                  className="h-12 w-12 bg-dark-500/10 backdrop-blur-md text-neutral-900 dark:text-neutral-200 hover:bg-dark-500 hover:text-dark-500 border-dark-500/20"
                />
                <Link
                  href="/contact"
                  className="rounded-xl bg-red-500 text-neutral-900 dark:text-neutral-200 px-6 py-3 font-bold hover:bg-red-500 transition-colors"
                >
                  {t("home.storePage.contactStore")}
                </Link>
              </MotionWrapper>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-20 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* About */}
              <MotionWrapper variant="fade-up" delay={0.3}>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-200">
                  {t("home.storePage.about").replace("{name}", store.name)}
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {store.description}
                </p>
              </MotionWrapper>

              {/* Products */}
              {storeProducts.length > 0 && (
                <MotionWrapper variant="fade-up" delay={0.4}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">
                      {t("home.storePage.featuredProducts")}
                    </h2>
                    <Link
                      href={`/search?store=${store.id}`}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      {t("home.storePage.viewAll")}{" "}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Link>
                  </div>
                  <StoreProducts
                    products={storeProducts}
                    storeName={store.name}
                  />
                </MotionWrapper>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <MotionWrapper variant="slide-left" delay={0.3}>
                <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-neutral-200">
                    {t("home.storePage.storeInfo")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                      <Globe className="h-5 w-5 text-neutral-500" />
                      <div>
                        <p className="text-xs text-neutral-500 font-medium uppercase">
                          {t("home.storePage.website")}
                        </p>
                        <a
                          href={`https://${store.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {store.domain}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                      <ShieldCheck className="h-5 w-5 text-neutral-500" />
                      <div>
                        <p className="text-xs text-neutral-500 font-medium uppercase">
                          {t("home.storePage.verification")}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                          {t("home.storePage.verifiedSeller")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                      <Star className="h-5 w-5 text-neutral-500" />
                      <div>
                        <p className="text-xs text-neutral-500 font-medium uppercase">
                          {t("home.storePage.rating")}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                          {store.rating} / 5.0
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                      href={`/login?redirect=/stores/${store.id}`}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-500 text-neutral-900 dark:text-neutral-200 py-3 font-bold hover:opacity-90 transition-opacity"
                    >
                      <Mail className="h-4 w-4" />{" "}
                      {t("home.storePage.sendMessage")}
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
