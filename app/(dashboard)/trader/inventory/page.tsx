"use client";

import { useEffect, useMemo, useState } from "react";
import { Package, Filter, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";

type InventoryStatus = "healthy" | "low" | "critical";

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
    id: "inv-01",
    product: "Organic Arabica Roast",
    supplier: "Aurora Commodities",
    sku: "ORG-001",
    storeId: "store-1",
    stock: 180,
    reorderPoint: 120,
    status: "healthy",
  },
  {
    id: "inv-02",
    product: "Smart Cold Chain Sensors",
    supplier: "Zenith Devices",
    sku: "SEN-441",
    storeId: "store-2",
    stock: 92,
    reorderPoint: 80,
    status: "low",
  },
  {
    id: "inv-03",
    product: "Sustainable Packaging Kit",
    supplier: "Evergreen Supplies",
    sku: "PKG-205",
    storeId: "store-3",
    stock: 240,
    reorderPoint: 150,
    status: "healthy",
  },
  {
    id: "inv-04",
    product: "Nutraceutical Blends",
    supplier: "Pulse Medical",
    sku: "MED-302",
    storeId: "store-1",
    stock: 110,
    reorderPoint: 140,
    status: "critical",
  },
  {
    id: "inv-05",
    product: "Technical Denim Roll",
    supplier: "Harbor Textiles",
    sku: "DEN-019",
    storeId: "store-2",
    stock: 75,
    reorderPoint: 60,
    status: "healthy",
  },
];

export default function TraderInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [supplierFilter, setSupplierFilter] = useState<string>("all");
  const [storeFilter, setStoreFilter] = useState<string>("all");
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
              ? "critical"
              : nextStock <= item.reorderPoint
                ? "low"
                : "healthy";

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
        supplierFilter === "all" || item.supplier === supplierFilter;
      const storeMatch = storeFilter === "all" || item.storeId === storeFilter;
      return supplierMatch && storeMatch;
    });
  }, [inventory, supplierFilter, storeFilter]);

  const totals = useMemo(() => {
    const totalStock = filteredInventory.reduce((sum, item) => sum + item.stock, 0);
    const critical = filteredInventory.filter(
      (item) => item.status === "critical"
    ).length;
    const low = filteredInventory.filter((item) => item.status === "low").length;
    const healthy = filteredInventory.filter(
      (item) => item.status === "healthy"
    ).length;

    return {
      totalStock,
      critical,
      low,
      healthy,
    };
  }, [filteredInventory]);

  const metrics = [
    {
      id: "total",
      label: "Total Units",
      value: totals.totalStock.toLocaleString(),
      icon: Package,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "healthy",
      label: "Healthy SKUs",
      value: totals.healthy.toString(),
      icon: CheckCircle,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "low",
      label: "Low Stock SKUs",
      value: totals.low.toString(),
      icon: AlertTriangle,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "critical",
      label: "Critical SKUs",
      value: totals.critical.toString(),
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
    },
  ];

  const handleAdjustReorder = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              reorderPoint: Math.max(20, item.reorderPoint + delta),
            }
          : item
      )
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
                  ? "critical"
                  : item.stock + amount <= item.reorderPoint
                    ? "low"
                    : "healthy",
            }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <MobileDashboardNav role="trader" />

      <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
        <header className="mx-auto w-full max-w-7xl">
          <Breadcrumb />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">Inventory</h1>
            <p className="mt-1 text-neutral-900 dark:text-neutral-200">Monitor and manage your stock levels</p>
          </div>

          {notifications.length > 0 && (
            <aside className="mt-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 px-4 sm:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-200">Live updates:</span>
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
              </article>
            );
          })}
        </section>

        <section className="mx-auto w-full max-w-7xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-4 text-sm text-neutral-900 dark:text-neutral-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <select
                  value={supplierFilter}
                  onChange={(event) => setSupplierFilter(event.target.value)}
                  className="rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                >
                  <option value="all">All suppliers</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <select
                  value={storeFilter}
                  onChange={(event) => setStoreFilter(event.target.value)}
                  className="rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
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
            <p className="text-xs text-neutral-900 dark:text-neutral-200">
              💡 Real-time updates reflect supplier confirmations
            </p>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Product</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Supplier</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Store</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">SKU</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Stock</th>
                  <th className="py-3 pr-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Reorder Point</th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-4 pr-6">
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                          {item.product}
                        </p>
                        <p className="text-xs text-neutral-900 dark:text-neutral-200 mt-0.5">
                          {item.status === "critical"
                            ? "⚠️ Action required: escalate supplier restock"
                            : item.status === "low"
                              ? "⏰ Monitor demand closely"
                              : "✅ Inventory is within safe range"}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">{item.supplier}</td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200">#{item.storeId}</td>
                    <td className="py-4 pr-6 text-neutral-900 dark:text-neutral-200 text-xs">{item.sku}</td>
                    <td className="py-4 pr-6">
                      <StatusBadge status={item.status} stock={item.stock} />
                    </td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAdjustReorder(item.id, -10)}
                          className="rounded-lg border-2 border-neutral-400 dark:border-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-900 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                        >
                          -10
                        </button>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                          {item.reorderPoint}
                        </span>
                        <button
                          onClick={() => handleAdjustReorder(item.id, 10)}
                          className="rounded-lg border-2 border-neutral-400 dark:border-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-900 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleManualRestock(item.id, 25)}
                          className="rounded-xl border-2 border-primary-400 dark:border-primary-900/50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all"
                        >
                          Restock +25
                        </button>
                        <button
                          onClick={() => handleManualRestock(item.id, -20)}
                          className="rounded-xl border-2 border-amber-400 dark:border-amber-900/50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all"
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
            <p className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-8 text-center text-sm text-neutral-900 dark:text-neutral-200">
              No inventory items match this view. Adjust supplier or store filters.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function StatusBadge({ status, stock }: { status: InventoryStatus; stock: number }) {
  const config: Record<InventoryStatus, { label: string; classes: string }> = {
    healthy: {
      label: "Healthy",
      classes: "bg-success-100 dark:bg-success-950/50 text-success-700 dark:text-success-400 border-success-200 dark:border-success-900/50",
    },
    low: {
      label: "Low",
      classes: "bg-warning-100 dark:bg-warning-950/50 text-warning-700 dark:text-warning-400 border-warning-200 dark:border-warning-900/50",
    },
    critical: {
      label: "Critical",
      classes: "bg-danger-100 dark:bg-danger-950/50 text-danger-700 dark:text-danger-400 border-danger-200 dark:border-danger-900/50",
    },
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config[status].classes}`}
      >
        {config[status].label}
      </span>
      <span className="text-sm font-bold text-neutral-900 dark:text-neutral-200">
        {stock} units
      </span>
    </div>
  );
}
