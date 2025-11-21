"use client";

import { useEffect, useState } from "react";
import type { BestSellerProduct } from "../../lib/mock/public";
import { RequestItemButton } from "./request-item-button";
import { useAuthStore } from "../../lib/store/auth-store";
import { hasActivePlan } from "../../lib/utils/has-active-plan";
import type { SubscriptionSnapshot } from "../../lib/mock/subscriptions";

interface ProductPriceOrRequestProps {
  product: BestSellerProduct;
  hasActivePlan: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function ProductPriceOrRequest({
  product,
  hasActivePlan: initialHasActivePlan,
  className = "",
  size = "md",
}: ProductPriceOrRequestProps) {
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

  if (hasActivePlanState) {
    return (
      <div className={`flex items-end gap-2 ${className}`}>
        <span className="text-md font-semibold text-neutral-900 dark:text-neutral-200">
          {formatCurrency(product.price)}
        </span>
        {product.previousPrice ? (
          <span className="text-xs text-neutral-700 dark:text-neutral-200 line-through">
            {formatCurrency(product.previousPrice)}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <RequestItemButton
        productId={product.id}
        productName={product.name}
        size={size}
      />
    </div>
  );
}

