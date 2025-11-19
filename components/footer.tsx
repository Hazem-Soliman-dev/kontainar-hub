import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  CreditCard,
  Building2,
} from "lucide-react";

const HELP_LINKS = ["Customer Support", "Shipping Info", "FAQs"];
const POLICY_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Policy",
  "Seller Agreement",
  "Returns & Refunds",
];

const PAYMENT_METHODS = [
  { name: "Visa", icon: CreditCard },
  { name: "PayPal", icon: CreditCard },
  { name: "Stripe", icon: CreditCard },
  { name: "Mastercard", icon: CreditCard },
  { name: "Bank Transfer", icon: Building2 },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-200 bg-neutral-100/80 dark:bg-neutral-100/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 text-md text-neutral-700 dark:text-neutral-700 grid-cols-2 md:grid-cols-4 justify-center">
        <div className="space-y-5 col-span-2 md:col-span-1">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
            TajirJomla Hub
          </p>
          <p>
            Your trusted multi-vendor marketplace connecting buyers with quality
            stores worldwide.
          </p>
          <div className="flex gap-3">
            <Link
              href="https://www.facebook.com/kontainarhub"
              target="_blank"
              className="hover:text-neutral-900 dark:hover:text-neutral-900 bg-gray-500/10 rounded-full p-3"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.twitter.com/kontainarhub"
              target="_blank"
              className="hover:text-neutral-900 dark:hover:text-neutral-900 bg-gray-500/10 rounded-full p-3"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/kontainarhub"
              target="_blank"
              className="hover:text-neutral-900 dark:hover:text-neutral-900 bg-gray-500/10 rounded-full p-3"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-5 md:col-span-1">
          <div className="space-y-4">
            <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
              Company
            </p>
            <ul className="space-y-2 mt-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-neutral-900 dark:hover:text-neutral-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-neutral-900 dark:hover:text-neutral-900"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden md:block pt-4 space-y-4">
            <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
              Help Center
            </p>
            <ul className="space-y-2 mt-2">
              {HELP_LINKS.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-neutral-900 dark:hover:text-neutral-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 md:hidden">
          <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
            Help Center
          </p>
          <ul className="space-y-2">
            {HELP_LINKS.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-neutral-900 dark:hover:text-neutral-900"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 col-span-2 md:col-span-1">
          <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
            Policies
          </p>
          <ul className="space-y-2">
            {POLICY_LINKS.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-neutral-900 dark:hover:text-neutral-900"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 col-span-2 md:col-span-1">
          <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
            Language
          </p>
          <div className="relative">
            <label htmlFor="language-select" className="sr-only">
              Language
            </label>
            <select
              id="language-select"
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 focus:border-blue-500 focus:outline-none"
            >
              <option>English (US)</option>
              <option>Deutsch</option>
              <option>Français</option>
            </select>
          </div>
          <div className="hidden md:block pt-4">
            <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900 mb-3">
              Payment Methods
            </p>
            <div className="flex flex-wrap gap-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.name}
                    className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2"
                    title={method.name}
                  >
                    <Icon className="h-4 w-4 text-neutral-700 dark:text-neutral-700" />
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-700">
                      {method.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods for Mobile - Bottom of Footer */}
      <div className="md:hidden border-t border-neutral-200 dark:border-neutral-200 pt-4 px-6 pb-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900 mb-4">
            Payment Methods
          </p>
          <div className="flex flex-wrap gap-3">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.name}
                  className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2"
                  title={method.name}
                >
                  <Icon className="h-4 w-4 text-neutral-700 dark:text-neutral-700" />
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-700">
                    {method.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
