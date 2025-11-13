"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  from?: string;
  section?: string;
}

export function BackButton({ from, section }: BackButtonProps) {
  const getBackUrl = () => {
    if (from === "home") {
      return section === "best-sellers" ? "/#deals" : section === "stores" ? "/#stores" : "/";
    }
    if (from === "best-sellers") return "/best-sellers";
    if (from === "top-products") return "/top-products";
    if (from === "stores") return "/stores";
    if (from === "favorites") return "/favorites";
    if (from === "cart") return "/cart";
    return "/";
  };

  const getBackText = () => {
    if (from === "home") {
      if (section === "best-sellers") return "Back to Best Sellers";
      if (section === "stores") return "Back to Stores";
      return "Back to Home";
    }
    if (from === "best-sellers") return "Back to Best Sellers";
    if (from === "top-products") return "Back to Top Products";
    if (from === "stores") return "Back to Stores";
    if (from === "favorites") return "Back to Favorites";
    if (from === "cart") return "Back to Cart";
    return "Back";
  };

  return (
    <Link
      href={getBackUrl()}
      className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{getBackText()}</span>
    </Link>
  );
}

