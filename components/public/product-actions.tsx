"use client";

import { FavoriteButton } from "../ui/favorite-button";
import { AddToCartButton } from "../ui/add-to-cart-button";
import { useCartStore } from "../../lib/store/cart-store";
import type { UnifiedProduct } from "../../lib/mock/product-utils";
import type { BestSellerProduct } from "../../lib/mock/public";

interface ProductActionsProps {
  product: UnifiedProduct;
  isBestSeller: boolean;
}

export function ProductActions({ product, isBestSeller }: ProductActionsProps) {
  const items = useCartStore((state) => state.items);
  const cartItem = items.find((item) => item.id === product.id);

  if (!isBestSeller) {
    return (
      <div className="flex items-center gap-4">
        <FavoriteButton product={product} size={20} className="h-12 w-12" />
        <div className="flex-1 rounded-lg border border-slate-700 bg-slate-800/40 p-4 text-center text-sm text-slate-400">
          This product is available for inquiry. Contact the supplier for pricing.
        </div>
      </div>
    );
  }

  const bestSellerProduct = product as BestSellerProduct;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <FavoriteButton product={product} size={20} className="h-12 w-12" />
        <AddToCartButton product={bestSellerProduct} size="lg" className="flex-1" />
      </div>
      {cartItem && (
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-300">
          <span className="font-semibold">In cart:</span> {cartItem.quantity} item{cartItem.quantity > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

