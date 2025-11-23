"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../lib/store/cart-store";
import { useAuthStore } from "../../lib/store/auth-store";
import type { BestSellerProduct } from "../../lib/mock/public";

interface AddToCartButtonProps {
  product: BestSellerProduct;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AddToCartButton({
  product,
  className = "",
  size = "md",
}: AddToCartButtonProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);

  // Only traders can add to cart
  const isDisabled = !isAuthenticated || !user || user.role !== "trader";
  const inCart = items.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDisabled) {
      return;
    }
    
    addToCart(product, 1);
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`flex items-center justify-center rounded-full transition-colors ${
        isDisabled
          ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-60"
          : inCart
            ? "text-green-500 dark:text-green-300 hover:text-green-600"
            : "text-green-500 dark:text-green-300 hover:text-green-600"
      } ${sizeClasses[size]} ${className}`}
      aria-label={inCart ? "Item in cart - Add more" : "Add to cart"}
      title={isDisabled ? "Only traders can add to cart" : inCart ? "Item in cart - Click to add more" : "Add to cart"}
    >
      <ShoppingCart className="h-5 w-5" />
    </button>
  );
}

