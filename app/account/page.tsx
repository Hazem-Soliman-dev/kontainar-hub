import Link from "next/link";

import { createMetadata } from "../../lib/seo/metadata";

export const metadata = createMetadata({
  title: "Account Overview",
  description:
    "Manage your MarketHub profile, subscription preferences, and saved marketplace insights.",
  path: "/account",
});

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Personal profile
          </h1>
          <p className="text-md text-slate-400">
            Update your contact details, manage notification preferences, and
            review your saved lists across the MarketHub marketplace.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-950/20">
            <h2 className="text-lg font-semibold text-white">
              Profile details
            </h2>
            <p className="mt-2 text-md text-slate-400">
              Personal information used for account security and supplier
              communications.
            </p>
            <ul className="mt-4 space-y-2 text-md text-slate-300">
              <li>
                <span className="text-slate-500">Name:</span> Guest user
              </li>
              <li>
                <span className="text-slate-500">Email:</span> Add your email in
                settings
              </li>
              <li>
                <span className="text-slate-500">Role:</span> Buyer (trial)
              </li>
            </ul>
            <Link
              href="/settings"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-blue-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-200 transition hover:bg-blue-400/10"
            >
              Edit profile
            </Link>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-purple-950/20">
            <h2 className="text-lg font-semibold text-white">
              Saved marketplace content
            </h2>
            <p className="mt-2 text-md text-slate-400">
              Your favorites, carts, and shortlists from public marketplace
              sections.
            </p>
            <ul className="mt-4 space-y-2 text-md text-slate-300">
              <li>3 saved stores</li>
              <li>2 products in cart</li>
              <li>Weekly insights enabled</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Link
                href="/favorites"
                className="inline-flex items-center justify-center rounded-sm bg-blue-500 px-3 py-1 font-semibold text-white transition hover:bg-blue-600"
              >
                View favorites
              </Link>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center rounded-sm border border-blue-400/50 px-3 py-1 font-semibold text-blue-200 transition hover:bg-blue-400/10"
              >
                View cart
              </Link>
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-blue-500/20 bg-blue-500/10 px-6 py-8">
          <h2 className="text-lg font-semibold text-white">Need to upgrade?</h2>
          <p className="mt-2 text-md text-blue-200">
            Compare supplier and trader plans to unlock RFQ workflows, analytics
            dashboards, and verified compliance documents.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/plans"
              className="rounded-sm bg-blue-500 px-3 py-1 font-semibold text-white transition hover:bg-blue-600"
            >
              Explore plans
            </Link>
            <Link
              href="/register"
              className="rounded-sm border border-blue-400/50 px-3 py-1 font-semibold text-blue-200 transition hover:bg-blue-400/10"
            >
              Start free trial
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
