"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { BestSellerProduct } from "../../lib/mock/public";
import { FavoriteButton } from "../ui/favorite-button";
import { AddToCartButton } from "../ui/add-to-cart-button";
import { ProductPriceOrRequest } from "../ui/product-price-or-request";
import { hasActivePlan } from "../../lib/utils/has-active-plan";
import { useAuthStore } from "../../lib/store/auth-store";
import type { SubscriptionSnapshot } from "../../lib/mock/subscriptions";

interface StoreProductsProps {
  products: BestSellerProduct[];
  storeName: string;
}

export function StoreProducts({ products, storeName }: StoreProductsProps) {
  const authSubscription = useAuthStore((state) => state.subscription);
  const [hasActivePlanState, setHasActivePlanState] = useState(false);

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
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
        Products from {storeName}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}?from=stores&section=${storeName}`}
            className="group relative flex flex-col gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 transition hover:-translate-y-1 hover:border-blue-500/60"
          >
            <div className="absolute right-4 top-4 z-10">
              <FavoriteButton product={product} size={18} className="h-8 w-8" />
            </div>
            <div className="relative h-40 w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-200">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">
                  {product.tag}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-900 group-hover:text-blue-400">
                {product.name}
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-700">
                {product.category}
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <ProductPriceOrRequest
                product={product}
                hasActivePlan={hasActivePlanState}
                size="md"
              />
              {hasActivePlanState && (
                <AddToCartButton product={product} size="sm" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
