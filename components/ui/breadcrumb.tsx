"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

// Map path segments to readable labels
const pathLabelMap: Record<string, string> = {
  supplier: "Supplier",
  trader: "Trader",
  products: "Products",
  orders: "Orders",
  analytics: "Analytics",
  dashboard: "Dashboard",
  inventory: "Inventory",
  store: "Store",
  contact: "Contact",
  plans: "Plans",
  search: "Search",
  stores: "Stores",
  cart: "Cart",
  account: "Account",
  favorites: "Favorites",
  settings: "Settings",
  login: "Login",
  register: "Register",
  about: "About",
  services: "Services",
  "customer-support": "Customer Support",
  "shipping-info": "Shipping Info",
  faq: "FAQs",
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "cookie-policy": "Cookie Policy",
  "seller-agreement": "Seller Agreement",
  "returns-refunds": "Returns & Refunds",
};

// Valid routes that exist in the application
const validRoutes = new Set([
  "/",
  "/top-products",
  "/contact",
  "/plans",
  "/search",
  "/stores",
  "/cart",
  "/account",
  "/favorites",
  "/settings",
  "/login",
  "/register",
  "/about",
  "/services",
  "/customer-support",
  "/shipping-info",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/seller-agreement",
  "/returns-refunds",
  "/supplier/dashboard",
  "/supplier/products",
  "/supplier/orders",
  "/supplier/analytics",
  "/trader/dashboard",
  "/trader/inventory",
  "/trader/orders",
  "/trader/store",
]);

// Segments that don't have base pages (should not be clickable)
const nonClickableSegments = new Set([
  "supplier", // No /supplier page
  "trader", // No /trader page
]);

// Map segments to alternative routes
const segmentRouteMap: Record<string, string> = {
  products: "/top-products", // /products doesn't exist, map to /best-sellers
};

function formatSegment(segment: string): string {
  // Check if we have a mapped label
  if (pathLabelMap[segment]) {
    return pathLabelMap[segment];
  }
  // Convert kebab-case to Title Case
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isDynamicRouteSegment(segment: string): boolean {
  // Check if segment looks like an ID (UUID or long alphanumeric)
  return (
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
      segment
    ) ||
    /^[a-f0-9-]{20,}$/i.test(segment) ||
    segment.length > 15
  );
}

function getSegmentRoute(
  segment: string,
  segments: string[],
  index: number
): string | null {
  // If segment is non-clickable, return null
  if (nonClickableSegments.has(segment)) {
    return null;
  }

  // If it's a dynamic route segment (ID), check parent mapping
  if (isDynamicRouteSegment(segment) && index > 0) {
    const parentSegment = segments[index - 1];
    if (segmentRouteMap[parentSegment]) {
      return segmentRouteMap[parentSegment];
    }
    return null; // Dynamic routes are not clickable
  }

  // Check if segment has a route mapping
  if (segmentRouteMap[segment]) {
    return segmentRouteMap[segment];
  }

  // Build the href
  const href = "/" + segments.slice(0, index + 1).join("/");

  // Check if it's a valid route
  if (validRoutes.has(href)) {
    return href;
  }

  // Check if it's a dynamic route pattern (like /products/[id] or /stores/[id])
  if (/^\/products\/[^/]+$/.test(href) || /^\/stores\/[^/]+$/.test(href)) {
    return null; // Dynamic routes are not clickable
  }

  // Not a valid route
  return null;
}

interface BreadcrumbProps {
  currentPageName?: string; // Optional override for current page name (e.g., product name)
}

export function Breadcrumb({ currentPageName }: BreadcrumbProps) {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  // Split pathname into segments
  const segments = pathname.split("/").filter(Boolean);

  // Check if this is a dashboard route (supplier or trader)
  const isDashboardRoute =
    segments[0] === "supplier" || segments[0] === "trader";
  const roleSegment = segments[0];

  // Build breadcrumb items with Dashboard insertion for dashboard routes
  const items: Array<{
    label: string;
    href: string | null;
    isLast: boolean;
    isClickable: boolean;
  }> = [{ label: "Home", href: "/", isLast: false, isClickable: true }];

  // Add role segment (supplier/trader)
  if (isDashboardRoute && roleSegment) {
    items.push({
      label: formatSegment(roleSegment),
      href: null, // Role segments are not clickable
      isLast: false,
      isClickable: false,
    });

    // Always add Dashboard after role for dashboard routes
    const dashboardHref = `/${roleSegment}/dashboard`;
    const isDashboardPage =
      segments.length === 2 && segments[1] === "dashboard";

    items.push({
      label: "Dashboard",
      href: dashboardHref,
      isLast: segments.length === 2 && segments[1] === "dashboard",
      isClickable: true,
    });

    // Add sub-pages after Dashboard (products, orders, etc.)
    if (
      segments.length > 2 ||
      (segments.length === 2 && segments[1] !== "dashboard")
    ) {
      const subPageIndex = segments[1] === "dashboard" ? 2 : 1;
      for (let i = subPageIndex; i < segments.length; i++) {
        const segment = segments[i];
        const href = getSegmentRoute(segment, segments, i);
        const isLast = i === segments.length - 1;
        const label =
          isLast && currentPageName ? currentPageName : formatSegment(segment);
        items.push({
          label,
          href,
          isLast,
          isClickable: href !== null,
        });
      }
    }
  } else {
    // For non-dashboard routes, use normal segment mapping
    items.push(
      ...segments.map((segment, index) => {
        const href = getSegmentRoute(segment, segments, index);
        const isLast = index === segments.length - 1;
        const label =
          isLast && currentPageName ? currentPageName : formatSegment(segment);
        return { label, href, isLast, isClickable: href !== null };
      })
    );
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-700">
        {items.map((item, index) => (
          <li
            key={`${item.href || item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {index === 0 ? (
              <Link
                href={item.href || "/"}
                className="inline-flex items-center gap-1 transition hover:text-blue-400 dark:hover:text-blue-400"
              >
                <Home className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ) : item.isLast ? (
              <span className="text-neutral-900 dark:text-neutral-900 font-medium">
                {item.label}
              </span>
            ) : item.isClickable && item.href ? (
              <Link
                href={item.href}
                className="transition hover:text-blue-400 dark:hover:text-blue-400"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-700 dark:text-neutral-700">
                {item.label}
              </span>
            )}
            {!item.isLast && (
              <ChevronRight className="h-4 w-4 text-neutral-500 dark:text-neutral-500" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
