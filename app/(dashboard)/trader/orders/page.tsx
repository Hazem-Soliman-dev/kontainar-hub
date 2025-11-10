'use client';

import { useMemo, useState } from 'react';

type TraderOrderStatus = 'pending' | 'confirmed' | 'in-transit' | 'delivered' | 'cancelled';

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
    id: 'ord-t-1021',
    storeId: 'store-1',
    supplier: 'Aurora Commodities',
    products: 'Organic Arabica Roast',
    quantity: 140,
    value: 12800,
    status: 'pending',
    eta: '2025-11-14',
    createdAt: '2025-11-09T08:15:00Z',
  },
  {
    id: 'ord-t-1018',
    storeId: 'store-2',
    supplier: 'Evergreen Supplies',
    products: 'Sustainable Packaging Kit',
    quantity: 220,
    value: 7600,
    status: 'confirmed',
    eta: '2025-11-13',
    createdAt: '2025-11-07T12:40:00Z',
  },
  {
    id: 'ord-t-1014',
    storeId: 'store-1',
    supplier: 'Zenith Devices',
    products: 'Smart Cold Chain Sensors',
    quantity: 90,
    value: 18500,
    status: 'in-transit',
    eta: '2025-11-12',
    createdAt: '2025-11-06T09:32:00Z',
  },
  {
    id: 'ord-t-1009',
    storeId: 'store-3',
    supplier: 'Pulse Medical',
    products: 'Nutraceutical Blends',
    quantity: 180,
    value: 9800,
    status: 'delivered',
    eta: '2025-11-07',
    createdAt: '2025-11-03T16:10:00Z',
  },
  {
    id: 'ord-t-1007',
    storeId: 'store-2',
    supplier: 'Harbor Textiles',
    products: 'Technical Denim Roll',
    quantity: 65,
    value: 15700,
    status: 'cancelled',
    eta: '2025-11-05',
    createdAt: '2025-11-02T11:55:00Z',
  },
];

export default function TraderOrdersPage() {
  const [orders, setOrders] = useState<TraderOrder[]>(INITIAL_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState<TraderOrderStatus | 'all'>(
    'all',
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
        'in-transit': 0,
        delivered: 0,
        cancelled: 0,
      } as Record<string, number>,
    );
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (selectedStatus === 'all') {
      return orders;
    }
    return orders.filter((order) => order.status === selectedStatus);
  }, [orders, selectedStatus]);

  const handleStatusChange = async (
    id: string,
    status: TraderOrderStatus,
  ) => {
    setUpdatingOrders((prev) => [...prev, id]);
    const snapshot = orders;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
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
    <main className="flex min-h-screen flex-col gap-10 bg-slate-50 px-4 py-10">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Sourcing workflow
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Manage purchase orders
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Coordinate with suppliers, ensure compliance, and track delivery statuses.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Total spend
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              {stats.value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <span>Total: {stats.total}</span>
            <span>Pending: {stats.pending}</span>
            <span>Confirmed: {stats.confirmed}</span>
            <span>In transit: {stats['in-transit']}</span>
            <span>Delivered: {stats.delivered}</span>
            <span>Cancelled: {stats.cancelled}</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as TraderOrderStatus | 'all')
            }
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-transit">In transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-6">Order</th>
                <th className="py-3 pr-6">Store</th>
                <th className="py-3 pr-6">Supplier</th>
                <th className="py-3 pr-6">Products</th>
                <th className="py-3 pr-6">Quantity</th>
                <th className="py-3 pr-6">Value</th>
                <th className="py-3 pr-6">ETA</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="align-top text-sm text-slate-700">
                  <td className="py-4 pr-6 font-semibold text-slate-900">
                    {order.id}
                    <p className="text-xs text-slate-400">
                      Placed {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 pr-6">#{order.storeId}</td>
                  <td className="py-4 pr-6">{order.supplier}</td>
                  <td className="py-4 pr-6">{order.products}</td>
                  <td className="py-4 pr-6">{order.quantity}</td>
                  <td className="py-4 pr-6">
                    {order.value.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </td>
                  <td className="py-4 pr-6 text-xs text-slate-500">
                    {new Date(order.eta).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-2">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          handleStatusChange(
                            order.id,
                            event.target.value as TraderOrderStatus,
                          )
                        }
                        disabled={updatingOrders.includes(order.id)}
                        className="rounded-md border border-slate-200 px-3 py-2 text-xs uppercase tracking-wide text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in-transit">In transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {updatingOrders.includes(order.id) && (
                        <span className="text-xs text-blue-500">
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
          <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No orders in this status. Adjust the filter to view other orders.
          </p>
        )}
      </section>
    </main>
  );
}

function simulateRequest(failureProbability = 0.1) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureProbability) {
        reject(new Error('Unable to sync changes. Please retry.'));
      } else {
        resolve();
      }
    }, 700);
  });
}

