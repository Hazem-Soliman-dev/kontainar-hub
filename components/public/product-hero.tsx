import Image from "next/image";
import type { UnifiedProduct } from "../../lib/mock/product-utils";

interface ProductHeroProps {
  product: UnifiedProduct;
  isBestSeller: boolean;
}

export function ProductHero({ product, isBestSeller }: ProductHeroProps) {
  const imageUrl = isBestSeller && "imageUrl" in product 
    ? product.imageUrl 
    : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <Image
          src={imageUrl}
          alt={product.name}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
          priority
        />
        {isBestSeller && "tag" in product && product.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-accent-500 dark:bg-accent-600 px-3 py-1 text-sm font-bold text-neutral-900 dark:text-neutral-200 shadow-lg">
            {product.tag}
          </span>
        )}
      </div>
    </div>
  );
}
