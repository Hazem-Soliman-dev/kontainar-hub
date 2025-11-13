'use client';

import { useState } from 'react';

export interface SupplierProductFormValues {
  id?: string;
  name: string;
  sku: string;
  category: string;
  inventory: number;
  status: 'active' | 'draft';
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
  name: '',
  sku: '',
  category: '',
  inventory: 0,
  status: 'active',
  description: '',
};

export function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save product',
  isSubmitting = false,
}: SupplierProductFormProps) {
  const [values, setValues] = useState<SupplierProductFormValues>(
    initialValues ?? defaultValues,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]:
        name === 'inventory'
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
        <FormField label="Product name">
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </FormField>
        <FormField label="SKU">
          <input
            type="text"
            name="sku"
            value={values.sku}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Category">
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </FormField>
        <FormField label="Inventory">
          <input
            type="number"
            name="inventory"
            value={values.inventory}
            onChange={handleChange}
            min={0}
            required
            className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </FormField>
      </div>

      <FormField label="Status">
        <select
          name="status"
          value={values.status}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </FormField>

      <FormField label="Description">
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </FormField>

      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
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

