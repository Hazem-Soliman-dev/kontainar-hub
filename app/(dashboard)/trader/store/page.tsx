"use client";

import { useMemo, useState } from "react";
import { Store, Plus, Filter } from "lucide-react";

import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";

interface TraderStore {
  id: string;
  name: string;
  channel: "Marketplace" | "Wholesale" | "Direct Retail";
  region: string;
  focus: string;
  createdAt: string;
}

const INITIAL_STORES: TraderStore[] = [
  {
    id: "store-1",
    name: "Northwind Marketplace",
    channel: "Marketplace",
    region: "Europe",
    focus: "Specialty coffee & premium grocery",
    createdAt: "2025-03-12T10:00:00Z",
  },
  {
    id: "store-2",
    name: "Summit Wholesale",
    channel: "Wholesale",
    region: "North America",
    focus: "Cold chain supplies for retail chains",
    createdAt: "2025-05-22T15:30:00Z",
  },
  {
    id: "store-3",
    name: "Evergreen Retail",
    channel: "Direct Retail",
    region: "MENA",
    focus: "Sustainable packaging for quick commerce",
    createdAt: "2025-08-09T09:45:00Z",
  },
];

type StoreFormValues = {
  name: string;
  channel: TraderStore["channel"];
  region: string;
  focus: string;
};

const defaultFormValues: StoreFormValues = {
  name: "",
  channel: "Marketplace",
  region: "",
  focus: "",
};

export default function TraderStorePage() {
  const [stores, setStores] = useState<TraderStore[]>(INITIAL_STORES);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<TraderStore["channel"] | "all">("all");

  const filteredStores = useMemo(() => {
    if (filter === "all") return stores;
    return stores.filter((store) => store.channel === filter);
  }, [stores, filter]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValues.name.trim()) return;

    setIsSubmitting(true);
    const snapshot = stores;

    const newStore: TraderStore = {
      id: `store-${crypto.randomUUID().slice(0, 8)}`,
      ...formValues,
      createdAt: new Date().toISOString(),
    };

    setStores((prev) => [newStore, ...prev]);
    setFormValues(defaultFormValues);

    try {
      await simulateRequest();
    } catch (error) {
      console.error(error);
      setStores(snapshot);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const snapshot = stores;
    setStores((prev) => prev.filter((store) => store.id !== id));

    try {
      await simulateRequest(0.12);
    } catch (error) {
      console.error(error);
      setStores(snapshot);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <MobileDashboardNav role="trader" />

      <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
        <header className="mx-auto w-full max-w-7xl">
          <Breadcrumb />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">Stores</h1>
            <p className="mt-1 text-neutral-900 dark:text-neutral-200">Create and manage your sub-stores</p>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.2fr_1.8fr]">
          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                Create New Sub-Store
              </h2>
            </div>
            <p className="text-sm text-neutral-900 dark:text-neutral-200 mb-4">
              Segment buyers by channel, geography, or assortment strategy.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  Store Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                  placeholder="e.g. Northwind Retail EU"
                />
              </label>

              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  Channel
                </span>
                <select
                  name="channel"
                  value={formValues.channel}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                >
                  <option value="Marketplace">Marketplace</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Direct Retail">Direct Retail</option>
                </select>
              </label>

              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  Region
                </span>
                <input
                  type="text"
                  name="region"
                  value={formValues.region}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                  placeholder="e.g. Europe, APAC"
                />
              </label>

              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  Focus
                </span>
                <textarea
                  name="focus"
                  value={formValues.focus}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                  placeholder="What products or buyer needs does this store address?"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary-500 dark:bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white dark:text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? "Creating..." : "Create Store"}
              </button>
            </form>
          </article>

          <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  Existing Stores
                </h2>
                <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                  {filteredStores.length} store(s) • {stores.length} total
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-neutral-900 dark:text-neutral-200" />
                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(event.target.value as TraderStore["channel"] | "all")
                  }
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                >
                  <option value="all">All channels</option>
                  <option value="Marketplace">Marketplace</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Direct Retail">Direct Retail</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200">
                          {store.name}
                        </h3>
                        <span className="rounded-full bg-info-100 dark:bg-info-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-info-700 dark:text-info-400">
                          {store.channel}
                        </span>
                        <span className="text-sm text-neutral-900 dark:text-neutral-200">
                          Created {new Date(store.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-900 dark:text-neutral-200">
                        {store.focus}
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-200">
                        🌍 Operating region: {store.region}
                      </p>
                      <p className="text-xs text-neutral-900 dark:text-neutral-200">
                        Connect suppliers to this store from the inventory console.
                      </p>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleDelete(store.id)}
                        className="flex-1 lg:flex-none rounded-xl border-2 border-danger-200 dark:border-danger-900/50 px-4 py-2 text-sm font-semibold text-danger-700 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-950/30 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredStores.length === 0 && (
                <p className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-8 text-center text-sm text-neutral-900 dark:text-neutral-200">
                  No stores match this filter. Adjust the channel or create a new store.
                </p>
              )}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

function simulateRequest(failureProbability = 0.1) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureProbability) {
        reject(new Error("Network error. Please retry."));
      } else {
        resolve();
      }
    }, 650);
  });
}
