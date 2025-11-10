import Link from "next/link";

import { featuredStores } from "../../lib/mock/public";
import { createMetadata } from "../../lib/seo/metadata";

const SAVED_STORES = featuredStores.slice(0, 4);

export const metadata = createMetadata({
  title: "Saved Favorites",
  description:
    "Access your saved MarketHub stores for quick sourcing decisions and RFQ outreach.",
  path: "/favorites",
});

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Saved suppliers & traders
          </h1>
          <p className="text-md text-slate-400">
            Quickly re-engage with stores you’ve shortlisted. Activate your
            subscription to unlock direct contact details and compliance
            documentation.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {SAVED_STORES.map((store) => (
            <article
              key={store.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-950/20"
            >
              <div>
                <p className="text-md font-semibold text-white">{store.name}</p>
                <p className="text-md text-amber-300">
                  {store.rating.toFixed(1)} rating • {store.domain}
                </p>
              </div>
              <p className="text-md text-slate-400">{store.description}</p>
              <div className="mt-auto flex flex-wrap gap-3 text-md">
                <Link
                  href="/contact"
                  className="rounded-sm border border-blue-400/50 px-3 py-1 font-semibold text-blue-200 transition hover:bg-blue-400/10"
                >
                  Request intro
                </Link>
                <Link
                  href="/cart"
                  className="rounded-sm bg-blue-500 px-3 py-1 font-semibold text-white transition hover:bg-blue-600"
                >
                  Add to cart
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
