import type { UnifiedProduct } from "../../lib/mock/product-utils";

interface ProductDescriptionProps {
  product: UnifiedProduct;
  isBestSeller: boolean;
}

export function ProductDescription({ product, isBestSeller }: ProductDescriptionProps) {
  const description = isBestSeller && "summary" in product
    ? product.summary || product.name
    : "description" in product
      ? product.description
      : product.name;

  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold text-white">Description</h2>
      <p className="text-slate-300 leading-relaxed">{description}</p>
      
      {!isBestSeller && "supplier" in product && (
        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800/40 p-4">
          <p className="text-sm text-slate-400">
            <span className="font-semibold text-slate-300">Supplier:</span> {product.supplier}
          </p>
          {"availability" in product && (
            <p className="mt-2 text-sm text-slate-400">
              <span className="font-semibold text-slate-300">Availability:</span>{" "}
              <span className="capitalize">{product.availability.replace("-", " ")}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

