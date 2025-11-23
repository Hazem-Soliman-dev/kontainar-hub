import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, Star, ArrowRight } from "lucide-react";

import {
  getUnifiedProductById,
  isBestSellerProduct,
} from "../../../../lib/mock/product-utils";
import { ProductHero } from "../../../../components/public/product-hero";
import { ProductActions } from "../../../../components/public/product-actions";
import { ProductDescription } from "../../../../components/public/product-description";
import { MarketSignals } from "../../../../components/public/market-signals";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import { ProductPriceOrRequest } from "../../../../components/ui/product-price-or-request";
import {
  getUserSubscriptionFromCookies,
  hasActivePlan,
} from "../../../../lib/utils/subscription-check";
import { cn } from "@/lib/utils";

import { ProductDetailsClient } from "./product-details-client";

export default async function ProductDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string; section?: string }>;
}) {
  const { id } = await params;
  const { from, section } = await searchParams;
  const product = await getUnifiedProductById(id);

  if (!product) {
    notFound();
  }

  const isBestSeller = isBestSellerProduct(product);
  const subscription = await getUserSubscriptionFromCookies();
  const userHasActivePlan = hasActivePlan(subscription);

  // Normalize product data for display
  const displayProduct = {
    ...product,
    brand: isBestSeller ? product.brand : (product as any).supplier,
    description: isBestSeller ? product.summary : (product as any).description,
    imageUrl: isBestSeller ? product.imageUrl : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80", // Placeholder
    tag: isBestSeller ? product.tag : undefined,
    signals: isBestSeller ? product.signals : undefined,
    momentum: isBestSeller ? product.momentum : undefined,
  };

  return (
    <ProductDetailsClient
      product={product}
      displayProduct={displayProduct}
      isBestSeller={isBestSeller}
      userHasActivePlan={userHasActivePlan}
    />
  );
}
