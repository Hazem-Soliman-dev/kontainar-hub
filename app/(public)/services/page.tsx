import { createMetadata } from "@/lib/seo/metadata";
import {
  Store,
  BarChart3,
  Package,
  Shield,
  Search,
  Users,
  TrendingUp,
  HeadphonesIcon,
  ArrowRight,
  Zap,
  Globe2,
} from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Discover the comprehensive services TajirJomla Hub offers to suppliers, traders, and businesses. From marketplace access to analytics and support.",
  path: "/services",
  keywords: [
    "services",
    "marketplace",
    "analytics",
    "supplier tools",
    "trader tools",
  ],
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <div className="relative bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/40 via-purple-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-secondary-900/40 via-blue-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
            Services that Scale with You
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-900 dark:text-neutral-200 mb-10">
            Comprehensive tools and services designed to help suppliers, traders, and businesses succeed in the global marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-neutral-100 px-8 py-3 text-sm font-bold hover:bg-neutral-800 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900/10 backdrop-blur-sm border border-neutral-900/10 text-neutral-100 px-8 py-3 text-sm font-bold hover:bg-neutral-800/20 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      <main className="relative z-10 -mt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              icon={Store}
              title="Multi-Vendor Marketplace"
              description="Access a global network of verified suppliers and traders. List your products, discover new opportunities, and grow your business."
              color="blue"
            />
            <ServiceCard
              icon={BarChart3}
              title="Advanced Analytics"
              description="Get insights into market trends, product performance, and business metrics with our powerful analytics dashboard."
              color="indigo"
            />
            <ServiceCard
              icon={Package}
              title="Inventory Management"
              description="Streamline your inventory operations with our comprehensive management tools designed for traders and suppliers."
              color="purple"
            />
            <ServiceCard
              icon={Shield}
              title="Secure Transactions"
              description="Trade with confidence knowing your transactions are protected by industry-leading security measures and verification systems."
              color="emerald"
            />
            <ServiceCard
              icon={Search}
              title="Advanced Search"
              description="Find exactly what you're looking for with our intelligent search system that filters products, stores, and suppliers."
              color="blue"
            />
            <ServiceCard
              icon={Users}
              title="Supplier & Trader Tools"
              description="Specialized dashboards and tools for suppliers and traders to manage their operations, orders, and analytics."
              color="indigo"
            />
            <ServiceCard
              icon={TrendingUp}
              title="Market Insights"
              description="Stay ahead of the competition with real-time market signals, trends, and momentum indicators for your products."
              color="purple"
            />
            <ServiceCard
              icon={HeadphonesIcon}
              title="24/7 Support"
              description="Get help whenever you need it with our round-the-clock customer support team ready to assist you."
              color="emerald"
            />
            <ServiceCard
              icon={Globe2}
              title="Global Logistics"
              description="Integrated shipping and logistics solutions to help you reach customers worldwide with ease and efficiency."
              color="blue"
            />
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 to-secondary-900 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-white/10 via-white/5 to-transparent -rotate-12 blur-3xl opacity-30" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200 mb-8">
                Join thousands of businesses already growing with TajirJomla Hub. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-neutral-100 px-8 py-3 text-sm font-bold hover:bg-neutral-800 transition-colors shadow-lg shadow-black/20"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900/50 backdrop-blur-sm border border-neutral-900/70 text-neutral-100 px-8 py-3 text-sm font-bold hover:bg-neutral-800/70 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[color as keyof typeof colorStyles]}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
      <p className="flex-1 text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

