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
  User,
  UserRound,
} from "lucide-react";

import { featuredStores } from "../lib/mock/public";
import { useAuthStore, type AuthUser } from "../lib/store/auth-store";
import { useCartStore } from "../lib/store/cart-store";
import { ThemeToggle } from "./ui/theme-toggle";
import { MobileMenu, MobileMenuButton } from "./mobile-menu";
import { useLanguage } from "./providers/language-provider";
import { LanguageToggle } from "./ui/language-toggle";

type Panel =
  | "notifications"
  | "settings"
  | "favorites"
  | "cart"
  | "account"
  | "login"
  | "register";



// NAV_LINKS moved inside component to use translation

const quickFavorites = featuredStores.slice(0, 3);

export function Header() {
  const { t } = useLanguage();
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const dashboardPath = useAuthStore((state) => state.dashboardPath);
  const logout = useAuthStore((state) => state.logout);
  
  // Cart store for real-time cart data
  const cartItems = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  
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
              {t("common.brandName")}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
              onClick={closePanel}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/stores"
              className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
              onClick={closePanel}
            >
              {t("nav.stores")}
            </Link>
            <Link
              href="/top-products"
              className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
              onClick={closePanel}
            >
              {t("nav.topProducts")}
            </Link>
            <Link
              href="/plans"
              className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
              onClick={closePanel}
            >
              {t("nav.deals")}
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          <div className="h-6 w-px bg-neutral-50 dark:bg-neutral-800 mx-2" />

          {user && (
            <>
              <IconButton
                label={t("common.favorites")}
                onClick={() => router.push("/favorites")}
              >
                <Heart className="h-5 w-5" />
              </IconButton>
              <IconButton
                label={t("common.cart")}
                onClick={() => togglePanel("cart")}
                badge={
                  getTotalItems() > 0
                    ? getTotalItems().toString()
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
              className="ms-2 flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 py-1.5 ps-1.5 pe-3 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              aria-haspopup="menu"
              aria-expanded={openPanel === "account"}
              aria-label="Account menu"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs font-bold">
                <User className="h-5 w-5" /> 
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 max-w-[100px] truncate">
                {user.fullName}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-3 ms-2">
              <Link
                href="/login"
                className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                onClick={closePanel}
              >
                {t("common.login")}
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-bold text-neutral-200 shadow-lg shadow-primary-500/20 hover:bg-blue-500 dark:hover:bg-blue-400 transition-all hover:-translate-y-0.5"
                onClick={closePanel}
              >
                {t("common.signup")}
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
          <div className="fixed end-4 sm:end-6 top-20 z-50 w-80 sm:w-96 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
            {renderPanel(openPanel, closePanel, {
              user,
              dashboardPath,
              onLogout: handleLogout,
              t,
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
  t: (key: string) => string;
}

function renderPanel(panel: Panel, close: () => void, context: PanelContext) {
  switch (panel) {
    case "notifications":
      return (
        <PanelWrapper
          title={context.t("common.notifications")}
          actionLabel={context.t("common.viewAll")}
          actionHref="/notifications"
          onAction={close}
        >
          <NotificationItem
            heading={context.t("common.newRfqActivity")}
            detail={context.t("common.buyersSearching")}
          />
          <NotificationItem
            heading={context.t("common.supplierAccepted")}
            detail={context.t("common.techHubConfirmed")}
          />
          <NotificationItem
            heading={context.t("common.trialReminder")}
            detail={context.t("common.activatePlan")}
          />
        </PanelWrapper>
      );
    case "settings":
      return (
        <PanelWrapper
          title={context.t("common.settings")}
          actionLabel={context.t("common.settings")}
          actionHref="/settings"
          onAction={close}
        >
          <ToggleRow label={context.t("common.emailAlerts")} defaultChecked />
          <ToggleRow label={context.t("common.marketplaceTips")} />
          <ToggleRow label={context.t("common.darkMode")} defaultChecked />
        </PanelWrapper>
      );
    case "favorites":
      return (
        <PanelWrapper
          title={context.t("common.favorites")}
          actionLabel={context.t("common.favorites")}
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
      // Get cart items from the cart store (passed via context)
      const cartStore = useCartStore.getState();
      const items = cartStore.items;
      const subtotal = cartStore.getSubtotal();
      
      return (
        <PanelWrapper
          title={context.t("common.cart")}
          actionLabel={context.t("common.cart")}
          actionHref="/cart"
          onAction={close}
        >
          {items.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-6 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-neutral-400 dark:text-neutral-600" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {context.t("common.emptyCart") || "Your cart is empty"}
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-3"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                        {item.name}
                      </p>
                      <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full font-medium">
                        ×{item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                      {item.brand}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary-600 dark:text-primary-400">
                        {formatCurrency(item.price)} each
                      </span>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <span>{context.t("common.subtotal")}</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                onClick={close}
              >
                {context.t("common.checkout")}
              </Link>
            </>
          )}
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
          <PanelWrapper title={context.t("common.yourWorkspace")} onAction={close}>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-4 text-sm text-neutral-700 dark:text-neutral-300">
              <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                {user.fullName}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {user.email}
              </p>
              <p className="mt-2 inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-300">
                {user.role} {context.t("common.access")}
              </p>
            </div>
            <div className="space-y-2">
              <LinkRow href={resolvedDashboard} onClick={close}>
                {context.t("common.goDashboard")}
              </LinkRow>
              <LinkRow href="/account" onClick={close}>
                {context.t("common.accountOverview")}
              </LinkRow>
              <LinkRow href="/settings" onClick={close}>
                {context.t("common.workspaceSettings")}
              </LinkRow>
            </div>
            <button
              type="button"
              onClick={context.onLogout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition hover:border-primary-500/50 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              <LogOut className="h-4 w-4" />
              {context.t("common.logout")}
            </button>
          </PanelWrapper>
        );
      }

      return (
        <PanelWrapper title={context.t("common.yourAccount")} onAction={close}>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 p-4 text-sm text-neutral-700 dark:text-neutral-300">
            <p className="font-semibold text-neutral-900 dark:text-neutral-200">
              {context.t("common.guest")}
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {context.t("common.guestDesc")}
            </p>
          </div>
          <div className="space-y-2">
            <LinkRow href="/login" onClick={close}>
              {context.t("common.signIn")}
            </LinkRow>
            <LinkRow href="/register" onClick={close}>
              {context.t("common.createAccount")}
            </LinkRow>
            <LinkRow href="/contact" onClick={close}>
              {context.t("common.contact")}
            </LinkRow>
          </div>
        </PanelWrapper>
      );
    }
    case "login":
      return (
        <PanelWrapper
          title={context.t("common.quickLogin")}
          actionLabel={context.t("common.login")}
          actionHref="/login"
          onAction={close}
        >
          <form
            className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300"
            onSubmit={(event) => event.preventDefault()}
          >
            <LabeledField label={context.t("common.email")}>
              <input
                type="email"
                defaultValue="buyer@example.com"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label={context.t("common.password")}>
              <input
                type="password"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-blue-500"
            >
              {context.t("common.signIn")}
            </button>
          </form>
        </PanelWrapper>
      );
    case "register":
      return (
        <PanelWrapper
          title={context.t("common.quickReg")}
          actionLabel={context.t("common.register")}
          actionHref="/register"
          onAction={close}
        >
          <form
            className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300"
            onSubmit={(event) => event.preventDefault()}
          >
            <LabeledField label={context.t("common.fullName")}>
              <input
                type="text"
                placeholder="Jenna Patel"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label={context.t("common.email")}>
              <input
                type="email"
                placeholder="you@company.com"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label={context.t("common.password")}>
              <input
                type="password"
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-neutral-300 focus:border-primary-500 focus:outline-none"
              />
            </LabeledField>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-blue-500"
            >
              {context.t("common.createAccount")}
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
        <span className="absolute -end-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-neutral-300">
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
            className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
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
