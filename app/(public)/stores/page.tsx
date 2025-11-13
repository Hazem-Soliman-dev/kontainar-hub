import { createMetadata } from "../../../lib/seo/metadata";
import StoresClient from "./stores-client";

export const metadata = createMetadata({
  title: "Featured Stores",
  description:
    "Browse trusted MarketHub suppliers and traders highlighted for quality and fulfilment excellence.",
  path: "/stores",
  keywords: ["featured stores", "supplier showcase", "trader network"],
});

export default function StoresPage() {
  return <StoresClient />;
}
