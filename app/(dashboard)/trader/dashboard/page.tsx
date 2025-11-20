"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { SalesChart } from "../../../../components/charts/sales-chart";
import { DashboardGate } from "../../../../components/dashboard/dashboard-gate";
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
        label: "Active sub-stores",
        value: totalStores,
        description: "Manage customized assortments",
      },
      {
        id: "metric-suppliers",
        label: "Integrated suppliers",
        value: liveSuppliers,
        description: "Analytics tracked for each",
      },
      {
        id: "metric-pending",
        label: "Pending orders",
        value: pendingOrders,
        description: "Awaiting supplier confirmation",
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
      },
    ];
  }, [orders]);

  return (
    <DashboardGate requiredPlan="trader">
      <main className="flex min-h-screen flex-col gap-6 bg-neutral-50 dark:bg-neutral-50 px-4 py-8">
        <header className="mx-auto flex w-full max-w-7xl flex-col">
          <Breadcrumb />
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div className="flex gap-3 mb-4">
              <Link
                href="/trader/store"
                className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-neutral-50 dark:text-neutral-50 shadow-sm hover:bg-blue-800 dark:hover:bg-blue-800"
              >
                Create sub-store
              </Link>
              <Link
                href="/trader/orders"
                className="inline-flex items-center rounded-lg border border-blue-700 dark:border-blue-700 bg-neutral-50 dark:bg-neutral-50 px-4 py-2 text-sm font-semibold text-blue-400 dark:text-blue-400 hover:bg-blue-950 dark:hover:bg-blue-950"
              >
                Review orders
              </Link>
            </div>
          </div>

          {notifications.length > 0 && (
            <aside className="flex flex-col gap-2 rounded-2xl border border-emerald-700 dark:border-emerald-700 bg-emerald-950 dark:bg-emerald-950 px-4 py-4 text-sm text-emerald-400 dark:text-emerald-400 md:flex-row md:items-center">
              <span className="font-semibold">
                Real-time inventory updates:
              </span>
              <div className="flex flex-wrap gap-2">
                {notifications.map((note, index) => (
                  <span
                    key={`${note}-${index}`}
                    className="rounded-full bg-emerald-950 dark:bg-emerald-950 px-3 py-1 text-xs font-medium text-emerald-400 dark:text-emerald-400"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </aside>
          )}
        </header>

        <section className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.id}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-5 shadow-sm text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-700">
                {metric.label}
              </p>
              <p className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-neutral-900">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
                {metric.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.7fr_1fr]">
          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                  Spend trend
                </h2>
                <p className="text-md text-neutral-700 dark:text-neutral-700">
                  Month-over-month spend vs profit margins
                </p>
              </div>
              <Link
                href="/trader/inventory"
                className="text-sm font-semibold text-blue-400 hover:underline"
              >
                Manage inventory →
              </Link>
            </header>
            <div className="mt-6 h-72">
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

          <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
            <header className="gap-1 flex flex-col">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                Supplier contribution
              </h2>
              <p className="text-md text-neutral-700 dark:text-neutral-700">
                Share of revenue influenced by each partner
              </p>
            </header>
            <ul className="space-y-3">
              {SUPPLIER_BREAKDOWN.map((supplier) => (
                <li
                  key={supplier.supplier}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-4 py-3"
                >
                  <div className="gap-1 flex flex-col">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">
                      {supplier.supplier}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-700">
                      Login to view contractual terms & lead times
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-400 dark:text-blue-400">
                    {supplier.contribution}%
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
            <header className="flex items-center justify-between">
              <div className="gap-1 flex flex-col">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-900">
                  Latest sourcing orders
                </h2>
                <p className="text-md text-neutral-700 dark:text-neutral-700">
                  Track fulfillment and communication with suppliers
                </p>
              </div>
              <Link
                href="/trader/orders"
                className="text-sm font-semibold text-blue-400 hover:underline"
              >
                View all orders
              </Link>
            </header>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-200 text-sm text-center">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-700">
                    <th className="py-3 pr-6">Order</th>
                    <th className="py-3 pr-6">Store</th>
                    <th className="py-3 pr-6">Supplier</th>
                    <th className="py-3 pr-6">Value</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-200">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="text-sm text-neutral-700 dark:text-neutral-700">
                      <td className="py-3 pr-6 font-semibold text-neutral-900 dark:text-neutral-900">
                        {order.id}
                      </td>
                      <td className="py-3 pr-6">#{order.storeId}</td>
                      <td className="py-3 pr-6">{order.supplier}</td>
                      <td className="py-3 pr-6">
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

          <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
            <header>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                Inventory snapshot
              </h2>
              <p className="text-md text-neutral-700 dark:text-neutral-700">
                Auto-refreshing stock levels across suppliers
              </p>
            </header>
            <ul className="space-y-3">
              {inventory.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-4 py-3"
                >
                  <div className="gap-1 flex flex-col">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">
                      {item.product}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-700">SKU {item.sku}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      item.stock < 100 ? "text-amber-400" : "text-emerald-400"
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
    </DashboardGate>
  );
}

function StatusBadge({ status }: { status: TraderOrderStatus }) {
  const config: Record<TraderOrderStatus, string> = {
    pending: "bg-amber-950 text-amber-400 border-amber-700",
    confirmed: "bg-blue-950 text-blue-400 border-blue-700",
    "in-transit": "bg-violet-950 text-violet-400 border-violet-700",
    delivered: "bg-emerald-950 text-emerald-400 border-emerald-700",
  };

  const label: Record<TraderOrderStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    "in-transit": "In transit",
    delivered: "Delivered",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${config[status]}`}
    >
      {label[status]}
    </span>
  );
}
