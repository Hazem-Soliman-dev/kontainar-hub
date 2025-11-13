"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { BestSellerProduct, FeaturedStore } from "../mock/public";
import type { ProductRecord } from "../mock/products";

type FavoriteProduct = BestSellerProduct | ProductRecord;

interface FavoritesState {
  productIds: string[];
  storeIds: string[];
  addProductFavorite: (product: FavoriteProduct) => void;
  removeProductFavorite: (productId: string) => void;
  addStoreFavorite: (store: FeaturedStore) => void;
  removeStoreFavorite: (storeId: string) => void;
  isProductFavorite: (productId: string) => boolean;
  isStoreFavorite: (storeId: string) => boolean;
  getFavoriteProductIds: () => string[];
  getFavoriteStoreIds: () => string[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],
      storeIds: [],

      addProductFavorite: (product) =>
        set((state) => {
          if (state.productIds.includes(product.id)) {
            return state;
          }
          return { productIds: [...state.productIds, product.id] };
        }),

      removeProductFavorite: (productId) =>
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        })),

      addStoreFavorite: (store) =>
        set((state) => {
          if (state.storeIds.includes(store.id)) {
            return state;
          }
          return { storeIds: [...state.storeIds, store.id] };
        }),

      removeStoreFavorite: (storeId) =>
        set((state) => ({
          storeIds: state.storeIds.filter((id) => id !== storeId),
        })),

      isProductFavorite: (productId) => {
        return get().productIds.includes(productId);
      },

      isStoreFavorite: (storeId) => {
        return get().storeIds.includes(storeId);
      },

      getFavoriteProductIds: () => {
        return get().productIds;
      },

      getFavoriteStoreIds: () => {
        return get().storeIds;
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);

