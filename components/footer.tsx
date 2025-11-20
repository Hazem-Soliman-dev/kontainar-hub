import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram } from "lucide-react";

const HELP_LINKS = [
  { name: "Customer Support", href: "/customer-support" },
  { name: "Shipping Info", href: "/shipping-info" },
  { name: "FAQs", href: "/faq" },
];
const POLICY_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Seller Agreement", href: "/seller-agreement" },
  { name: "Returns & Refunds", href: "/returns-refunds" },
];

const PAYMENT_METHODS = [
  { name: "Visa", image: "/icons/visa2-120x60fill.png" },
  { name: "Mastercard", image: "/icons/mastercard3-120x60fill.png" },
  { name: "Apple Pay", image: "/icons/apple-pay4-120x60fill.png" },
  { name: "Mada", image: "/icons/mada1-120x60fill.png" },
  { name: "STC Pay", image: "/icons/stcpay5-120x60fill.png" },
  { name: "Mobily Pay", image: "/icons/mobilypay6-120x60fill.png" },
  { name: "Tabbey", image: "/icons/Tabbey7-120x60fill.png" },
  { name: "Tamara", image: "/icons/Tamara8-120x60fill.png" },
  { name: "Cash", image: "/icons/Cash9-120x60fill.png" },
  { name: "Bank", image: "/icons/Bank10-120x60fill.png" },
  { name: "Payment Method 1", image: "/icons/1-120x60fill.jpg" },
  { name: "Payment Method 2", image: "/icons/2-120x60fill.jpg" },
  { name: "Payment Method 3", image: "/icons/3-120x60fill.jpg" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-200 bg-neutral-100/80 dark:bg-neutral-100/80">
      <div className="mx-auto grid w-full max-w-7xl gap-6 md:gap-10 px-6 py-12 text-md text-neutral-700 dark:text-neutral-700 grid-cols-2 md:grid-cols-4 justify-center">
        {/* Brand Section - Full width on mobile, 1 column on desktop */}
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

        {/* Company & Help Center - Stacked on mobile in left column, single column on desktop */}
        <div className="space-y-6 md:space-y-5 md:col-span-1">
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
          <div className="pt-2 md:pt-4 space-y-4">
            <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
              Help Center
            </p>
            <ul className="space-y-2 mt-2">
              {HELP_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-neutral-900 dark:hover:text-neutral-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Policies - Right column on mobile, single column on desktop */}
        <div className="space-y-4 md:col-span-1">
          <p className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
            Policies
          </p>
          <ul className="space-y-2">
            {POLICY_LINKS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-neutral-900 dark:hover:text-neutral-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Language & Payment Methods - Full width on mobile, 1 column on desktop */}
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
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.name}
                  className="relative h-6 w-auto"
                  title={method.name}
                >
                  <Image
                    src={method.image}
                    alt={method.name}
                    width={120}
                    height={60}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              ))}
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
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.name}
                className="relative h-10 w-auto"
                title={method.name}
              >
                <Image
                  src={method.image}
                  alt={method.name}
                  width={120}
                  height={60}
                  className="h-6 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
