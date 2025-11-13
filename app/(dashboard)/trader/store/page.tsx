"use client";

import { useMemo, useState } from "react";

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
    <main className="flex min-h-screen flex-col gap-8 bg-neutral-50 dark:bg-neutral-50 px-4 py-10">
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-3 text-center">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Store setup & management
        </h1>
        <p className="text-md text-neutral-700 dark:text-neutral-700">
          Create sub-stores for each channel, customize assortments, and sync
          them with supplier inventories.
        </p>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.2fr_1.8fr]">
        <article className="rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-900">
            Create a new sub-store
          </h2>
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-700">
            Segment buyers by channel, geography, or assortment strategy.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <label className=" space-y-1 gap-1 flex flex-col">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">
                Store name
              </span>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm outline-none text-neutral-900 dark:text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. Northwind Retail EU"
              />
            </label>

            <label className=" space-y-1 gap-1 flex flex-col">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">
                Channel
              </span>
              <select
                name="channel"
                value={formValues.channel}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm outline-none text-neutral-900 dark:text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="Marketplace">Marketplace</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Direct Retail">Direct Retail</option>
              </select>
            </label>

            <label className=" space-y-1 gap-1 flex flex-col">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">
                Region
              </span>
              <input
                type="text"
                name="region"
                value={formValues.region}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm outline-none text-neutral-900 dark:text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. Europe, APAC"
              />
            </label>

            <label className=" space-y-1 gap-1 flex flex-col">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">
                Focus
              </span>
              <textarea
                name="focus"
                value={formValues.focus}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm outline-none text-neutral-900 dark:text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="What products or buyer needs does this store address?"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-800 dark:hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create store"}
            </button>
          </form>
        </article>

        <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                Existing stores
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-700">
                {filteredStores.length} store(s) • {stores.length} total
              </p>
            </div>
            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value as TraderStore["channel"] | "all")
              }
              className="rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">All channels</option>
              <option value="Marketplace">Marketplace</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Direct Retail">Direct Retail</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 p-4 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-900">
                      {store.name}
                    </h3>
                    <span className="rounded-full bg-blue-950 dark:bg-blue-950 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-400 dark:text-blue-400">
                      {store.channel}
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-700">
                      Created {new Date(store.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-700">
                    {store.focus}
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-700">
                    Operating region: {store.region}
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-700">
                    Connect suppliers to this store from the inventory console.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleDelete(store.id)}
                    className="rounded-md border border-red-700 dark:border-red-700 bg-neutral-50 dark:bg-neutral-50 px-4 py-2 text-sm font-semibold text-red-400 dark:text-red-400 hover:bg-red-800 dark:hover:bg-red-800"
                  >
                    Delete store
                  </button>
                </div>
              </div>
            ))}

            {filteredStores.length === 0 && (
              <p className="rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-4 py-6 text-center text-sm text-neutral-700 dark:text-neutral-700">
                No stores match this filter. Adjust the channel or create a new
                store.
              </p>
            )}
          </div>
        </article>
      </section>
    </main>
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
