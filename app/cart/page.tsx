import { createMetadata } from "../../lib/seo/metadata";
import { CartClient } from "./cart-client";

export const metadata = createMetadata({
  title: "Shopping Cart",
  description:
    "Review selected MarketHub products and finalize your checkout or sourcing requests.",
  path: "/cart",
});

export default function CartPage() {
  return <CartClient />;
}
