"use client";

import { useState } from "react";
import { useLanguage } from "../../providers/language-provider";

export interface SupplierProductFormValues {
  id?: string;
  name: string;
  sku: string;
  category: string;
  inventory: number;
  status: "active" | "draft";
  description: string;
}

export interface SupplierProductFormProps {
  initialValues?: SupplierProductFormValues;
  onSubmit: (values: SupplierProductFormValues) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const defaultValues: SupplierProductFormValues = {
  name: "",
  sku: "",
  category: "",
  inventory: 0,
  status: "active",
  description: "",
};

export function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save product",
  isSubmitting = false,
}: SupplierProductFormProps) {
  const { t } = useLanguage();
  const [values, setValues] = useState<SupplierProductFormValues>(
    initialValues ?? defaultValues
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]:
        name === "inventory"
          ? Number(value)
          : (value as SupplierProductFormValues[keyof SupplierProductFormValues]),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label={t("home.supplier.products.form.labels.productName")}>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder={t(
              "home.supplier.products.form.placeholders.productName"
            )}
          />
        </FormField>
        <FormField label={t("home.supplier.products.form.labels.sku")}>
          <input
            type="text"
            name="sku"
            value={values.sku}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder={t("home.supplier.products.form.placeholders.sku")}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label={t("home.supplier.products.form.labels.category")}>
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder={t("home.supplier.products.form.placeholders.category")}
          />
        </FormField>
        <FormField label={t("home.supplier.products.form.labels.inventory")}>
          <input
            type="number"
            name="inventory"
            value={values.inventory}
            onChange={handleChange}
            min={0}
            required
            className="w-full rounded-md border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder={t(
              "home.supplier.products.form.placeholders.inventory"
            )}
          />
        </FormField>
      </div>

      <FormField label={t("home.supplier.products.form.labels.status")}>
        <select
          name="status"
          value={values.status}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="active">
            {t("home.supplier.products.form.status.active")}
          </option>
          <option value="draft">
            {t("home.supplier.products.form.status.draft")}
          </option>
        </select>
      </FormField>

      <FormField label={t("home.supplier.products.form.labels.description")}>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          placeholder={t(
            "home.supplier.products.form.placeholders.description"
          )}
        />
      </FormField>

      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-100"
          >
            {t("home.supplier.products.form.buttons.cancel")}
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? t("home.supplier.products.form.buttons.saving")
            : submitLabel}
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-400">{label}</span>
      {children}
    </label>
  );
}
