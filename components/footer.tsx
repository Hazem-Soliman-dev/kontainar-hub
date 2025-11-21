"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, ArrowRight, Mail } from "lucide-react";

const HELP_LINKS = [
  { name: "Customer Support", href: "/customer-support" },
  { name: "Contact", href: "/contact" },
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
    <footer className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 mb-12 lg:mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">
                  TajirJomla Hub
                </span>
              </Link>
              <p className="max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                Your trusted multi-vendor marketplace connecting buyers with
                quality stores worldwide. Experience the future of B2B commerce.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider">
                Subscribe to our newsletter
              </h3>
              <form
                className="flex gap-2 max-w-md"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 py-3 pl-10 pr-4 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>
                <button className="rounded-xl bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-4 py-3 font-bold text-sm hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex gap-4">
              <SocialLink
                href="https://facebook.com"
                icon={Facebook}
                label="Facebook"
              />
              <SocialLink
                href="https://twitter.com"
                icon={Twitter}
                label="Twitter"
              />
              <SocialLink
                href="https://instagram.com"
                icon={Instagram}
                label="Instagram"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/services">Services</FooterLink>
                </li>
                <li>
                  <FooterLink href="/careers">Careers</FooterLink>
                </li>
                <li>
                  <FooterLink href="/press">Press</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-6">
                Help Center
              </h3>
              <ul className="space-y-4">
                {HELP_LINKS.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                {POLICY_LINKS.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} TajirJomla Hub. All rights
            reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {PAYMENT_METHODS.map((method) => (
              <div key={method.name} className="relative h-6 w-10">
                <Image
                  src={method.image}
                  alt={method.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all duration-200 border border-neutral-200 dark:border-neutral-700"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1 group"
    >
      <span className="w-0 overflow-hidden transition-all duration-200 group-hover:w-3 text-primary-600 dark:text-primary-400">
        <ArrowRight className="h-3 w-3" />
      </span>
      {children}
    </Link>
  );
}
