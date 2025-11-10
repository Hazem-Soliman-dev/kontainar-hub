import Link from "next/link";

import { bestSellerProducts } from "../../lib/mock/public";
import { createMetadata } from "../../lib/seo/metadata";

const CART_ITEMS = bestSellerProducts.slice(0, 3).map((item, index) => ({
  ...item,
  quantity: index === 0 ? 2 : 1,
}));

export const metadata = createMetadata({
  title: "Shopping Cart",
  description:
    "Review selected MarketHub products and finalize your checkout or sourcing requests.",
  path: "/cart",
});

export default function CartPage() {
  const subtotal = CART_ITEMS.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Ready to secure these deals?
          </h1>
          <p className="text-md text-slate-400">
            Confirm quantities and proceed to checkout. You can convert these
            products into RFQs for supplier negotiations once you activate your
            subscription.
          </p>
        </header>

        <section className="space-y-4">
          {CART_ITEMS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-blue-950/20 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-md font-semibold text-white">
                  {item.name}
                </h2>
                <p className="text-md text-slate-400">{item.brand}</p>
              </div>
              <div className="flex items-center gap-4 text-md text-slate-300">
                <span>Qty: {item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Subtotal</span>
            <span className="text-lg font-bold text-white">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Taxes and final shipping costs are calculated once suppliers confirm
            your request.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/checkout"
              className="rounded-sm bg-blue-500 px-3 py-1 font-semibold text-white transition hover:bg-blue-600"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/favorites"
              className="rounded-sm border border-blue-400/50 px-3 py-1 font-semibold text-blue-200 transition hover:bg-blue-400/10"
            >
              Move to favorites
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
