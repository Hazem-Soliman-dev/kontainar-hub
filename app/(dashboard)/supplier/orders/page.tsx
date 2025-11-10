"use client";

import { useEffect, useMemo, useState } from "react";

import { useRealtimeOrders } from "../../../../hooks/use-realtime-orders";
import { ordersBus } from "../../../../lib/realtime/orders-bus";
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
    <main className="flex min-h-screen flex-col gap-10 bg-slate-50 px-4 py-10">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Order operations
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Manage fulfillment workflow
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Track order status, confirm shipments, and maintain buyer
            communication.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            30-day revenue
          </p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.revenue.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {feedback && (
          <div
            className={[
              "mb-4 rounded-xl px-4 py-3 text-sm",
              feedback.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-red-200 bg-red-50 text-red-700",
            ].join(" ")}
          >
            {feedback.message}
          </div>
        )}
        {isError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load orders. Refresh or try again shortly.
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4 text-sm text-slate-600">
            <span>Total orders: {stats.totalOrders}</span>
            <span>Pending: {stats.pending}</span>
            <span>Processing: {stats.processing}</span>
            <span>Fulfilled: {stats.fulfilled}</span>
          </div>
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as OrderStatus | "all")
            }
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-6">Order</th>
                <th className="py-3 pr-6">Buyer</th>
                <th className="py-3 pr-6">Product</th>
                <th className="py-3 pr-6">Quantity</th>
                <th className="py-3 pr-6">Total</th>
                <th className="py-3 pr-6">Requested ship</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="animate-pulse">
                      <td className="py-4 pr-6">
                        <div className="h-4 w-24 rounded bg-slate-200/70" />
                      </td>
                      <td className="py-4 pr-6">
                        <div className="h-4 w-32 rounded bg-slate-200/70" />
                      </td>
                      <td className="py-4 pr-6">
                        <div className="h-4 w-36 rounded bg-slate-200/70" />
                      </td>
                      <td className="py-4 pr-6">
                        <div className="h-4 w-16 rounded bg-slate-200/70" />
                      </td>
                      <td className="py-4 pr-6">
                        <div className="h-4 w-20 rounded bg-slate-200/70" />
                      </td>
                      <td className="py-4 pr-6">
                        <div className="h-4 w-28 rounded bg-slate-200/70" />
                      </td>
                      <td className="py-4 pr-6">
                        <div className="h-8 w-32 rounded bg-slate-200/70" />
                      </td>
                    </tr>
                  ))
                : filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="align-top text-sm text-slate-700"
                    >
                      <td className="py-4 pr-6 font-semibold text-slate-900">
                        {order.id}
                      </td>
                      <td className="py-4 pr-6">{order.buyer}</td>
                      <td className="py-4 pr-6">{order.product}</td>
                      <td className="py-4 pr-6">{order.quantity}</td>
                      <td className="py-4 pr-6">
                        {order.total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="py-4 pr-6 text-xs text-slate-500">
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
                            className="rounded-md border border-slate-200 px-3 py-2 text-xs uppercase tracking-wide text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            disabled={updatingIds.includes(order.id)}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="fulfilled">Fulfilled</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <div className="text-xs text-slate-400">
                            Updated{" "}
                            {new Date(order.updatedAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </div>
                          {updatingIds.includes(order.id) && (
                            <span className="text-xs text-blue-500">
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
          <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No orders in this status. Adjust the filter to view other orders.
          </p>
        )}
      </section>
    </main>
  );
}
