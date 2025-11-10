"use client";

import { useMemo, useState } from "react";

import {
  ProductForm,
  type SupplierProductFormValues,
} from "../../../../components/dashboard/supplier/product-form";

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
    <main className="flex min-h-screen flex-col gap-10 bg-slate-50 px-4 py-10">
      <header className="mx-auto flex w-full max-w-5xl flex-col gap-3 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">
          Product catalogue
        </h1>
        <p className="text-sm text-slate-600">
          Manage product details, inventory, and status before publishing to the
          marketplace.
        </p>
      </header>

      <section className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_1.5fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingProduct ? "Edit product" : "Create product"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Capture the essentials shoppers see across Kontainar Hub.
          </p>
          <div className="mt-4">
            <ProductForm
              initialValues={editingProduct ?? undefined}
              onSubmit={
                editingProduct ? handleUpdateProduct : handleCreateProduct
              }
              onCancel={() => setEditingProduct(null)}
              submitLabel={editingProduct ? "Update product" : "Create product"}
              isSubmitting={isSubmitting}
            />
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Product list
              </h2>
              <p className="text-sm text-slate-500">
                {filteredProducts.length} item(s) • {products.length} total
              </p>
            </div>
            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value as ProductStatus | "all")
              }
              className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">All statuses</option>
              <option value="active">Active only</option>
              <option value="draft">Draft only</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="max-w-lg space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                      {product.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      SKU {product.sku}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>Inventory: {product.inventory} units</span>
                    <span>Category: {product.category}</span>
                    <span>
                      Updated {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-end gap-3 md:flex-col md:items-end">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="w-full rounded-md border border-blue-600/40 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 md:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-full rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 md:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No products match this filter. Adjust the status or create a new
                product.
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
        reject(new Error("Network error. Please try again."));
      } else {
        resolve();
      }
    }, 600);
  });
}
