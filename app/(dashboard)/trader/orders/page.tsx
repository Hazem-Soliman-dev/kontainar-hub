"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Filter, DollarSign } from "lucide-react";

import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";

type TraderOrderStatus = "pending" | "confirmed" | "in-transit" | "delivered" | "cancelled";

interface TraderOrder {
  id: string;
  storeId: string;
  supplier: string;
  products: string;
  quantity: number;
  value: number;
  status: TraderOrderStatus;
  eta: string;
  createdAt: string;
}

const INITIAL_ORDERS: TraderOrder[] = [
  {
    id: "ord-t-1021",
    storeId: "store-1",
    supplier: "Aurora Commodities",
    products: "Organic Arabica Roast",
    quantity: 140,
    value: 12800,
    status: "pending",
    eta: "2025-11-14",
    createdAt: "2025-11-09T08:15:00Z",
  },
  {
    id: "ord-t-1018",
    storeId: "store-2",
    supplier: "Evergreen Supplies",
    products: "Sustainable Packaging Kit",
    quantity: 220,
    value: 7600,
    status: "confirmed",
    eta: "2025-11-13",
    createdAt: "2025-11-07T12:40:00Z",
  },
  {
    id: "ord-t-1014",
    storeId: "store-1",
    supplier: "Zenith Devices",
    products: "Smart Cold Chain Sensors",
    quantity: 90,
    value: 18500,
    status: "in-transit",
    eta: "2025-11-12",
    createdAt: "2025-11-06T09:32:00Z",
  },
  {
    id: "ord-t-1009",
    storeId: "store-3",
    supplier: "Pulse Medical",
    products: "Nutraceutical Blends",
    quantity: 180,
    value: 9800,
    status: "delivered",
    eta: "2025-11-07",
    createdAt: "2025-11-03T16:10:00Z",
  },
  {
    id: "ord-t-1007",
    storeId: "store-2",
    supplier: "Harbor Textiles",
    products: "Technical Denim Roll",
    quantity: 65,
    value: 15700,
    status: "cancelled",
    eta: "2025-11-05",
    createdAt: "2025-11-02T11:55:00Z",
  },
];

export default function TraderOrdersPage() {
  const [orders, setOrders] = useState<TraderOrder[]>(INITIAL_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState<TraderOrderStatus | "all">(
    "all"
  );
  const [updatingOrders, setUpdatingOrders] = useState<string[]>([]);

  const stats = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc.total += 1;
        acc.value += order.value;
        acc[order.status] = (acc[order.status] ?? 0) + 1;
        return acc;
      },
      {
        total: 0,
        value: 0,
        pending: 0,
        confirmed: 0,
        "in-transit": 0,
        delivered: 0,
        cancelled: 0,
      } as Record<string, number>
    );
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (selectedStatus === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === selectedStatus);
  }, [orders, selectedStatus]);

  const handleStatusChange = async (
    id: string,
    status: TraderOrderStatus
  ) => {
    setUpdatingOrders((prev) => [...prev, id]);
    const snapshot = orders;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );

    try {
      await simulateRequest();
    } catch (error) {
      console.error(error);
      setOrders(snapshot);
    } finally {
      setUpdatingOrders((prev) => prev.filter((orderId) => orderId !== id));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <MobileDashboardNav role="trader" />

      <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
        <header className="mx-auto w-full max-w-7xl">
          <Breadcrumb />
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">Orders</h1>
              <p className="mt-1 text-neutral-900 dark:text-neutral-200">Track and manage sourcing orders</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-neutral-900 px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-2.5">
                  <DollarSign className="h-5 w-5 text-neutral-900 dark:text-neutral-200" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-900 dark:text-neutral-200">Total Spend</p>
                  <p className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                    {stats.value.toLocaleString("en-US", {
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-neutral-900 dark:text-neutral-200">
              <span className="font-semibold">Total: {stats.total}</span>
              <span>Pending: {stats.pending}</span>
              <span>Confirmed: {stats.confirmed}</span>
              <span>In transit: {stats["in-transit"]}</span>
              <span>Delivered: {stats.delivered}</span>
              <span>Cancelled: {stats.cancelled}</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-900 dark:text-neutral-200" />
              <select
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value as TraderOrderStatus | "all")
                }
                className="rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-transit">In transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto -mx-6 px-6">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Order</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Store</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Supplier</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Products</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Quantity</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Value</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">ETA</th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-4 pr-6">
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                          {order.id}
                        </p>
                        <p className="text-xs text-neutral-900 dark:text-neutral-200 mt-0.5">
                          Placed {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">#{order.storeId}</td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">{order.supplier}</td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">{order.products}</td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">{order.quantity}</td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">
                      {order.value.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="py-4 pr-6 text-xs text-neutral-900 dark:text-neutral-200">
                      {new Date(order.eta).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col gap-2">
                        <select
                          value={order.status}
                          onChange={(event) =>
                            handleStatusChange(
                              order.id,
                              event.target.value as TraderOrderStatus
                            )
                          }
                          disabled={updatingOrders.includes(order.id)}
                          className="rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-xs uppercase tracking-wide text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-transit">In transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {updatingOrders.includes(order.id) && (
                          <span className="text-xs text-primary-700 dark:text-primary-400">
                            Syncing with supplier…
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <p className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-8 text-center text-sm text-neutral-900 dark:text-neutral-200">
              No orders in this status. Adjust the filter to view other orders.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function simulateRequest(failureProbability = 0.1) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureProbability) {
        reject(new Error("Unable to sync changes. Please retry."));
      } else {
        resolve();
      }
    }, 700);
  });
}
