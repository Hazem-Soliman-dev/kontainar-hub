import type { BestSellerProduct } from "./public";
import type { ProductRecord } from "./products";
import { getProductById as getBestSellerById } from "./public";
import { getProductById as getProductRecordById } from "./products";

export type UnifiedProduct = BestSellerProduct | ProductRecord;

export function isBestSellerProduct(
  product: UnifiedProduct
): product is BestSellerProduct {
  return "price" in product && "brand" in product;
}

export async function getUnifiedProductById(
  id: string
): Promise<UnifiedProduct | null> {
  // First check best sellers
  const bestSeller = getBestSellerById(id);
  if (bestSeller) {
    return bestSeller;
  }

  // Then check product records
  const productRecord = await getProductRecordById(id);
  if (productRecord) {
    return productRecord;
  }

  return null;
}

