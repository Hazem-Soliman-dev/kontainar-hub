"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { SalesChart } from "../../../../components/charts/sales-chart";
import { DashboardGate } from "../../../../components/dashboard/dashboard-gate";

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
            ? `Order ${order.id} fulfilled`
            : `Order ${order.id} updated to ${nextStatus}`;

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
        label: "Total Products",
        value: totalProducts,
        description: "Across all active categories",
      },
      {
        id: "metric-pending",
        label: "Pending Orders",
        value: pendingOrders,
        description: "Awaiting confirmation",
      },
      {
        id: "metric-processing",
        label: "In Processing",
        value: processingOrders,
        description: "Being prepared or shipped",
      },
      {
        id: "metric-revenue",
        label: "Revenue (30d)",
        value: Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(revenue),
        description: "From fulfilled orders",
      },
    ];
  }, [orders]);

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
      <main className="flex min-h-screen flex-col gap-10 bg-neutral-50 dark:bg-neutral-50 px-4 py-10">
        <header className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl">
                Welcome back, Aurora Commodities
              </h1>
              <p className="mt-2 text-md text-neutral-700 dark:text-neutral-700">
                Monitor orders, manage your catalog, and stay ahead of demand.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/supplier/products"
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-neutral-50 dark:text-neutral-50 shadow-sm hover:bg-blue-700 dark:hover:bg-blue-700"
              >
                Add new product
              </Link>
              <Link
                href="/supplier/orders"
                className="inline-flex items-center rounded-lg border border-blue-700 dark:border-blue-700 bg-neutral-50 dark:bg-neutral-50 px-4 py-2 text-sm font-semibold text-blue-400 dark:text-blue-400 hover:bg-blue-950 dark:hover:bg-blue-950"
              >
                Review orders
              </Link>
            </div>
          </div>

          {notifications.length > 0 && (
            <aside className="flex flex-col gap-2 rounded-2xl border border-blue-700 dark:border-blue-700 bg-neutral-50 dark:bg-neutral-50 px-4 py-4 text-sm text-blue-400 dark:text-blue-400 md:flex-row md:items-center">
              <span className="font-semibold text-md text-neutral-900 dark:text-neutral-900 text-center">Live order updates:</span>
              <div className="flex flex-wrap gap-2">
                {notifications.map((note, index) => (
                  <span
                    key={`${note}-${index}`}
                    className="rounded-full bg-blue-950 dark:bg-blue-950 px-3 py-1 text-md font-medium text-blue-400 dark:text-blue-400"
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

        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                  Sales trend
                </h2>
                <p className="text-sm text-neutral-700 dark:text-neutral-700">
                  Revenue and shipment volume (last 6 months)
                </p>
              </div>
              <Link
                href="/supplier/analytics"
                className="text-sm font-semibold text-blue-400 hover:underline"
              >
                View analytics →
              </Link>
            </header>
            <div className="mt-6 h-72">
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
          </article>

          <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
            <header>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                Product health
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-700">
                Quick view of catalog readiness
              </p>
            </header>
            <ul className="space-y-3">
              {INITIAL_PRODUCTS.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">
                      {product.name}
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-700">
                      Status: {product.status}
                    </span>
                  </div>
                  <Link
                    href="/supplier/products"
                    className="text-xs font-semibold uppercase tracking-wide text-blue-400"
                  >
                    Manage
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mx-auto w-full max-w-7xl rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                Recent orders
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-700">
                Monitor progress and next fulfillment steps
              </p>
            </div>
            <Link
              href="/supplier/orders"
              className="text-sm font-semibold text-blue-400 hover:underline"
            >
              View all orders
            </Link>
          </header>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-200 text-center text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-700">
                  <th className="py-3 pr-6">Order</th>
                  <th className="py-3 pr-6">Customer</th>
                  <th className="py-3 pr-6">Total</th>
                  <th className="py-3 pr-6">Status</th>
                  <th className="py-3">Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="text-sm text-neutral-700 dark:text-neutral-700">
                    <td className="py-3 pr-6 font-semibold text-neutral-900 dark:text-neutral-900">
                      {order.id}
                    </td>
                    <td className="py-3 pr-6">{order.customer}</td>
                    <td className="py-3 pr-6">
                      {order.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="py-3 pr-6">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-3 text-neutral-700 dark:text-neutral-700">
                      {new Date(order.placedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </DashboardGate>
  );
}

function StatusBadge({ status }: { status: DashboardOrderStatus }) {
  const config: Record<DashboardOrderStatus, string> = {
    pending: "bg-amber-100 dark:bg-amber-100 text-amber-800 dark:text-amber-800 border-amber-200 dark:border-amber-200",
    processing: "bg-blue-100 dark:bg-blue-100 text-blue-800 dark:text-blue-800 border-blue-200 dark:border-blue-200",
    fulfilled: "bg-emerald-100 dark:bg-emerald-100 text-emerald-800 dark:text-emerald-800 border-emerald-200 dark:border-emerald-200",
  };

  const label: Record<DashboardOrderStatus, string> = {
    pending: "Pending",
    processing: "Processing",
    fulfilled: "Fulfilled",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${config[status]}`}
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
