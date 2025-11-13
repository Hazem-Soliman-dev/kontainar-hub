"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "../../lib/store/favorites-store";
import type { BestSellerProduct, FeaturedStore } from "../../lib/mock/public";
import type { ProductRecord } from "../../lib/mock/products";

type FavoriteProduct = BestSellerProduct | ProductRecord;

interface FavoriteButtonProps {
  product?: FavoriteProduct;
  store?: FeaturedStore;
  className?: string;
  size?: number;
}

export function FavoriteButton({
  product,
  store,
  className = "",
  size = 20,
}: FavoriteButtonProps) {
  // Subscribe to state arrays directly so component re-renders on changes
  const productIds = useFavoritesStore((state) => state.productIds);
  const storeIds = useFavoritesStore((state) => state.storeIds);
  const addProductFavorite = useFavoritesStore((state) => state.addProductFavorite);
  const removeProductFavorite = useFavoritesStore((state) => state.removeProductFavorite);
  const addStoreFavorite = useFavoritesStore((state) => state.addStoreFavorite);
  const removeStoreFavorite = useFavoritesStore((state) => state.removeStoreFavorite);

  if (!product && !store) {
    return null;
  }

  const id = product?.id || store?.id;
  if (!id) {
    return null;
  }

  const isFavorite = product
    ? productIds.includes(id)
    : store
      ? storeIds.includes(id)
      : false;

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (product) {
      if (isFavorite) {
        removeProductFavorite(product.id);
      } else {
        addProductFavorite(product);
      }
    } else if (store) {
      if (isFavorite) {
        removeStoreFavorite(store.id);
      } else {
        addStoreFavorite(store);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex items-center justify-center rounded-full transition-colors ${
        isFavorite
          ? "bg-rose-500 text-white hover:bg-rose-600"
          : "bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-rose-400"
      } ${className}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={size}
        className={isFavorite ? "fill-current" : ""}
        strokeWidth={isFavorite ? 0 : 2}
      />
    </button>
  );
}

