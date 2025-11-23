"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Store,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  Inbox,
} from "lucide-react";

import { SalesChart } from "../../../../components/charts/sales-chart";
import { DashboardGate } from "../../../../components/dashboard/dashboard-gate";
import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import { useLanguage } from "../../../../components/providers/language-provider";
import { MotionWrapper } from "../../../../components/ui/motion-wrapper";

type TraderOrderStatus = "pending" | "confirmed" | "in-transit" | "delivered";

interface TraderOrder {
  id: string;
  storeId: string;
  supplier: string;
  value: number;
  status: TraderOrderStatus;
  placedAt: string;
}

interface SupplierSummary {
  supplier: string;
  contribution: number;
}

const INITIAL_ORDERS: TraderOrder[] = [
  {
    id: "ord-t-1021",
    storeId: "store-1",
    supplier: "Aurora Commodities",
    value: 12800,
    status: "pending",
    placedAt: "2025-11-09T08:15:00Z",
  },
  {
    id: "ord-t-1018",
    storeId: "store-2",
    supplier: "Evergreen Supplies",
    value: 7600,
    status: "confirmed",
    placedAt: "2025-11-07T12:40:00Z",
  },
  {
    id: "ord-t-1014",
    storeId: "store-1",
    supplier: "Zenith Devices",
    value: 18500,
    status: "in-transit",
    placedAt: "2025-11-06T09:32:00Z",
  },
  {
    id: "ord-t-1009",
    storeId: "store-3",
    supplier: "Pulse Medical",
    value: 9800,
    status: "delivered",
    placedAt: "2025-11-03T16:10:00Z",
  },
];

const SUPPLIER_BREAKDOWN: SupplierSummary[] = [
  { supplier: "Aurora Commodities", contribution: 38 },
  { supplier: "Zenith Devices", contribution: 26 },
  { supplier: "Evergreen Supplies", contribution: 18 },
  { supplier: "Pulse Medical", contribution: 12 },
  { supplier: "Harbor Textiles", contribution: 6 },
];

const SALES_TREND = [
  { month: "Jun", value: 32000, margin: 5100 },
  { month: "Jul", value: 34800, margin: 5600 },
  { month: "Aug", value: 37400, margin: 6100 },
  { month: "Sep", value: 40200, margin: 6550 },
  { month: "Oct", value: 43800, margin: 7200 },
  { month: "Nov", value: 39200, margin: 6800 },
];

const INITIAL_INVENTORY = [
  { id: "inv-1", sku: "ORG-001", product: "Organic Arabica Roast", stock: 180 },
  { id: "inv-2", sku: "SEN-441", product: "Cold Chain Sensors", stock: 95 },
  {
    id: "inv-3",
    sku: "PKG-205",
    product: "Sustainable Packaging Kit",
    stock: 260,
  },
  { id: "inv-4", sku: "MED-302", product: "Nutraceutical Blends", stock: 120 },
];

export default function TraderDashboardPage() {
  const { t } = useLanguage();
  const [orders] = useState<TraderOrder[]>(INITIAL_ORDERS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInventory((prev) => {
        const updates = [...prev];
        const index = Math.floor(Math.random() * updates.length);
        const item = updates[index];
        if (!item) {
          return prev;
        }

        const delta = Math.random() > 0.5 ? 10 : -8;
        const nextStock = Math.max(0, item.stock + delta);
        updates[index] = { ...item, stock: nextStock };

        setNotifications((prevNotes) => {
          const message =
            delta > 0
              ? t("home.trader.dashboard.notifications.restocked").replace("{product}", item.product).replace("{delta}", delta.toString())
              : t("home.trader.dashboard.notifications.sold").replace("{product}", item.product).replace("{delta}", Math.abs(delta).toString());
          return [message, ...prevNotes].slice(0, 4);
        });

        return updates;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const metrics = useMemo(() => {
    const totalStores = 3;
    const liveSuppliers = SUPPLIER_BREAKDOWN.length;
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;
    const totalSpend = orders.reduce((sum, order) => sum + order.value, 0);

    return [
      {
        id: "metric-stores",
        label: t("home.trader.dashboard.metrics.activeSubStores"),
        value: totalStores,
        description: t("home.trader.dashboard.metrics.activeSubStoresDesc"),
        icon: Store,
        color: "from-blue-500 to-blue-600",
      },
      {
        id: "metric-suppliers",
        label: t("home.trader.dashboard.metrics.integratedSuppliers"),
        value: liveSuppliers,
        description: t("home.trader.dashboard.metrics.integratedSuppliersDesc"),
        icon: Users,
        color: "from-violet-500 to-violet-600",
      },
      {
        id: "metric-pending",
        label: t("home.trader.dashboard.metrics.pendingOrders"),
        value: pendingOrders,
        description: t("home.trader.dashboard.metrics.pendingOrdersDesc"),
        icon: ShoppingCart,
        color: "from-amber-500 to-amber-600",
      },
      {
        id: "metric-spend",
        label: t("home.trader.dashboard.metrics.spend30d"),
        value: totalSpend.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }),
        description: t("home.trader.dashboard.metrics.spend30dDesc"),
        icon: TrendingUp,
        color: "from-emerald-500 to-emerald-600",
      },
    ];
  }, [orders, t]);

  return (
    <DashboardGate requiredPlan="trader">
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <MobileDashboardNav role="trader" />

        <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
          <header className="mx-auto w-full max-w-7xl">
            <Breadcrumb />

            <MotionWrapper variant="fade-up" className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.dashboard.title")}
                </h1>
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {t("home.trader.dashboard.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/trader/store"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 dark:bg-primary-600 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Store className="h-4 w-4" />
                  {t("home.trader.dashboard.buttons.createSubStore")}
                </Link>
                <Link
                  href="/trader/orders"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 dark:border-primary-900/50 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition-all hover:bg-primary-50 dark:hover:bg-primary-950/30"
                >
                  {t("home.trader.dashboard.buttons.reviewOrders")}
                </Link>
              </div>
            </MotionWrapper>

            {notifications.length > 0 && (
              <MotionWrapper variant="fade-up" delay={0.1} className="mt-6 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">
                    {t("home.trader.dashboard.notifications.realTimeUpdates")}
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
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm hover:shadow-lg transition-all text-center"
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

          <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.7fr_1fr]">
            <MotionWrapper variant="slide-right" delay={0.2} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                    {t("home.trader.dashboard.sections.spendTrend")}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {t("home.trader.dashboard.sections.spendTrendDesc")}
                  </p>
                </div>
                <Link
                  href="/trader/inventory"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("home.trader.dashboard.buttons.manageInventory")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </header>
              <div className="h-72">
                <SalesChart
                  data={SALES_TREND}
                  dataKey="value"
                  xKey="month"
                  series={[
                    { name: "value", color: "#2563eb" },
                    { name: "margin", color: "#22c55e" },
                  ]}
                  currency
                />
              </div>
            </MotionWrapper>

            <MotionWrapper variant="slide-left" delay={0.3} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
              <header>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.dashboard.sections.supplierContribution")}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {t("home.trader.dashboard.sections.supplierContributionDesc")}
                </p>
              </header>
              <ul className="space-y-3">
                {SUPPLIER_BREAKDOWN.map((supplier) => (
                  <li
                    key={supplier.supplier}
                    className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                        {supplier.supplier}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {t("home.trader.dashboard.sections.viewTerms")}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {supplier.contribution}%
                    </span>
                  </li>
                ))}
              </ul>
            </MotionWrapper>
          </section>

          <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.5fr_1fr]">
            <MotionWrapper variant="fade-up" delay={0.4} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                    {t("home.trader.dashboard.sections.latestOrders")}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {t("home.trader.dashboard.sections.latestOrdersDesc")}
                  </p>
                </div>
                <Link
                  href="/trader/orders"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("home.trader.dashboard.buttons.viewAllOrders")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </header>

              <div className="overflow-x-auto -mx-6 px-6">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                        {t("home.trader.dashboard.table.order")}
                      </th>
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                        {t("home.trader.dashboard.table.store")}
                      </th>
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                        {t("home.trader.dashboard.table.supplier")}
                      </th>
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                        {t("home.trader.dashboard.table.value")}
                      </th>
                      <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                        {t("home.trader.dashboard.table.status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {orders.slice(0, 5).map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        <td className="py-3 pr-6 font-semibold text-neutral-900 dark:text-neutral-200">
                          {order.id}
                        </td>
                        <td className="py-3 pr-6 text-neutral-900 dark:text-neutral-200">
                          #{order.storeId}
                        </td>
                        <td className="py-3 pr-6 text-neutral-900 dark:text-neutral-200">
                          {order.supplier}
                        </td>
                        <td className="py-3 pr-6 text-neutral-900 dark:text-neutral-200">
                          {order.value.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="py-3">
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.5} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
              <header>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.dashboard.sections.inventorySnapshot")}
                </h2>
                <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                  {t("home.trader.dashboard.sections.inventorySnapshotDesc")}
                </p>
              </header>
              <ul className="space-y-3">
                {inventory.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                        {item.product}
                      </p>
                      <p className="text-xs text-neutral-900 dark:text-neutral-200 mt-0.5">
                        {t("home.trader.dashboard.sku")} {item.sku}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        item.stock < 100
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {t("home.trader.dashboard.units").replace("{count}", item.stock.toString())}
                    </span>
                  </li>
                ))}
              </ul>
            </MotionWrapper>
          </section>
        </main>
      </div>
    </DashboardGate>
  );
}

function StatusBadge({ status }: { status: TraderOrderStatus }) {
  const { t } = useLanguage();
  const config: Record<TraderOrderStatus, string> = {
    pending:
      "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    confirmed:
      "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    "in-transit":
      "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    delivered:
      "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
  };

  const label: Record<TraderOrderStatus, string> = {
    pending: t("home.trader.dashboard.status.pending"),
    confirmed: t("home.trader.dashboard.status.confirmed"),
    "in-transit": t("home.trader.dashboard.status.inTransit"),
    delivered: t("home.trader.dashboard.status.delivered"),
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config[status]}`}
    >
      {label[status]}
    </span>
  );
}
