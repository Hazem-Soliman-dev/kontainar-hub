import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { bestSellerProducts } from "../../../lib/mock/public";
import { createMetadata } from "../../../lib/seo/metadata";

export const metadata = createMetadata({
  title: "Exclusive Deals",
  description:
    "Browse limited-time MarketHub deals and marketplace movers. Sign in to unlock pricing, volumes, and buyer lists.",
  path: "/deals",
  keywords: ["deals", "best sellers", "marketplace movers"],
});

const tagStyles: Record<"surging" | "steady" | "emerging", string> = {
  surging: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
  steady: "bg-blue-500/10 text-blue-300 border-blue-500/40",
  emerging: "bg-amber-500/10 text-amber-300 border-amber-500/40",
};

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="pb-24">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Unlock exclusive buyer-ready offers
          </h1>
          <p className="max-w-3xl text-md text-slate-400">
            These marketplace movers are attracting the most attention this week. Sign in to unlock negotiated pricing, volumes, and buyer lists tailored to your sourcing goals.
          </p>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {bestSellerProducts.map((product) => (
              <article
                key={product.id}
                className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-purple-950/20 transition hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-purple-500/20"
              >
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    {product.category}
                  </span>
                  <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                  <p className="text-sm text-slate-400">{product.summary}</p>
                  {product.tag ? (
                    <span className="inline-flex w-fit items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-300">
                      {product.tag}
                    </span>
                  ) : null}
                  {product.momentum ? (
                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tagStyles[product.momentum]}`}
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-current" />
                      {momentumLabel(product.momentum)}
                    </span>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Market signals
                  </p>
                  {product.signals ? (
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {product.signals.map((signal) => (
                        <li key={signal} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500" />
                          <span>{signal}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    href="/login?redirect=/deals"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-400 hover:text-blue-300"
                  >
                    Login to unlock pricing
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 flex w-full max-w-5xl flex-col items-center gap-4 rounded-3xl border border-blue-500/20 bg-blue-500/10 px-6 py-10 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Ready to secure these deals?
          </h2>
          <p className="max-w-3xl text-md text-blue-200">
            Upgrade your MarketHub account for direct supplier access, negotiated bundles, and real-time marketplace updates.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Create account
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-6 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/10"
            >
              View subscriptions
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function momentumLabel(tone: "surging" | "steady" | "emerging") {
  switch (tone) {
    case "surging":
      return "Surging momentum";
    case "steady":
      return "Steady demand";
    case "emerging":
    default:
      return "Emerging trend";
  }
}


