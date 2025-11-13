import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const HELP_LINKS = [
  "Customer Support",
  "Order Tracking",
  "Returns & Refunds",
  "Shipping Info",
  "FAQs",
];
const POLICY_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Policy",
  "Seller Agreement",
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-200 bg-neutral-100/80 dark:bg-neutral-100/80 h-80 justify-center">
      <div className="mx-auto grid h-full w-full max-w-7xl gap-10 px-6 py-12 text-md text-neutral-700 dark:text-neutral-700 md:grid-cols-4 justify-center">
        <div className="space-y-6">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
            Kontainar Hub
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

        <div className="space-y-6">
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

        <div className="space-y-6">
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

        <div className="space-y-6">
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
        </div>
      </div>
    </footer>
  );
}
