import { createMetadata } from "../../../../lib/seo/metadata";
import { getStoreById } from "../../../../lib/mock/public";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = getStoreById(id);

  if (!store) {
    return createMetadata({
      title: "Store Not Found",
      description: "The store you're looking for doesn't exist.",
      path: `/stores/${id}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${store.name} | MarketHub`,
    description: store.description,
    path: `/stores/${id}`,
    keywords: [store.name, "store", "marketplace", store.domain],
  });
}

