"use client";

import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../providers/language-provider";

interface RequestItemButtonProps {
  productId: string;
  productName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function RequestItemButton({
  productId,
  productName,
  className = "",
  size = "md",
}: RequestItemButtonProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleRequestItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Show success message
    alert("Request submitted successfully!");

    // Navigate to plans page
    const params = new URLSearchParams();
    params.set("requestItem", productId);
    params.set("productName", productName);

    setTimeout(() => {
      router.push(`/plans?${params.toString()}`);
    }, 300);
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type="button"
      onClick={handleRequestItem}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
      aria-label={`Request item: ${productName}`}
      title="Subscribe to view pricing and add to cart"
    >
      <Package className="h-4 w-4" />
      <span>{t("home.requestItem")}</span>
    </button>
  );
}
