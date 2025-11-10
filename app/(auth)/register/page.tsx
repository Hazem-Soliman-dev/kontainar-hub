"use client";

import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore, type AuthUser } from "../../../lib/store/auth-store";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "supplier" | "trader";
  businessName: string;
  businessType: string;
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFallback />}>
      <RegisterPageContent />
    </Suspense>
  );
}

function RegisterFallback() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 py-12">
      <div className="mb-6 h-10 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="space-y-4">
        <div className="h-40 rounded bg-slate-200" />
        <div className="h-40 rounded bg-slate-200" />
        <div className="h-16 rounded bg-slate-200" />
      </div>
    </div>
  );
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "supplier",
  businessName: "",
  businessType: "",
};

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to register.");
      }

      const { user, token } = data as { user: AuthUser; token: string };
      setAuth({ user, token });

      const redirect = searchParams.get("redirect");
      const fallback =
        user.role === "supplier" ? "/supplier/dashboard" : "/trader/dashboard";

      router.push(redirect ?? fallback);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 py-12">
      <h1 className="mb-6 text-center text-3xl font-semibold">
        Create your account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formState.firstName}
            onChange={handleChange("firstName")}
            placeholder="John"
            required
          />
          <Input
            label="Last Name"
            value={formState.lastName}
            onChange={handleChange("lastName")}
            placeholder="Doe"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={formState.email}
            onChange={handleChange("email")}
            placeholder="john.doe@example.com"
            required
          />
          <Input
            label="Phone"
            value={formState.phone}
            onChange={handleChange("phone")}
            placeholder="+201234567890"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            value={formState.password}
            onChange={handleChange("password")}
            placeholder="********"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={formState.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="********"
            required
          />
        </div>
        <Select
          label="Role"
          value={formState.role}
          onChange={handleChange("role")}
          options={[
            { value: "supplier", label: "Supplier" },
            { value: "trader", label: "Trader" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Business Name"
            value={formState.businessName}
            onChange={handleChange("businessName")}
            required
          />
          <Input
            label="Business Type"
            value={formState.businessType}
            onChange={handleChange("businessType")}
            required
          />
        </div>

        {error && (
          <p className="rounded-md bg-red-100 px-3 py-2 text-md text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-sm bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-md text-slate-600">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
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
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
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
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        value={value}
        onChange={onChange}
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
