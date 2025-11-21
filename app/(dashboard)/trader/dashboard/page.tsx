"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Store, Users, ShoppingCart, TrendingUp, ArrowRight, Inbox } from "lucide-react";

import { SalesChart } from "../../../../components/charts/sales-chart";
import { DashboardGate } from "../../../../components/dashboard/dashboard-gate";
import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";

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
              ? `${item.product} restocked by ${delta}`
              : `${item.product} sold ${Math.abs(delta)} units`;
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
        label: "Active Sub-Stores",
        value: totalStores,
        description: "Manage customized assortments",
        icon: Store,
        color: "from-blue-500 to-blue-600",
      },
      {
        id: "metric-suppliers",
        label: "Integrated Suppliers",
        value: liveSuppliers,
        description: "Analytics tracked for each",
        icon: Users,
        color: "from-violet-500 to-violet-600",
      },
      {
        id: "metric-pending",
        label: "Pending Orders",
        value: pendingOrders,
        description: "Awaiting supplier confirmation",
        icon: ShoppingCart,
        color: "from-amber-500 to-amber-600",
      },
      {
        id: "metric-spend",
        label: "Spend (30d)",
        value: totalSpend.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }),
        description: "Across all sourcing channels",
        icon: TrendingUp,
        color: "from-emerald-500 to-emerald-600",
      },
    ];
  }, [orders]);

  return (
    <DashboardGate requiredPlan="trader">
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <MobileDashboardNav role="trader" />

        <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
          <header className="mx-auto w-full max-w-7xl">
            <Breadcrumb />
            
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">Trader Dashboard</h1>
                <p className="mt-1 text-neutral-900 dark:text-neutral-200">Manage your stores and inventory</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/trader/store"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 dark:bg-primary-600 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Store className="h-4 w-4" />
                  Create Sub-Store
                </Link>
                <Link
                  href="/trader/orders"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 dark:border-primary-900/50 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition-all hover:bg-primary-50 dark:hover:bg-primary-950/30"
                >
                  Review Orders
                </Link>
              </div>
            </div>

            {notifications.length > 0 && (
              <aside className="mt-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-200">Real-time inventory updates:</span>
                  <div className="flex flex-wrap gap-2">
                    {notifications.map((note, index) => (
                      <span
                        key={`${note}-${index}`}
                        className="rounded-full bg-success-100 dark:bg-success-900/50 px-3 py-1 text-xs font-medium text-success-700 dark:text-success-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </header>

          <section className="mx-auto grid w-full max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <article
                  key={metric.id}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-xl bg-gradient-to-br ${metric.color} p-3`}>
                      <Icon className="h-5 w-5 text-neutral-900 dark:text-neutral-200" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-neutral-900 dark:text-neutral-200">
                    {metric.description}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.7fr_1fr]">
            <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                    Spend Trend
                  </h2>
                  <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                    Month-over-month spend vs profit margins
                  </p>
                </div>
                <Link
                  href="/trader/inventory"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Manage Inventory
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
            </article>

            <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <header>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  Supplier  Contribution
                </h2>
                <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                  Share of revenue influenced by each partner
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
                      <p className="text-xs text-neutral-900 dark:text-neutral-200 mt-0.5">
                        View contractual terms & lead times
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {supplier.contribution}%
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.5fr_1fr]">
            <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                    Latest Sourcing Orders
                  </h2>
                  <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                    Track fulfillment and communication with suppliers
                  </p>
                </div>
                <Link
                  href="/trader/orders"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View All Orders
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </header>

              <div className="overflow-x-auto -mx-6 px-6">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Order</th>
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Store</th>
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Supplier</th>
                      <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Value</th>
                      <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                        <td className="py-3 pr-6 font-semibold text-neutral-900 dark:text-neutral-200">
                          {order.id}
                        </td>
                        <td className="py-3 pr-6 text-neutral-900 dark:text-neutral-200">#{order.storeId}</td>
                        <td className="py-3 pr-6 text-neutral-900 dark:text-neutral-200">{order.supplier}</td>
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
            </article>

            <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <header>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  Inventory Snapshot
                </h2>
                <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                  Auto-refreshing stock levels across suppliers
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
                      <p className="text-xs text-neutral-900 dark:text-neutral-200 mt-0.5">SKU {item.sku}</p>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        item.stock < 100 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {item.stock} units
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </main>
      </div>
    </DashboardGate>
  );
}

function StatusBadge({ status }: { status: TraderOrderStatus }) {
  const config: Record<TraderOrderStatus, string> = {
    pending: "bg-warning-100 dark:bg-warning-950/50 text-warning-700 dark:text-warning-400 border-warning-200 dark:border-warning-900/50",
    confirmed: "bg-success-100 dark:bg-success-950/50 text-success-700 dark:text-success-400 border-success-200 dark:border-success-900/50",
    "in-transit": "bg-info-100 dark:bg-info-950/50 text-info-700 dark:text-info-400 border-info-200 dark:border-info-900/50",
    delivered: "bg-success-100 dark:bg-success-950/50 text-success-700 dark:text-success-400 border-success-200 dark:border-success-900/50",
  };

  const label: Record<TraderOrderStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    "in-transit": "In Transit",
    delivered: "Delivered",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config[status]}`}
    >
      {label[status]}
    </span>
  );
}
