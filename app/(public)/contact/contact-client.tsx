"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAuthStore } from "../../../lib/store/auth-store";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
  { value: "technical", label: "Technical Issue" },
];

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "general",
  message: "",
};

export function ContactClient() {
  const user = useAuthStore((state) => state.user);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormState((prev) => ({
        ...prev,
        name: user.fullName,
        email: user.email,
        phone: user.phone,
      }));
    }
  }, [user]);

  const handleChange = (
    field: keyof FormState
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to send message. Please try again.");
      }

      setSuccess(true);
      setFormState(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Name"
          value={formState.name}
          onChange={handleChange("name")}
          placeholder="John Doe"
          required
        />
        <Input
          label="Email"
          type="email"
          value={formState.email}
          onChange={handleChange("email")}
          placeholder="john.doe@example.com"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Phone"
          type="tel"
          value={formState.phone}
          onChange={handleChange("phone")}
          placeholder="+1 (555) 123-4567"
        />
        <Select
          label="Subject"
          value={formState.subject}
          onChange={handleChange("subject")}
          options={subjectOptions}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-700">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formState.message}
          onChange={handleChange("message")}
          required
          rows={6}
          placeholder="Tell us how we can help you..."
          className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-700 placeholder:text-neutral-700 dark:placeholder:text-neutral-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          Thank you for contacting us! We'll get back to you as soon as possible.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
};

function Input({
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: InputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-700">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-700 placeholder:text-neutral-700 dark:placeholder:text-neutral-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </label>
  );
}

type SelectProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
};

function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-700">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

