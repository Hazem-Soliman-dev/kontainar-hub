import { createMetadata } from "../../../lib/seo/metadata";
import { TopProductsClient } from "./top-products-client";

export const metadata = createMetadata({
  title: "Top Products",
  description:
    "Discover top-performing products across the MarketHub marketplace. Sign in to reveal volumes, pricing, and buyer demand.",
  path: "/top-products",
  keywords: ["top products", "marketplace movers", "b2b sourcing trends"],
});

export default function TopProductsPage() {
  return <TopProductsClient />;
}

