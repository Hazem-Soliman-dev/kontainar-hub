'use client';

import { useEffect, useMemo, useState } from 'react';

type InventoryStatus = 'healthy' | 'low' | 'critical';

interface InventoryItem {
  id: string;
  product: string;
  supplier: string;
  sku: string;
  storeId: string;
  stock: number;
  reorderPoint: number;
  status: InventoryStatus;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    product: 'Organic Arabica Roast',
    supplier: 'Aurora Commodities',
    sku: 'ORG-001',
    storeId: 'store-1',
    stock: 180,
    reorderPoint: 120,
    status: 'healthy',
  },
  {
    id: 'inv-02',
    product: 'Smart Cold Chain Sensors',
    supplier: 'Zenith Devices',
    sku: 'SEN-441',
    storeId: 'store-2',
    stock: 92,
    reorderPoint: 80,
    status: 'low',
  },
  {
    id: 'inv-03',
    product: 'Sustainable Packaging Kit',
    supplier: 'Evergreen Supplies',
    sku: 'PKG-205',
    storeId: 'store-3',
    stock: 240,
    reorderPoint: 150,
    status: 'healthy',
  },
  {
    id: 'inv-04',
    product: 'Nutraceutical Blends',
    supplier: 'Pulse Medical',
    sku: 'MED-302',
    storeId: 'store-1',
    stock: 110,
    reorderPoint: 140,
    status: 'critical',
  },
  {
    id: 'inv-05',
    product: 'Technical Denim Roll',
    supplier: 'Harbor Textiles',
    sku: 'DEN-019',
    storeId: 'store-2',
    stock: 75,
    reorderPoint: 60,
    status: 'healthy',
  },
];

export default function TraderInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [storeFilter, setStoreFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInventory((prev) => {
        const updates = prev.map((item) => {
          if (Math.random() > 0.35) {
            return item;
          }

          const delta = Math.random() > 0.5 ? 15 : -12;
          const nextStock = Math.max(0, item.stock + delta);
          const nextStatus =
            nextStock <= item.reorderPoint * 0.6
              ? 'critical'
              : nextStock <= item.reorderPoint
                ? 'low'
                : 'healthy';

          if (delta !== 0) {
            setNotifications((prevNotes) => {
              const message =
                delta > 0
                  ? `${item.product} replenished by ${delta} units`
                  : `${item.product} sold ${Math.abs(delta)} units`;
              return [message, ...prevNotes].slice(0, 4);
            });
          }

          return { ...item, stock: nextStock, status: nextStatus };
        });

        return updates;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const suppliers = useMemo(() => {
    return Array.from(new Set(inventory.map((item) => item.supplier)));
  }, [inventory]);

  const stores = useMemo(() => {
    return Array.from(new Set(inventory.map((item) => item.storeId)));
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const supplierMatch =
        supplierFilter === 'all' || item.supplier === supplierFilter;
      const storeMatch = storeFilter === 'all' || item.storeId === storeFilter;
      return supplierMatch && storeMatch;
    });
  }, [inventory, supplierFilter, storeFilter]);

  const totals = useMemo(() => {
    const totalStock = filteredInventory.reduce((sum, item) => sum + item.stock, 0);
    const critical = filteredInventory.filter(
      (item) => item.status === 'critical',
    ).length;
    const low = filteredInventory.filter((item) => item.status === 'low').length;
    const healthy = filteredInventory.filter(
      (item) => item.status === 'healthy',
    ).length;

    return {
      totalStock,
      critical,
      low,
      healthy,
    };
  }, [filteredInventory]);

  const handleAdjustReorder = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              reorderPoint: Math.max(20, item.reorderPoint + delta),
            }
          : item,
      ),
    );
  };

  const handleManualRestock = (id: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              stock: item.stock + amount,
              status:
                item.stock + amount <= item.reorderPoint * 0.6
                  ? 'critical'
                  : item.stock + amount <= item.reorderPoint
                    ? 'low'
                    : 'healthy',
            }
          : item,
      ),
    );
  };

  return (
    <main className="flex min-h-screen flex-col gap-10 bg-slate-50 px-4 py-10">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-3 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">
          Inventory intelligence
        </h1>
        <p className="text-sm text-slate-600">
          Monitor stock positions across suppliers and automate replenishment signals.
        </p>
      </header>

      {notifications.length > 0 && (
        <section className="mx-auto w-full max-w-6xl rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
          <p className="font-semibold">Live updates:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {notifications.map((note, index) => (
              <span
                key={`${note}-${index}`}
                className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-emerald-700"
              >
                {note}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-4">
        <MetricCard label="Total units" value={totals.totalStock.toLocaleString()} />
        <MetricCard label="Healthy SKUs" value={totals.healthy.toString()} />
        <MetricCard label="Low stock SKUs" value={totals.low.toString()} />
        <MetricCard label="Critical SKUs" value={totals.critical.toString()} />
      </section>

      <section className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div>
              Supplier{' '}
              <select
                value={supplierFilter}
                onChange={(event) => setSupplierFilter(event.target.value)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All suppliers</option>
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Store{' '}
              <select
                value={storeFilter}
                onChange={(event) => setStoreFilter(event.target.value)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All stores</option>
                {stores.map((store) => (
                  <option key={store} value={store}>
                    {store}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Tip: Real-time updates reflect supplier confirmations in progress.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-6">Product</th>
                <th className="py-3 pr-6">Supplier</th>
                <th className="py-3 pr-6">Store</th>
                <th className="py-3 pr-6">SKU</th>
                <th className="py-3 pr-6">Stock</th>
                <th className="py-3 pr-6">Reorder point</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="align-top text-sm text-slate-700">
                  <td className="py-4 pr-6 font-semibold text-slate-900">
                    {item.product}
                    <p className="text-xs text-slate-400">
                      {item.status === 'critical'
                        ? 'Action required: escalate supplier restock.'
                        : item.status === 'low'
                          ? 'Monitor demand closely. Auto-replenishment suggested.'
                          : 'Inventory is within safe range.'}
                    </p>
                  </td>
                  <td className="py-4 pr-6">{item.supplier}</td>
                  <td className="py-4 pr-6">#{item.storeId}</td>
                  <td className="py-4 pr-6 text-xs text-slate-500">{item.sku}</td>
                  <td className="py-4 pr-6">
                    <StatusBadge status={item.status} stock={item.stock} />
                  </td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        onClick={() => handleAdjustReorder(item.id, -10)}
                        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                      >
                        -10
                      </button>
                      <span className="font-semibold text-slate-900">
                        {item.reorderPoint}
                      </span>
                      <button
                        onClick={() => handleAdjustReorder(item.id, 10)}
                        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleManualRestock(item.id, 25)}
                        className="rounded-md border border-blue-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-blue-600 hover:bg-blue-50"
                      >
                        Restock +25
                      </button>
                      <button
                        onClick={() => handleManualRestock(item.id, -20)}
                        className="rounded-md border border-amber-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-amber-600 hover:bg-amber-50"
                      >
                        Allocate -20
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No inventory items match this view. Adjust supplier or store filters.
          </p>
        )}
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  );
}

function StatusBadge({ status, stock }: { status: InventoryStatus; stock: number }) {
  const config: Record<InventoryStatus, { label: string; classes: string }> = {
    healthy: {
      label: 'Healthy',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    low: {
      label: 'Low',
      classes: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    critical: {
      label: 'Critical',
      classes: 'bg-rose-100 text-rose-800 border-rose-200',
    },
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${config[status].classes}`}
      >
        {config[status].label}
      </span>
      <span className="text-sm font-semibold text-slate-900">
        {stock} units
      </span>
    </div>
  );
}

