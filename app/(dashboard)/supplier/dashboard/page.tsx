"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  ArrowRight,
} from "lucide-react";

import { SalesChart } from "../../../../components/charts/sales-chart";
import { DashboardGate } from "../../../../components/dashboard/dashboard-gate";
import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import { useLanguage } from "../../../../components/providers/language-provider";
import { MotionWrapper } from "../../../../components/ui/motion-wrapper";

type DashboardOrderStatus = "pending" | "processing" | "fulfilled";

interface DashboardOrder {
  id: string;
  customer: string;
  total: number;
  status: DashboardOrderStatus;
  placedAt: string;
}

const INITIAL_PRODUCTS = [
  { id: "prod-1", name: "Organic Arabica Roast", status: "active" },
  { id: "prod-2", name: "Cold Chain Sensors", status: "active" },
  { id: "prod-3", name: "Sustainable Packaging Kit", status: "draft" },
  { id: "prod-4", name: "Technical Denim Roll", status: "active" },
];

const INITIAL_ORDERS: DashboardOrder[] = [
  {
    id: "ord-4820",
    customer: "Northwind Traders",
    total: 18250,
    status: "pending",
    placedAt: "2025-11-08T09:30:00Z",
  },
  {
    id: "ord-4811",
    customer: "BlueWater Imports",
    total: 21500,
    status: "processing",
    placedAt: "2025-11-07T15:10:00Z",
  },
  {
    id: "ord-4804",
    customer: "Aurora Retail",
    total: 9800,
    status: "fulfilled",
    placedAt: "2025-11-06T12:45:00Z",
  },
];

const SALES_TREND = [
  { month: "Jun", revenue: 42000, volume: 68 },
  { month: "Jul", revenue: 47000, volume: 75 },
  { month: "Aug", revenue: 52000, volume: 79 },
  { month: "Sep", revenue: 61000, volume: 88 },
  { month: "Oct", revenue: 64000, volume: 92 },
  { month: "Nov", revenue: 58500, volume: 83 },
];

export default function SupplierDashboardPage() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<DashboardOrder[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) => {
        const updates = [...prev];
        const randomIndex = Math.floor(Math.random() * updates.length);
        const order = updates[randomIndex];

        if (!order) {
          return prev;
        }

        const nextStatus = getNextStatus(order.status);
        updates[randomIndex] = { ...order, status: nextStatus };

        const message =
          nextStatus === "fulfilled"
            ? t("home.supplier.dashboard.notifications.orderFulfilled").replace(
                "{id}",
                order.id
              )
            : t("home.supplier.dashboard.notifications.orderUpdated")
                .replace("{id}", order.id)
                .replace(
                  "{status}",
                  t(`home.supplier.dashboard.status.${nextStatus}`)
                );

        setNotifications((prevNotifications) => {
          const next = [message, ...prevNotifications];
          return next.slice(0, 4);
        });

        return updates;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const metrics = useMemo(() => {
    const totalProducts = INITIAL_PRODUCTS.length;
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;
    const revenue = orders
      .filter((order) => order.status === "fulfilled")
      .reduce((sum, order) => sum + order.total, 0);
    const processingOrders = orders.filter(
      (order) => order.status === "processing"
    ).length;

    return [
      {
        id: "metric-products",
        label: t("home.supplier.dashboard.metrics.totalProducts"),
        value: totalProducts,
        description: t("home.supplier.dashboard.metrics.totalProductsDesc"),
        icon: Package,
        color: "from-blue-500 to-blue-600",
      },
      {
        id: "metric-pending",
        label: t("home.supplier.dashboard.metrics.pendingOrders"),
        value: pendingOrders,
        description: t("home.supplier.dashboard.metrics.pendingOrdersDesc"),
        icon: ShoppingBag,
        color: "from-amber-500 to-amber-600",
      },
      {
        id: "metric-processing",
        label: t("home.supplier.dashboard.metrics.inProcessing"),
        value: processingOrders,
        description: t("home.supplier.dashboard.metrics.inProcessingDesc"),
        icon: TrendingUp,
        color: "from-violet-500 to-violet-600",
      },
      {
        id: "metric-revenue",
        label: t("home.supplier.dashboard.metrics.revenue30d"),
        value: Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(revenue),
        description: t("home.supplier.dashboard.metrics.revenue30dDesc"),
        icon: DollarSign,
        color: "from-emerald-500 to-emerald-600",
      },
    ];
  }, [orders, t]);

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort(
          (a, b) =>
            new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
        )
        .slice(0, 5),
    [orders]
  );

  return (
    <DashboardGate requiredPlan="supplier">
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <MobileDashboardNav role="supplier" />

        <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
          <header className="mx-auto w-full max-w-7xl">
            <Breadcrumb />

            <MotionWrapper variant="fade-up" className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.supplier.dashboard.title")}
                </h1>
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {t("home.supplier.dashboard.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/supplier/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 dark:bg-primary-600 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Package className="h-4 w-4" />
                  {t("home.supplier.dashboard.buttons.addProduct")}
                </Link>
                <Link
                  href="/supplier/orders"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 dark:border-primary-900/50 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition-all hover:bg-primary-500 dark:hover:bg-primary-600/30"
                >
                  {t("home.supplier.dashboard.buttons.reviewOrders")}
                </Link>
              </div>
            </MotionWrapper>

            {notifications.length > 0 && (
              <MotionWrapper variant="fade-up" delay={0.1} className="mt-6 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">
                    {t("home.supplier.dashboard.notifications.liveUpdates")}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {notifications.map((note, index) => (
                      <span
                        key={`${note}-${index}`}
                        className="rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            )}
          </header>

          <section className="mx-auto grid w-full max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <MotionWrapper
                  key={metric.id}
                  variant="scale-up"
                  delay={0.1 + index * 0.05}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`rounded-xl bg-gradient-to-br ${metric.color} p-3`}
                    >
                      <Icon className="h-5 w-5 text-neutral-900 dark:text-neutral-200" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {metric.description}
                  </p>
                </MotionWrapper>
              );
            })}
          </section>

          <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[2fr_1fr]">
            <MotionWrapper variant="slide-right" delay={0.2} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                    {t("home.supplier.dashboard.sections.salesTrend")}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {t("home.supplier.dashboard.sections.salesTrendDesc")}
                  </p>
                </div>
                <Link
                  href="/supplier/analytics"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("home.supplier.dashboard.buttons.viewAnalytics")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </header>
              <div className="h-72">
                <SalesChart
                  data={SALES_TREND}
                  dataKey="revenue"
                  xKey="month"
                  series={[
                    { name: "revenue", color: "#2563eb" },
                    { name: "volume", color: "#0ea5e9" },
                  ]}
                  currency
                />
              </div>
            </MotionWrapper>

            <MotionWrapper variant="slide-left" delay={0.3} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
              <header>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.supplier.dashboard.sections.productHealth")}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {t("home.supplier.dashboard.sections.productHealthDesc")}
                </p>
              </header>
              <ul className="space-y-3">
                {INITIAL_PRODUCTS.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 block">
                        {product.name}
                      </span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        {t("home.supplier.dashboard.table.status")}:{" "}
                        <span className="capitalize">
                          {t(
                            `home.supplier.dashboard.status.${product.status}`
                          )}
                        </span>
                      </span>
                    </div>
                    <Link
                      href="/supplier/products"
                      className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t("home.supplier.dashboard.buttons.manage")}
                    </Link>
                  </li>
                ))}
              </ul>
            </MotionWrapper>
          </section>

          <MotionWrapper variant="fade-up" delay={0.4} className="mx-auto w-full max-w-7xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.supplier.dashboard.sections.recentOrders")}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {t("home.supplier.dashboard.sections.recentOrdersDesc")}
                </p>
              </div>
              <Link
                href="/supplier/orders"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("home.supplier.dashboard.buttons.viewAllOrders")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </header>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-sm text-center">
                <thead>
                  <tr className="text-center">
                    <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                      {t("home.supplier.dashboard.table.order")}
                    </th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                      {t("home.supplier.dashboard.table.customer")}
                    </th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                      {t("home.supplier.dashboard.table.total")}
                    </th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                      {t("home.supplier.dashboard.table.status")}
                    </th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                      {t("home.supplier.dashboard.table.placed")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <td className="py-3 font-semibold text-neutral-900 dark:text-neutral-200">
                        {order.id}
                      </td>
                      <td className="py-3 text-neutral-900 dark:text-neutral-200">
                        {order.customer}
                      </td>
                      <td className="py-3 text-neutral-900 dark:text-neutral-200">
                        {order.total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 text-neutral-900 dark:text-neutral-200 text-xs">
                        {new Date(order.placedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MotionWrapper>
        </main>
      </div>
    </DashboardGate>
  );
}

function StatusBadge({ status }: { status: DashboardOrderStatus }) {
  const { t } = useLanguage();
  const config: Record<DashboardOrderStatus, string> = {
    pending:
      "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    processing:
      "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    fulfilled:
      "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
  };

  const label: Record<DashboardOrderStatus, string> = {
    pending: t("home.supplier.dashboard.status.pending"),
    processing: t("home.supplier.dashboard.status.processing"),
    fulfilled: t("home.supplier.dashboard.status.fulfilled"),
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config[status]}`}
    >
      {label[status]}
    </span>
  );
}

function getNextStatus(status: DashboardOrderStatus): DashboardOrderStatus {
  if (status === "pending") return "processing";
  if (status === "processing") return "fulfilled";
  return "fulfilled";
}
