"use client";

import { useMemo, useState } from "react";
import { Package, Plus, Filter } from "lucide-react";

import {
  ProductForm,
  type SupplierProductFormValues,
} from "../../../../components/dashboard/supplier/product-form";
import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";
import { useLanguage } from "../../../../components/providers/language-provider";

type ProductStatus = "active" | "draft";

interface SupplierProduct extends SupplierProductFormValues {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const INITIAL_PRODUCTS: SupplierProduct[] = [
  {
    id: "prod-1",
    name: "Organic Arabica Roast",
    sku: "ORG-001",
    category: "Agro Commodities",
    inventory: 240,
    status: "active",
    description:
      "Origin-specific green coffee beans with cupping scores above 86.",
    createdAt: "2025-08-14T10:00:00Z",
    updatedAt: "2025-10-22T14:10:00Z",
  },
  {
    id: "prod-2",
    name: "Smart Cold Chain Sensors",
    sku: "SEN-441",
    category: "Industrial Components",
    inventory: 410,
    status: "active",
    description: "IoT sensors providing end-to-end temperature visibility.",
    createdAt: "2025-09-02T08:20:00Z",
    updatedAt: "2025-10-31T09:35:00Z",
  },
  {
    id: "prod-3",
    name: "Sustainable Packaging Kit",
    sku: "PKG-205",
    category: "Fast Moving Goods",
    inventory: 160,
    status: "draft",
    description:
      "Compostable packaging designed for direct-to-consumer brands.",
    createdAt: "2025-10-19T11:45:00Z",
    updatedAt: "2025-10-19T11:45:00Z",
  },
];

export default function SupplierProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<SupplierProduct[]>(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<SupplierProduct | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<ProductStatus | "all">("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") {
      return products;
    }
    return products.filter((product) => product.status === filter);
  }, [products, filter]);

  const handleCreateProduct = async (values: SupplierProductFormValues) => {
    setIsSubmitting(true);
    const snapshot = products;

    const newProduct: SupplierProduct = {
      ...values,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);

    try {
      await simulateRequest();
      setEditingProduct(null);
    } catch (error) {
      setProducts(snapshot);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (values: SupplierProductFormValues) => {
    if (!values.id) return;
    setIsSubmitting(true);

    const snapshot = products;

    const updatedProduct: SupplierProduct = {
      ...(values as SupplierProduct),
      id: values.id,
      createdAt:
        products.find((product) => product.id === values.id)?.createdAt ??
        new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts((prev) =>
      prev.map((product) =>
        product.id === values.id ? updatedProduct : product
      )
    );

    try {
      await simulateRequest();
      setEditingProduct(null);
    } catch (error) {
      setProducts(snapshot);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const snapshot = products;
    setProducts((prev) => prev.filter((product) => product.id !== id));

    try {
      await simulateRequest(0.15);
    } catch (error) {
      setProducts(snapshot);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <MobileDashboardNav role="supplier" />

      <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
        <header className="mx-auto w-full max-w-7xl">
          <Breadcrumb />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">
              {t("home.supplier.products.title")}
            </h1>
            <p className="mt-1 text-neutral-900 dark:text-neutral-200">
              {t("home.supplier.products.description")}
            </p>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1fr_1.5fr]">
          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                {editingProduct
                  ? t("home.supplier.products.editProduct")
                  : t("home.supplier.products.createProduct")}
              </h2>
            </div>
            <div>
              <ProductForm
                initialValues={editingProduct ?? undefined}
                onSubmit={
                  editingProduct ? handleUpdateProduct : handleCreateProduct
                }
                onCancel={() => setEditingProduct(null)}
                submitLabel={
                  editingProduct
                    ? t("home.supplier.products.updateProduct")
                    : t("home.supplier.products.createProductButton")
                }
                isSubmitting={isSubmitting}
              />
            </div>
          </article>

          <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
                  {t("home.supplier.products.productList")}
                </h2>
                <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
                  {t("home.supplier.products.itemsCount")
                    .replace("{shown}", filteredProducts.length.toString())
                    .replace("{total}", products.length.toString())}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-neutral-900 dark:text-neutral-200" />
                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(event.target.value as ProductStatus | "all")
                  }
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                >
                  <option value="all">
                    {t("home.supplier.products.filters.allStatuses")}
                  </option>
                  <option value="active">
                    {t("home.supplier.products.filters.activeOnly")}
                  </option>
                  <option value="draft">
                    {t("home.supplier.products.filters.draftOnly")}
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200">
                          {product.name}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                            product.status === "active"
                              ? "bg-success-50 dark:bg-success-900/50 text-success-700 dark:text-success-400"
                              : "bg-warning-50 dark:bg-warning-900/50 text-warning-700 dark:text-warning-400"
                          }`}
                        >
                          {t(`home.supplier.products.status.${product.status}`)}
                        </span>
                        <span className="text-sm text-neutral-900 dark:text-neutral-200">
                          {t("home.supplier.products.sku")} {product.sku}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-900 dark:text-neutral-200">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-900 dark:text-neutral-200">
                        <span>
                          {t("home.supplier.products.inventory").replace(
                            "{count}",
                            product.inventory.toString()
                          )}
                        </span>
                        <span>
                          {t("home.supplier.products.category")}{" "}
                          {product.category}
                        </span>
                        <span>
                          {t("home.supplier.products.updated")}{" "}
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex-1 lg:flex-none rounded-xl border-2 border-primary-200 dark:border-primary-900/50 px-4 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-200 hover:bg-primary-500 dark:hover:bg-primary-600/30 transition-all"
                      >
                        {t("home.supplier.products.buttons.edit")}
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 lg:flex-none rounded-xl border-2 border-red-200 dark:border-red-900/50 px-4 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-200 hover:bg-red-500 dark:hover:bg-red-600/30 transition-all"
                      >
                        {t("home.supplier.products.buttons.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <p className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-8 text-center text-sm text-neutral-900 dark:text-neutral-200">
                  {t("home.supplier.products.emptyState")}
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
        reject(new Error("Network error. Please try again."));
      } else {
        resolve();
      }
    }, 600);
  });
}
