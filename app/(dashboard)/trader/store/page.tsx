"use client";

import { useMemo, useState } from "react";
import { Store, Plus, Filter } from "lucide-react";

import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import { useLanguage } from "../../../../components/providers/language-provider";

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
  const { t } = useLanguage();
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
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">
              {t("home.trader.store.title")}
            </h1>
            <p className="mt-1 text-neutral-900 dark:text-neutral-200">
              {t("home.trader.store.description")}
            </p>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.2fr_1.8fr]">
          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                {t("home.trader.store.createTitle")}
              </h2>
            </div>
            <p className="text-sm text-neutral-900 dark:text-neutral-200 mb-4">
              {t("home.trader.store.createDescription")}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.store.form.labels.storeName")}
                </span>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                  placeholder={t("home.trader.store.form.placeholders.storeName")}
                />
              </label>

              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.store.form.labels.channel")}
                </span>
                <select
                  name="channel"
                  value={formValues.channel}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                >
                  <option value="Marketplace">{t("home.trader.store.form.channels.marketplace")}</option>
                  <option value="Wholesale">{t("home.trader.store.form.channels.wholesale")}</option>
                  <option value="Direct Retail">{t("home.trader.store.form.channels.directRetail")}</option>
                </select>
              </label>

              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.store.form.labels.region")}
                </span>
                <input
                  type="text"
                  name="region"
                  value={formValues.region}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                  placeholder={t("home.trader.store.form.placeholders.region")}
                />
              </label>

              <label className="space-y-1 flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.store.form.labels.focus")}
                </span>
                <textarea
                  name="focus"
                  value={formValues.focus}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-neutral-400 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                  placeholder={t("home.trader.store.form.placeholders.focus")}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-blue-600 dark:bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white dark:text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? t("home.trader.store.form.buttons.creating") : t("home.trader.store.form.buttons.createStore")}
              </button>
            </form>
          </article>

          <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.store.existingStores")}
                </h2>
                <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                  {t("home.trader.store.itemsCount").replace("{shown}", filteredStores.length.toString()).replace("{total}", stores.length.toString())}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-neutral-900 dark:text-neutral-200" />
                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(
                      event.target.value as TraderStore["channel"] | "all"
                    )
                  }
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                >
                  <option value="all">{t("home.trader.store.filters.allChannels")}</option>
                  <option value="Marketplace">{t("home.trader.store.form.channels.marketplace")}</option>
                  <option value="Wholesale">{t("home.trader.store.form.channels.wholesale")}</option>
                  <option value="Direct Retail">{t("home.trader.store.form.channels.directRetail")}</option>
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
                        <span className="rounded-full bg-blue-100 dark:bg-blue-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                          {store.channel}
                        </span>
                        <span className="text-sm text-neutral-900 dark:text-neutral-200">
                          {t("home.trader.store.created")} {new Date(store.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-900 dark:text-neutral-200">
                        {store.focus}
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-200">
                        {t("home.trader.store.operatingRegion")} {store.region}
                      </p>
                      <p className="text-xs text-neutral-900 dark:text-neutral-200">
                        {t("home.trader.store.connectSuppliers")}
                      </p>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleDelete(store.id)}
                        className="flex-1 lg:flex-none rounded-xl border-2 border-red-200 dark:border-red-900/50 px-4 py-2 text-sm font-semibold text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                      >
                        {t("home.trader.store.buttons.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredStores.length === 0 && (
                <p className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-8 text-center text-sm text-neutral-900 dark:text-neutral-200">
                  {t("home.trader.store.emptyState")}
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
