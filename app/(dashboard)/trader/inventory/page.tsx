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
        const updates = prev.map<InventoryItem>((item) => {
          if (Math.random() > 0.35) {
            return item;
          }

          const delta: number = Math.random() > 0.5 ? 15 : -12;
          const nextStock = Math.max(0, item.stock + delta);
          const nextStatus: InventoryStatus =
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
    <main className="flex min-h-screen flex-col gap-8 bg-neutral-50 dark:bg-neutral-50 px-4 py-10">
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-3 text-center">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl">
          Inventory intelligence
        </h1>
        <p className="text-md text-neutral-700 dark:text-neutral-700">
          Monitor stock positions across suppliers and automate replenishment signals.
        </p>
      </header>

      {notifications.length > 0 && (
        <section className="mx-auto w-full max-w-7xl rounded-2xl border border-emerald-700 dark:border-emerald-700 bg-emerald-950 dark:bg-emerald-950 px-4 py-4 text-sm text-emerald-400 dark:text-emerald-400">
          <p className="font-semibold">Live updates:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {notifications.map((note, index) => (
              <span
                key={`${note}-${index}`}
                className="rounded-full bg-emerald-950 dark:bg-emerald-950 px-3 py-1 text-xs font-medium text-emerald-400 dark:text-emerald-400"
              >
                {note}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-4">
        <MetricCard label="Total units" value={totals.totalStock.toLocaleString()} />
        <MetricCard label="Healthy SKUs" value={totals.healthy.toString()} />
        <MetricCard label="Low stock SKUs" value={totals.low.toString()} />
        <MetricCard label="Critical SKUs" value={totals.critical.toString()} />
      </section>

      <section className="mx-auto w-full max-w-7xl rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm text-center">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-neutral-700 dark:text-neutral-700">
            <div>
              Supplier{' '}
              <select
                value={supplierFilter}
                onChange={(event) => setSupplierFilter(event.target.value)}
                className="rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                className="rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
          <p className="text-sm text-neutral-700 dark:text-neutral-700">
            Tip: Real-time updates reflect supplier confirmations in progress.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-200 text-sm text-center ">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-700">
                <th className="py-3 pr-6">Product</th>
                <th className="py-3 pr-6">Supplier</th>
                <th className="py-3 pr-6">Store</th>
                <th className="py-3 pr-6">SKU</th>
                <th className="py-3 pr-6">Stock</th>
                <th className="py-3 pr-6">Reorder point</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="align-top text-sm text-neutral-700 dark:text-neutral-700">
                  <td className="py-4 pr-6 font-semibold text-neutral-900 dark:text-neutral-900">
                    {item.product}
                    <p className="text-sm text-neutral-700 dark:text-neutral-700 flex flex-wrap gap-2 w-54 mx-auto"> 
                      {item.status === 'critical'
                        ? 'Action required: escalate supplier restock.'
                        : item.status === 'low'
                          ? 'Monitor demand closely. Auto-replenishment suggested.'
                          : 'Inventory is within safe range.'}
                    </p>
                  </td>
                  <td className="py-4 pr-6">{item.supplier}</td>
                  <td className="py-4 pr-6">#{item.storeId}</td>
                  <td className="py-4 pr-6 text-sm text-neutral-700 dark:text-neutral-700">{item.sku}</td>
                  <td className="py-4 pr-6 flex justify-center items-center flex-wrap w-30 mx-auto">
                    <StatusBadge status={item.status} stock={item.stock} />
                  </td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-2 text-sm justify-center">
                      <button
                        onClick={() => handleAdjustReorder(item.id, -10)}
                        className="rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-2 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-200"
                      >
                        -10
                      </button>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-900">
                        {item.reorderPoint}
                      </span>
                      <button
                        onClick={() => handleAdjustReorder(item.id, 10)}
                        className="rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-2 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-200"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <button
                        onClick={() => handleManualRestock(item.id, 25)}
                        className="rounded-md border border-blue-700 dark:border-blue-700 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-blue-400 dark:text-blue-400 hover:bg-blue-800 dark:hover:bg-blue-800"
                      >
                        Restock +25
                      </button>
                      <button
                        onClick={() => handleManualRestock(item.id, -20)}
                        className="rounded-md border border-amber-700 dark:border-amber-700 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-amber-400 dark:text-amber-400 hover:bg-amber-800 dark:hover:bg-amber-800"
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
          <p className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-4 py-6 text-center text-sm text-neutral-700 dark:text-neutral-700">
            No inventory items match this view. Adjust supplier or store filters.
          </p>
        )}
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-5 shadow-sm text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-700 dark:text-neutral-700">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-neutral-900">{value}</p>
    </article>
  );
}

function StatusBadge({ status, stock }: { status: InventoryStatus; stock: number }) {
  const config: Record<InventoryStatus, { label: string; classes: string }> = {
    healthy: {
      label: 'Healthy',
      classes: 'bg-emerald-950 dark:bg-emerald-950 text-emerald-400 dark:text-emerald-400 border-emerald-700 dark:border-emerald-700',
    },
    low: {
      label: 'Low',
      classes: 'bg-amber-950 dark:bg-amber-950 text-amber-400 dark:text-amber-400 border-amber-700 dark:border-amber-700',
    },
    critical: {
      label: 'Critical',
      classes: 'bg-rose-950 dark:bg-rose-950 text-rose-400 dark:text-rose-400 border-rose-700 dark:border-rose-700',
    },
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${config[status].classes}`}
      >
        {config[status].label}
      </span>
      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">
        {stock} units
      </span>
    </div>
  );
}

