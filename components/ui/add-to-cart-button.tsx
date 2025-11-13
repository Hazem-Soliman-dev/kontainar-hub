"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../lib/store/cart-store";
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
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);

  const inCart = items.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
      className={`flex items-center justify-center rounded-full transition-colors ${
        inCart
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } ${sizeClasses[size]} ${className}`}
      aria-label={inCart ? "Item in cart - Add more" : "Add to cart"}
      title={inCart ? "Item in cart - Click to add more" : "Add to cart"}
    >
      <ShoppingCart className="h-4 w-4" />
    </button>
  );
}

