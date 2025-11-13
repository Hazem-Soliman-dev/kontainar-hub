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
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <Image
          src={imageUrl}
          alt={product.name}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
          priority
        />
        {isBestSeller && "tag" in product && product.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-sm font-bold text-white">
            {product.tag}
          </span>
        )}
      </div>
    </div>
  );
}

