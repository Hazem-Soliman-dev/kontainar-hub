"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Store,
  Inbox,
  User,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../lib/store/auth-store";
import { useLanguage } from "../providers/language-provider";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface MobileDashboardNavProps {
  role: "supplier" | "trader";
}

export function MobileDashboardNav({ role }: MobileDashboardNavProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const links: NavLink[] = role === "supplier" 
    ? [
        { href: "/supplier/dashboard", label: t("home.supplier.dashboard.title"), icon: LayoutDashboard },
        { href: "/supplier/products", label: t("home.supplier.products.title"), icon: Package },
        { href: "/supplier/orders", label: t("home.supplier.orders.title"), icon: ShoppingCart },
        { href: "/supplier/analytics", label: t("home.supplier.analytics.title"), icon: BarChart3 },
      ]
    : [
        { href: "/trader/dashboard", label: t("home.dashboard.nav.dashboard"), icon: LayoutDashboard },
        { href: "/trader/store", label: t("home.dashboard.nav.stores"), icon: Store },
        { href: "/trader/inventory", label: t("home.dashboard.nav.inventory"), icon: Inbox },
        { href: "/trader/orders", label: t("home.dashboard.nav.orders"), icon: ShoppingCart },
      ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-3 shadow-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
        aria-label={t("home.dashboard.mobileNav.toggleMenu")}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-neutral-900 dark:text-white" />
        ) : (
          <Menu className="h-5 w-5 text-neutral-900 dark:text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <nav
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-40 w-80 max-w-[85vw] bg-neutral-100 dark:bg-neutral-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {user?.fullName || t("home.dashboard.mobileNav.user")}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">
                  {role === "supplier" 
                    ? t("home.dashboard.mobileNav.supplierAccount")
                    : t("home.dashboard.mobileNav.traderAccount")}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-semibold"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-neutral-200 dark:border-neutral-800" />

            {/* Secondary Links */}
            <div className="space-y-1">
              <Link
                href="/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              >
                <User className="h-5 w-5 flex-shrink-0" />
                <span>{t("home.dashboard.mobileNav.accountSettings")}</span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-semibold">{t("home.dashboard.mobileNav.signOut")}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Navigation Hint */}
      <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
