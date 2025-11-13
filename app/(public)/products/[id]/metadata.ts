import { createMetadata } from "../../../../lib/seo/metadata";
import { getUnifiedProductById, isBestSellerProduct } from "../../../../lib/mock/product-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getUnifiedProductById(id);

  if (!product) {
    return createMetadata({
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
      path: `/products/${id}`,
      noIndex: true,
    });
  }

  const productName = product.name;
  const description = isBestSellerProduct(product)
    ? product.summary || product.name
    : product.description;

  return createMetadata({
    title: `${productName} | MarketHub`,
    description: description,
    path: `/products/${id}`,
    keywords: [
      productName,
      "product",
      "marketplace",
      product.category,
      ...(isBestSellerProduct(product) ? [product.brand] : []),
    ],
  });
}

