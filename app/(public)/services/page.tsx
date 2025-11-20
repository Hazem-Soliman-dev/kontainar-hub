import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import {
  Store,
  BarChart3,
  Package,
  Shield,
  Search,
  Users,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Discover the comprehensive services Kontainar Hub offers to suppliers, traders, and businesses. From marketplace access to analytics and support.",
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <ServicesGrid />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
          Our Services
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Comprehensive solutions designed to help suppliers, traders, and
          businesses succeed in the global marketplace.
        </p>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const services = [
    {
      icon: Store,
      title: "Multi-Vendor Marketplace",
      description:
        "Access a global network of verified suppliers and traders. List your products, discover new opportunities, and grow your business.",
      color: "blue",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get insights into market trends, product performance, and business metrics with our powerful analytics dashboard.",
      color: "indigo",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description:
        "Streamline your inventory operations with our comprehensive management tools designed for traders and suppliers.",
      color: "purple",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "Trade with confidence knowing your transactions are protected by industry-leading security measures and verification systems.",
      color: "emerald",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Find exactly what you're looking for with our intelligent search system that filters products, stores, and suppliers.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Supplier & Trader Tools",
      description:
        "Specialized dashboards and tools for suppliers and traders to manage their operations, orders, and analytics.",
      color: "indigo",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description:
        "Stay ahead of the competition with real-time market signals, trends, and momentum indicators for your products.",
      color: "purple",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our round-the-clock customer support team ready to assist you.",
      color: "emerald",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-600/10 text-blue-300 border-blue-500/40",
    indigo: "bg-indigo-600/10 text-indigo-300 border-indigo-500/40",
    purple: "bg-purple-600/10 text-purple-300 border-purple-500/40",
    emerald: "bg-emerald-600/10 text-emerald-300 border-emerald-500/40",
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;
          const colorClass =
            colorClasses[service.color as keyof typeof colorClasses];
          return (
            <div
              key={service.title}
              className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <div
                className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${colorClass} border`}
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
