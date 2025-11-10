"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Bell,
  Heart,
  LogIn,
  Settings,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import { bestSellerProducts, featuredStores } from "../lib/mock/public";
import { useAuthStore } from "../lib/store/auth-store";

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
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
];

const quickCartItems = bestSellerProducts.slice(0, 2);
const quickFavorites = featuredStores.slice(0, 3);

export function Header() {
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);
  const user = useAuthStore((state) => state.user);
  const togglePanel = (panel: Panel) => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  };

  const closePanel = () => setOpenPanel(null);

  return (
    <header className="relative border-b border-slate-800 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-16">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-white"
            onClick={closePanel}
          >
            Market Hub
          </Link>
          <nav className="hidden gap-10 text-md font-medium text-slate-300 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
                onClick={closePanel}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-10 text-slate-300 md:flex">
          <Link href="/settings">
            <Settings className="h-5 w-5" />
          </Link>
          <Link href="/favorites">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          {user ? (
            <Link href="/account">
              <UserRound className="h-5 w-5" />
            </Link>
          ) : (
            <Link href="/login">
              <LogIn className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {openPanel ? (
        <>
          <button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 z-40 bg-black/30 lg:bg-transparent"
            onClick={closePanel}
          />
          <div className="absolute right-6 top-20 z-50 w-[22rem] rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl shadow-blue-950/30">
            {renderPanel(openPanel, closePanel)}
          </div>
        </>
      ) : null}
    </header>
  );
}

function renderPanel(panel: Panel, close: () => void) {
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
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300"
              >
                <p className="font-semibold text-white">{store.name}</p>
                <p className="text-xs text-slate-400">{store.domain}</p>
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
          <ul className="space-y-3 text-sm text-slate-300">
            {quickCartItems.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-3"
              >
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">{item.brand}</p>
                <span className="text-sm text-blue-300">
                  {formatCurrency(item.price)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span className="font-semibold text-white">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            onClick={close}
          >
            Checkout
          </Link>
        </PanelWrapper>
      );
    }
    case "account":
      return (
        <PanelWrapper title="Your account" onAction={close}>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Guest user</p>
            <p className="text-xs text-slate-500">
              Sign in or create an account to access saved preferences and
              analytics.
            </p>
          </div>
          <div className="space-y-2">
            <LinkRow href="/account" onClick={close}>
              View account
            </LinkRow>
            <LinkRow href="/settings" onClick={close}>
              Account settings
            </LinkRow>
            <LinkRow href="/favorites" onClick={close}>
              Favorites
            </LinkRow>
            <LinkRow href="/cart" onClick={close}>
              Cart
            </LinkRow>
          </div>
        </PanelWrapper>
      );
    case "login":
      return (
        <PanelWrapper
          title="Quick login"
          actionLabel="Go to login page"
          actionHref="/login"
          onAction={close}
        >
          <form
            className="space-y-3 text-sm text-slate-300"
            onSubmit={(event) => event.preventDefault()}
          >
            <LabeledField label="Email">
              <input
                type="email"
                defaultValue="buyer@example.com"
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label="Password">
              <input
                type="password"
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </LabeledField>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
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
            className="space-y-3 text-sm text-slate-300"
            onSubmit={(event) => event.preventDefault()}
          >
            <LabeledField label="Full name">
              <input
                type="text"
                placeholder="Jenna Patel"
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label="Email">
              <input
                type="email"
                placeholder="you@company.com"
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </LabeledField>
            <LabeledField label="Password">
              <input
                type="password"
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </LabeledField>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
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
      className="relative rounded-full p-2 hover:bg-slate-800 hover:text-white"
      aria-label={label}
      onClick={onClick}
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
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
      className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-blue-500/50 hover:text-white"
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
        <p className="text-sm font-semibold text-white">{title}</p>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="text-xs font-semibold uppercase tracking-wide text-blue-400 hover:text-blue-300"
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
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">
      <p className="font-semibold text-white">{heading}</p>
      <p className="text-xs text-slate-400">{detail}</p>
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
    <label className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-3">
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
      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500/50 hover:text-white"
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
