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

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/stores", label: "Stores", icon: Store },
  { href: "/top-products", label: "Top Products", icon: TrendingUp },
  { href: "/plans", label: "Deals", icon: Tag },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
          className="fixed inset-0 z-40 bg-neutral-900/50 transition-opacity md:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] transform bg-neutral-900/50 dark:bg-neutral-900/50 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-6 py-4">
            <Link
              href="/"
              className="text-xl font-semibold text-neutral-900 dark:text-neutral-900"
              onClick={handleLinkClick}
            >
              TajirJomla Hub
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-neutral-900 dark:text-neutral-900 transition hover:bg-neutral-100 dark:hover:bg-neutral-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Section */}
          <div className="border-b border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-6 py-4">
            {user ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-600">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    {user.role} access
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/favorites"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-300 bg-neutral-100 dark:bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-900 dark:text-neutral-900 transition hover:bg-neutral-50 dark:hover:bg-neutral-50 hover:border-blue-500"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Favorites</span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-300 bg-neutral-100 dark:bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-900 dark:text-neutral-900 transition hover:bg-neutral-50 dark:hover:bg-neutral-50 hover:border-blue-500"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Cart</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-300 text-neutral-900 dark:text-neutral-900">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-neutral-900">
                        Guest User
                      </p>
                      <p className="text-xs text-neutral-900 dark:text-neutral-900">
                        Sign in to access all features
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-neutral-100 dark:text-neutral-100 transition hover:bg-blue-600"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={handleLinkClick}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-300 bg-neutral-100 dark:bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-50 dark:hover:bg-neutral-50"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-4 bg-neutral-100 dark:bg-neutral-100">
            <div className="mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500 px-2">
                Pages
              </h3>
            </div>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-100 dark:hover:bg-neutral-100 hover:text-blue-600 dark:hover:text-blue-600 hover:shadow-sm"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {user && (
              <div className="mt-6 space-y-1 border-t border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 pt-4">
                <div className="mb-3 mt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500 px-2">
                    Account
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
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-100 dark:hover:bg-neutral-100 hover:text-blue-600 dark:hover:text-blue-600 hover:shadow-sm"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/account"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-100 dark:hover:bg-neutral-100 hover:text-blue-600 dark:hover:text-blue-600 hover:shadow-sm"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-100 dark:hover:bg-neutral-100 hover:text-blue-600 dark:hover:text-blue-600 hover:shadow-sm"
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="border-t border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-6 py-4">
            <div className="flex items-center justify-between mb-4 rounded-lg bg-neutral-100 dark:bg-neutral-100 px-3 py-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">
                Theme
              </span>
              <ThemeToggle />
            </div>
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 dark:border-red-200 bg-red-50 dark:bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-600 transition hover:bg-red-100 dark:hover:bg-red-100 hover:border-red-300"
              >
                <LogOut className="h-4 w-4" />
                Log Out
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
      className="rounded-full p-2 text-neutral-700 dark:text-neutral-700 transition hover:bg-neutral-200 dark:hover:bg-neutral-200 md:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}
