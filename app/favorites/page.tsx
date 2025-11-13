import { createMetadata } from "../../lib/seo/metadata";
import { FavoritesClient } from "./favorites-client";

export const metadata = createMetadata({
  title: "My Favorites",
  description:
    "Access your saved products and stores for quick sourcing decisions and RFQ outreach.",
  path: "/favorites",
});

export default function FavoritesPage() {
  return <FavoritesClient />;
}
