"use client";

import { useEffect, useState } from "react";
import { FavoriteButton } from "../ui/favorite-button";
import { AddToCartButton } from "../ui/add-to-cart-button";
import { RequestItemButton } from "../ui/request-item-button";
import { useCartStore } from "../../lib/store/cart-store";
import { useAuthStore } from "../../lib/store/auth-store";
import { hasActivePlan } from "../../lib/utils/has-active-plan";
import type { UnifiedProduct } from "../../lib/mock/product-utils";
import type { BestSellerProduct } from "../../lib/mock/public";
import type { SubscriptionSnapshot } from "../../lib/mock/subscriptions";

interface ProductActionsProps {
  product: UnifiedProduct;
  isBestSeller: boolean;
  hasActivePlan?: boolean;
}

export function ProductActions({
  product,
  isBestSeller,
  hasActivePlan: initialHasActivePlan = false,
}: ProductActionsProps) {
  const items = useCartStore((state) => state.items);
  const authSubscription = useAuthStore((state) => state.subscription);
  const [hasActivePlanState, setHasActivePlanState] = useState(initialHasActivePlan);

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

  const cartItem = items.find((item) => item.id === product.id);

  if (!isBestSeller) {
    return (
      <div className="flex items-center gap-4">
        <FavoriteButton product={product} size={20} className="h-12 w-12" />
        <div className="flex-1 rounded-lg border border-neutral-900 dark:border-neutral-900 bg-neutral-900/40 p-4 text-center text-sm text-neutral-900 dark:text-neutral-900">
          This product is available for inquiry. Contact the supplier for
          pricing.
        </div>
      </div>
    );
  }

  const bestSellerProduct = product as BestSellerProduct;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        {cartItem && hasActivePlanState && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-900 dark:text-blue-900 text-center w-full sm:w-[150px]">
            <span className="font-semibold">In cart:</span> {cartItem.quantity}{" "}
            item{cartItem.quantity > 1 ? "s" : ""}
          </div>
        )}
        <div className="flex items-center gap-4 justify-between w-full sm:w-auto mx-auto">
          <FavoriteButton product={product} size={20} className="h-12 w-12" />
          <div className="flex-1">
            {hasActivePlanState ? (
              <AddToCartButton
                product={bestSellerProduct}
                size="lg"
                className="flex-1"
              />
            ) : (
              <RequestItemButton
                productId={product.id}
                productName={product.name}
                size="lg"
                className="flex-1"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
