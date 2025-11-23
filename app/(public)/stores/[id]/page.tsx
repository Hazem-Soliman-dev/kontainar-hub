import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Globe, Star, ShieldCheck, Mail, ArrowRight } from "lucide-react";

import { getStoreById } from "../../../../lib/mock/public";
import { bestSellerProducts } from "../../../../lib/mock/public";
import { StoreHero } from "../../../../components/public/store-hero";
import { StoreProducts } from "../../../../components/public/store-products";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import { FavoriteButton } from "../../../../components/ui/favorite-button";

import { StoreDetailsClient } from "./store-details-client";

export default async function StoreDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string; section?: string }>;
}) {
  const { id } = await params;
  const { from, section } = await searchParams;
  const store = getStoreById(id);

  if (!store) {
    notFound();
  }

  // Find products from this store by matching brand name
  const storeProducts = bestSellerProducts.filter(
    (product) => product.brand === store.name
  );

  return (
    <StoreDetailsClient
      store={store}
      storeProducts={storeProducts}
    />
  );
}
