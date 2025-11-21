"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Heart,
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import { bestSellerProducts, featuredStores } from "../lib/mock/public";
import { useAuthStore, type AuthUser } from "../lib/store/auth-store";
import { ThemeToggle } from "./ui/theme-toggle";
import { MobileMenu, MobileMenuButton } from "./mobile-menu";

type Panel =
  | "notifications"
  | "settings"
  | "favorites"
  | "cart"
  | "account"
  | "login"
  | "register";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/stores", label: "Stores" },
  { href: "/top-products", label: "Top Products" },
  { href: "/plans", label: "Deals" },
];

const quickCartItems = bestSellerProducts.slice(0, 2);
const quickFavorites = featuredStores.slice(0, 3);

export function Header() {
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const dashboardPath = useAuthStore((state) => state.dashboardPath);
  const logout = useAuthStore((state) => state.logout);
  const togglePanel = (panel: Panel) => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  };

  const closePanel = () => setOpenPanel(null);
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      // Clear server-side cookie
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API call failed", error);
    }

    // Clear client-side store
    logout();
    closePanel();

    // Notify other components that subscription has changed (cleared)
    window.dispatchEvent(
      new CustomEvent("subscription-changed", {
        detail: null,
      })
    );

    // Force full page reload to ensure server components get updated state
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-8">
          <MobileMenuButton onClick={openMobileMenu} />
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closePanel}
          >
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 hidden sm:block">
              TajirJomla Hub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
                onClick={closePanel}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />

          <div className="h-6 w-px bg-neutral-50 dark:bg-neutral-800 mx-2" />

          {user && (
            <>
              <IconButton
                label="Favorites"
                onClick={() => router.push("/favorites")}
              >
                <Heart className="h-5 w-5" />
              </IconButton>
              <IconButton
                label="Cart"
                onClick={() => togglePanel("cart")}
                badge={
                  quickCartItems.length > 0
                    ? quickCartItems.length.toString()
                    : undefined
                }
              >
                <ShoppingCart className="h-5 w-5" />
              </IconButton>
            </>
          )}

          {user ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePanel("account");
              }}
              className="ml-2 flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 py-1.5 pl-1.5 pr-3 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              aria-haspopup="menu"
              aria-expanded={openPanel === "account"}
              aria-label="Account menu"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 text-xs font-bold">
                {user.fullName.charAt(0)}
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 max-w-[100px] truncate">
                {user.fullName}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/login"
                className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                onClick={closePanel}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary-600 dark:bg-primary-500 px-4 py-2 text-sm font-bold text-neutral-200 shadow-lg shadow-primary-500/20 hover:bg-primary-500 dark:hover:bg-primary-400 transition-all hover:-translate-y-0.5"
                onClick={closePanel}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {openPanel ? (
        <>
          <button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={closePanel}
          />
          <div className="fixed right-4 sm:right-6 top-20 z-50 w-80 sm:w-96 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
            {renderPanel(openPanel, closePanel, {
              user,
              dashboardPath,
              onLogout: handleLogout,
            })}
          </div>
        </>
      ) : null}
    </header>
  );
}

interface PanelContext {
  user: AuthUser | null;
  dashboardPath: string | null;
  onLogout: () => void;
}

function renderPanel(panel: Panel, close: () => void, context: PanelContext) {
  switch (panel) {
    case "notifications":
      return (
        <PanelWrapper
          title="Notifications"
          actionLabel="View all"
          actionHref="/notifications"
          onAction={close}
        >
          <NotificationItem
            heading="New RFQ activity"
            detail="Buyers are searching in Electronics."
          />
          <NotificationItem
            heading="Supplier accepted"
            detail="TechHub Electronics confirmed interest."
          />
          <NotificationItem
            heading="Trial reminder"
            detail="Activate your plan to keep analytics."
          />
        </PanelWrapper>
      );
    case "settings":
      return (
        <PanelWrapper
          title="Quick settings"
          actionLabel="Settings page"
          actionHref="/settings"
          onAction={close}
        >
          <ToggleRow label="Email alerts" defaultChecked />
          <ToggleRow label="Marketplace tips" />
          <ToggleRow label="Dark mode" defaultChecked />
        </PanelWrapper>
      );
    case "favorites":
      return (
        <PanelWrapper
          title="Saved stores"
          actionLabel="Favorites page"
          actionHref="/favorites"
          onAction={close}
        >
          <ul className="space-y-3">
            {quickFavorites.map((store) => (
              <li
                key={store.id}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-3 text-sm text-neutral-700 dark:text-neutral-300"
              >
                <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                  {store.name}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {store.domain}
                </p>
              </li>
            ))}
          </ul>
        </PanelWrapper>
      );
    case "cart": {
      const subtotal = quickCartItems.reduce(
        (acc, item) => acc + item.price,
        0
      );
      return (
        <PanelWrapper
          title="Mini cart"
          actionLabel="Cart page"
          actionHref="/cart"
          onAction={close}
        >
          <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            {quickCartItems.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-3"
              >
                <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {item.brand}
                </p>
                <span className="text-sm text-primary-600 dark:text-primary-400">
                  {formatCurrency(item.price)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-200">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-primary-500"
            onClick={close}
          >
            Checkout
          </Link>
        </PanelWrapper>
      );
    }
    case "account": {
      if (context.user) {
        const { user, dashboardPath } = context;
        const resolvedDashboard =
          dashboardPath ??
          (user.role === "supplier"
            ? "/supplier/dashboard"
            : "/trader/dashboard");
        return (
          <PanelWrapper title="Your workspace" onAction={close}>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-4 text-sm text-neutral-700 dark:text-neutral-300">
              <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                {user.fullName}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {user.email}
              </p>
              <p className="mt-2 inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-300">
                {user.role} access
              </p>
            </div>
            <div className="space-y-2">
              <LinkRow href={resolvedDashboard} onClick={close}>
                Go to dashboard
              </LinkRow>
              <LinkRow href="/account" onClick={close}>
                Account overview
              </LinkRow>
              <LinkRow href="/settings" onClick={close}>
                Workspace settings
              </LinkRow>
            </div>
            <button
              type="button"
              onClick={context.onLogout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition hover:border-primary-500/50 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </PanelWrapper>
        );
      }

      return (
        <PanelWrapper title="Your account" onAction={close}>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-4 text-sm text-neutral-700 dark:text-neutral-300">
            <p className="font-semibold text-neutral-900 dark:text-neutral-200">
              Guest user
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Sign in or create an account to access saved preferences and
              analytics.
            </p>
          </div>
          <div className="space-y-2">
            <LinkRow href="/login" onClick={close}>
              Sign in
            </LinkRow>
            <LinkRow href="/register" onClick={close}>
              Create account
            </LinkRow>
            <LinkRow href="/contact" onClick={close}>
              Contact
            </LinkRow>
          </div>
        </PanelWrapper>
      );
    }
    case "login":
      return (
        <PanelWrapper
          title="Quick login"
          actionLabel="Go to login page"
          actionHref="/login"
          onAction={close}
        >
          <form
            className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300"
            onSubmit={(event) => event.preventDefault()}
          >
            <LabeledField label="Email">
              <input
                type="email"
                defaultValue="buyer@example.com"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label="Password">
              <input
                type="password"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-primary-500"
            >
              Sign in
            </button>
          </form>
        </PanelWrapper>
      );
    case "register":
      return (
        <PanelWrapper
          title="Quick registration"
          actionLabel="Go to registration page"
          actionHref="/register"
          onAction={close}
        >
          <form
            className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300"
            onSubmit={(event) => event.preventDefault()}
          >
            <LabeledField label="Full name">
              <input
                type="text"
                placeholder="Jenna Patel"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label="Email">
              <input
                type="email"
                placeholder="you@company.com"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label="Password">
              <input
                type="password"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-primary-500"
            >
              Create account
            </button>
          </form>
        </PanelWrapper>
      );
    default:
      return null;
  }
}

function IconButton({
  label,
  children,
  badge,
  onClick,
}: {
  label: string;
  children: ReactNode;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative rounded-full p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all"
      aria-label={label}
      onClick={onClick}
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-neutral-300">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function TextButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300 transition hover:border-primary-500/50 hover:text-neutral-900 dark:hover:text-neutral-200"
    >
      {children}
    </button>
  );
}

function PanelWrapper({
  title,
  children,
  actionLabel,
  actionHref,
  onAction,
}: {
  title: string;
  children: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onAction: () => void;
}) {
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-300">
          {title}
        </p>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
            onClick={onAction}
          >
            {actionLabel}
          </Link>
        ) : null}
      </header>
      {children}
    </div>
  );
}

function NotificationItem({
  heading,
  detail,
}: {
  heading: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-3 text-sm text-neutral-700 dark:text-neutral-200">
      <p className="font-semibold text-neutral-900 dark:text-neutral-300">
        {heading}
      </p>
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{detail}</p>
    </div>
  );
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ToggleRow({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-neutral-300">
      <span>{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4"
      />
    </label>
  );
}

function LinkRow({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 transition hover:border-primary-500/50 hover:text-neutral-900 dark:hover:text-neutral-200"
    >
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
