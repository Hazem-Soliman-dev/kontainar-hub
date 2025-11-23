"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Menu,
  LogIn,
  UserRound,
  LogOut,
  Heart,
  ShoppingCart,
  Home,
  Store,
  TrendingUp,
  Tag,
  LayoutDashboard,
  Settings as SettingsIcon,
  User,
} from "lucide-react";
import { useAuthStore } from "../lib/store/auth-store";
import { ThemeToggle } from "./ui/theme-toggle";
import { useLanguage } from "./providers/language-provider";
import { LanguageToggle } from "./ui/language-toggle";

// NAV_LINKS removed to use translations inside component

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const user = useAuthStore((state) => state.user);
  const dashboardPath = useAuthStore((state) => state.dashboardPath);
  const logout = useAuthStore((state) => state.logout);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API call failed", error);
    }

    logout();
    onClose();

    window.dispatchEvent(
      new CustomEvent("subscription-changed", {
        detail: null,
      })
    );

    window.location.href = "/";
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-neutral-50 dark:bg-neutral-900/80 transition-opacity md:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed start-0 top-0 z-50 w-80 max-w-[85vw] h-screen transform bg-neutral-50 dark:bg-neutral-900 shadow-md transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="flex h-screen flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={handleLinkClick}
            >
              <span className="text-lg font-bold text-neutral-900 dark:text-neutral-300">
                {t("common.brandName")}
              </span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-neutral-600 dark:text-neutral-400 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Section */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-6 py-4 flex-1 overflow-y-auto">
            {user ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 text-primary-700 dark:text-primary-300">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-300">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-300">
                    {user.role} {t("common.access")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/favorites"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-primary-500"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("common.favorites")}</span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-primary-500"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("common.cart")}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-neutral-300">
                        {t("common.guest")}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {t("common.guestDesc")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition hover:bg-blue-500"
                  >
                    <LogIn className="h-4 w-4" />
                    {t("common.signIn")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-blue-900 px-4 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    {t("common.register")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-4 bg-neutral-50 dark:bg-neutral-800 h-full">
            <div className="mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 px-2">
                {/*Pages*/}
                {t("common.pages")}
              </h3>
            </div>

            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-sm"
                >
                  <Home className="h-5 w-5" />
                  <span>{t("nav.home")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-sm"
                >
                  <Store className="h-5 w-5" />
                  <span>{t("nav.stores")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/top-products"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-sm"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>{t("nav.topProducts")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-sm"
                >
                  <Tag className="h-5 w-5" />
                  <span>{t("nav.deals")}</span>
                </Link>
              </li>
            </ul>

            {user && (
              <div className="mt-6 space-y-1 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                <div className="mb-3 mt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 px-2">
                    {t("common.account")}
                  </h3>
                </div>
                <Link
                  href={
                    dashboardPath ??
                    (user.role === "supplier"
                      ? "/supplier/dashboard"
                      : "/trader/dashboard")
                  }
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-sm"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>{t("common.dashboard")}</span>
                </Link>
                <Link
                  href="/account"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-sm"
                >
                  <User className="h-5 w-5" />
                  <span>{t("common.account")}</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-sm"
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span>{t("common.settings")}</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-6 py-4">
            <div className="flex items-center justify-between mb-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 px-3 py-2 border border-neutral-200 dark:border-neutral-700">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("common.theme")}
              </span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between mb-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 px-3 py-2 border border-neutral-200 dark:border-neutral-700">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("common.language")}
              </span>
              <LanguageToggle />
            </div>
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-800"
              >
                <LogOut className="h-4 w-4" />
                {t("common.logout")}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full p-2 text-neutral-600 dark:text-neutral-300 transition hover:bg-neutral-50 dark:hover:bg-neutral-800 md:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}
