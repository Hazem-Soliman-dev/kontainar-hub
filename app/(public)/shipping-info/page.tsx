import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import {
  Truck,
  Package,
  Clock,
  MapPin,
  Shield,
  DollarSign,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Shipping Information",
  description:
    "Learn about shipping options, delivery times, tracking, and shipping policies at Kontainar Hub.",
  path: "/shipping-info",
  keywords: ["shipping", "delivery", "tracking", "shipping policy", "logistics"],
});

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <ShippingOptionsSection />
        <DeliveryTimesSection />
        <TrackingSection />
        <ShippingPoliciesSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
          Shipping Information
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Everything you need to know about shipping, delivery, and tracking
          your orders.
        </p>
      </div>
    </section>
  );
}

function ShippingOptionsSection() {
  const options = [
    {
      icon: Truck,
      title: "Standard Shipping",
      description: "Regular delivery within 5-7 business days",
      price: "Free on orders over $50",
      color: "blue",
    },
    {
      icon: Clock,
      title: "Express Shipping",
      description: "Fast delivery within 2-3 business days",
      price: "Starting at $15",
      color: "indigo",
    },
    {
      icon: Package,
      title: "Overnight Shipping",
      description: "Next business day delivery",
      price: "Starting at $30",
      color: "purple",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-600/10 text-blue-300 border-blue-500/40",
    indigo: "bg-indigo-600/10 text-indigo-300 border-indigo-500/40",
    purple: "bg-purple-600/10 text-purple-300 border-purple-500/40",
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Shipping Options
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          const colorClass =
            colorClasses[option.color as keyof typeof colorClasses];
          return (
            <div
              key={option.title}
              className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <div
                className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${colorClass} border`}
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
                  {option.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                  {option.description}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-blue-400 mt-2">
                  {option.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DeliveryTimesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Delivery Times
        </h2>
      </div>
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 sm:p-8 shadow-sm">
        <ul className="space-y-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>Processing Time:</strong> Orders are typically processed
              within 1-2 business days
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>Business Days:</strong> We ship Monday through Friday,
              excluding holidays
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>International Shipping:</strong> Delivery times vary by
              destination, typically 7-14 business days
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>Delays:</strong> Weather conditions or carrier issues may
              cause delays. We'll notify you if there are any issues
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function TrackingSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Track Your Order
        </h2>
      </div>
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 sm:p-8 shadow-sm">
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 mb-4">
          Once your order ships, you'll receive a tracking number via email.
          You can use this number to track your package in real-time.
        </p>
        <ul className="space-y-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-700">
          <li className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
            <span>
              Track your order from your account dashboard under "Orders"
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
            <span>
              Receive email notifications at each stage of the shipping process
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Package className="h-5 w-5 text-blue-400 mt-0.5" />
            <span>
              Contact support if you have any questions about your shipment
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ShippingPoliciesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12 mb-8 sm:mb-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Shipping Policies
        </h2>
      </div>
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 sm:p-8 shadow-sm">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-900 mb-3">
              Shipping Costs
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700">
              Shipping costs are calculated at checkout based on your location,
              order weight, and selected shipping method. Free shipping is
              available on orders over $50 for standard shipping.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-900 mb-3">
              International Shipping
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700">
              We ship to most countries worldwide. International orders may be
              subject to customs fees and import duties, which are the
              responsibility of the recipient.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-900 mb-3">
              Damaged or Lost Packages
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700">
              If your package arrives damaged or is lost in transit, please
              contact our support team immediately. We'll work with you to
              resolve the issue quickly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

