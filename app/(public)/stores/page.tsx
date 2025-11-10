import Image from "next/image";
import Link from "next/link";

import { featuredStores } from "../../../lib/mock/public";
import { createMetadata } from "../../../lib/seo/metadata";
import { Star } from "lucide-react";

export const metadata = createMetadata({
  title: "Featured Stores",
  description:
    "Browse trusted MarketHub suppliers and traders highlighted for quality and fulfilment excellence.",
  path: "/stores",
  keywords: ["featured stores", "supplier showcase", "trader network"],
});

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="pb-24">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-12 text-center">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
          Verified stores ready for global trade
        </h1>
        <p className="max-w-3xl text-md text-slate-400">
          MarketHub hand-picks suppliers and traders for quality, compliance, and fulfilment excellence.
          Preview a selection below and sign in to unlock deeper analytics and direct contact details.
        </p>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredStores.map((store) => (
            <article
              key={store.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-600/20"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-slate-800">
                <Image
                  src={store.imageUrl}
                  alt={store.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">{store.name}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4"
                      strokeWidth={index < Math.round(store.rating) ? 0 : 1.5}
                      fill={index < Math.round(store.rating) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="text-xs text-slate-300">
                    ({store.rating.toFixed(1)})
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {store.domain}
                </span>
              </div>

              <p className="text-sm text-slate-400">{store.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Login to message</span>
                <a
                  href="/login?redirect=/stores"
                  className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-blue-600"
                >
                  View profile
                </a>
              </div>
            </article>
          ))}
          </div>
        </section>

        <section className="mx-auto mt-16 flex w-full max-w-4xl flex-col items-center gap-4 rounded-3xl border border-blue-500/20 bg-blue-500/10 px-6 py-10 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Showcase your store on MarketHub
          </h2>
          <p className="max-w-3xl text-sm text-blue-200">
            Suppliers and traders with active subscriptions receive personalised onboarding, marketplace promotion, and access to RFQ workflows.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Apply for access
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-6 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/10"
            >
              Compare plans
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
