"use client";

import { useLanguage } from "../providers/language-provider";
import type { UnifiedProduct } from "../../lib/mock/product-utils";

interface ProductDescriptionProps {
  product: UnifiedProduct;
  isBestSeller: boolean;
}

export function ProductDescription({ product, isBestSeller }: ProductDescriptionProps) {
  const { t } = useLanguage();
  const description = isBestSeller && "summary" in product
    ? product.summary || product.name
    : "description" in product
      ? product.description
      : product.name;

  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200">{t("home.productPage.description")}</h2>
      <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed">{description}</p>
      
      {!isBestSeller && "supplier" in product && (
        <div className="mt-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
          <p className="text-sm text-neutral-900 dark:text-neutral-200">
            <span className="font-semibold text-neutral-900 dark:text-neutral-900">{t("home.productPage.supplierLabel")}:</span> {product.supplier}
          </p>
          {"availability" in product && (
            <p className="mt-2 text-sm text-neutral-900 dark:text-neutral-900">
              <span className="font-semibold text-neutral-900 dark:text-neutral-900">{t("home.productPage.availabilityLabel")}:</span>{" "}
              <span className="capitalize">{product.availability.replace("-", " ")}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

