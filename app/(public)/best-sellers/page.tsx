import { createMetadata } from "../../../lib/seo/metadata";
import { BestSellersClient } from "./best-sellers-client";

export const metadata = createMetadata({
  title: "Best Sellers",
  description:
    "Preview best-selling products across the MarketHub marketplace. Sign in to reveal volumes, pricing, and buyer demand.",
  path: "/best-sellers",
  keywords: ["best sellers", "marketplace movers", "b2b sourcing trends"],
});

export default function BestSellersPage() {
  return <BestSellersClient />;
}
