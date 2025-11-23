"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
  Mail,
  Globe,
} from "lucide-react";
import { useLanguage } from "./providers/language-provider";

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
  const { t, language, setLanguage } = useLanguage();

  const HELP_LINKS = [
    { name: t("footer.customerSupport"), href: "/customer-support" },
    { name: t("common.contact"), href: "/contact" },
    { name: t("footer.shippingInfo"), href: "/shipping-info" },
    { name: t("footer.faqs"), href: "/faq" },
  ];
  const POLICY_LINKS = [
    { name: t("footer.privacyPolicy"), href: "/privacy-policy" },
    { name: t("footer.termsOfService"), href: "/terms-of-service" },
    { name: t("footer.sellerAgreement"), href: "/seller-agreement" },
    { name: t("footer.returnsRefunds"), href: "/returns-refunds" },
  ];

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-12 lg:grid-cols-12 mb-12 lg:mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">
                  {t("common.brandName")}
                </span>
              </Link>
              <p className="max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t("footer.subscribeDesc")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 justify-start col-span-1">
                <Globe className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-transparent text-sm text-neutral-600 dark:text-neutral-400 border-none focus:ring-0 cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              <div className="flex items-center gap-2 justify-start col-span-2">
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
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-6">
                {t("footer.company")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <FooterLink href="/about">{t("footer.aboutUs")}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/services">
                    {t("footer.services")}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/careers">{t("footer.careers")}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/press">{t("footer.press")}</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-6">
                {t("footer.helpCenter")}
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
                {t("footer.legal")}
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
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              &copy; {new Date().getFullYear()} {t("common.brandName")}.{" "}
              {t("footer.rightsReserved")}
            </p>
          </div>

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
