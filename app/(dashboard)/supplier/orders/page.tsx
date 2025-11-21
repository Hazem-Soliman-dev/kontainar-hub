"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingCart, Filter, DollarSign } from "lucide-react";

import { useRealtimeOrders } from "../../../../hooks/use-realtime-orders";
import { ordersBus } from "../../../../lib/realtime/orders-bus";
import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import type { OrderStatus } from "../../../../lib/mock/orders";

export default function SupplierOrdersPage() {
  const { orders, isLoading, isError, updateOrderStatus } = useRealtimeOrders();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [updatingIds, setUpdatingIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const unsubSuccess = ordersBus.on("orderUpdated", (order) => {
      setFeedback({
        type: "success",
        message: `Order ${order.id} synced successfully.`,
      });
    });

    const unsubError = ordersBus.on(
      "orderStatusFailed",
      ({ message, orderId }) => {
        setFeedback({
          type: "error",
          message: message ?? `Unable to update order ${orderId}.`,
        });
      }
    );

    return () => {
      unsubSuccess();
      unsubError();
    };
  }, []);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback(null);
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const stats = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc.totalOrders += 1;
        if (order.status === "pending") acc.pending += 1;
        if (order.status === "processing") acc.processing += 1;
        if (order.status === "fulfilled") {
          acc.fulfilled += 1;
          acc.revenue += order.total;
        }
        return acc;
      },
      { totalOrders: 0, pending: 0, processing: 0, fulfilled: 0, revenue: 0 }
    );
  }, [orders]);

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    setFeedback(null);
    setUpdatingIds((prev) => [...prev, orderId]);

    try {
      await updateOrderStatus(orderId, status);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to update order. Please retry.",
      });
    } finally {
      setUpdatingIds((prev) => prev.filter((id) => id !== orderId));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <MobileDashboardNav role="supplier" />

      <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
        <header className="mx-auto w-full max-w-7xl">
          <Breadcrumb />
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">Orders</h1>
              <p className="mt-1 text-neutral-900 dark:text-neutral-200">Manage and track your orders</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-neutral-900 px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5">
                  <DollarSign className="h-5 w-5 text-neutral-900 dark:text-neutral-200" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-900 dark:text-neutral-200">30-Day Revenue</p>
                  <p className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                    {stats.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto w-full max-w-7xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
          {feedback && (
            <div
              className={`mb-4 rounded-xl px-4 py-3 text-sm ${
                feedback.type === "success"
                  ? "border border-success-200 dark:border-success-900/50 bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400"
                  : "border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400"
              }`}
            >
              {feedback.message}
            </div>
          )}
          {isError && (
            <div className="mb-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              Unable to load orders. Refresh or try again shortly.
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-neutral-900 dark:text-neutral-200">
              <span className="font-semibold">Total: {stats.totalOrders}</span>
              <span>Pending: {stats.pending}</span>
              <span>Processing: {stats.processing}</span>
              <span>Fulfilled: {stats.fulfilled}</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-900 dark:text-neutral-200" />
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as OrderStatus | "all")
                }
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto -mx-6 px-6">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Order</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Buyer</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Product</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Quantity</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Total</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Ship Date</th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`skeleton-${index}`} className="animate-pulse">
                        <td className="py-4 pr-6">
                          <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </td>
                        <td className="py-4 pr-6">
                          <div className="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </td>
                        <td className="py-4 pr-6">
                          <div className="h-4 w-36 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </td>
                        <td className="py-4 pr-6">
                          <div className="h-4 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </td>
                        <td className="py-4 pr-6">
                          <div className="h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </td>
                        <td className="py-4 pr-6">
                          <div className="h-4 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </td>
                        <td className="py-4 pr-6">
                          <div className="h-8 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </td>
                      </tr>
                    ))
                  : filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        <td className="py-4 pr-6 font-semibold text-neutral-900 dark:text-neutral-200">
                          {order.id}
                        </td>
                        <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">{order.buyer}</td>
                        <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">{order.product}</td>
                        <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">{order.quantity}</td>
                        <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">
                          {order.total.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="py-4 pr-6 text-xs text-neutral-900 dark:text-neutral-200">
                          {new Date(order.expectedShipDate).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col gap-2">
                            <select
                              value={order.status}
                              onChange={(event) =>
                                handleStatusUpdate(
                                  order.id,
                                  event.target.value as OrderStatus
                                )
                              }
                              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-xs uppercase tracking-wide text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                              disabled={updatingIds.includes(order.id)}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="fulfilled">Fulfilled</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <div className="text-xs text-neutral-900 dark:text-neutral-200">
                              Updated{" "}
                              {new Date(order.updatedAt).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </div>
                            {updatingIds.includes(order.id) && (
                              <span className="text-xs text-primary-500 dark:text-primary-400">
                                Syncing changes…
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {!isLoading && filteredOrders.length === 0 && (
            <p className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-8 text-center text-sm text-neutral-900 dark:text-neutral-200">
              No orders in this status. Adjust the filter to view other orders.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
