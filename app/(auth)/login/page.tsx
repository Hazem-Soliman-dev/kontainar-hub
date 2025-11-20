"use client";

import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "../../../lib/store/auth-store";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import type { AuthSuccessBody } from "../../../lib/auth-response";

type FormState = {
  identifier: string;
  password: string;
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4">
      <div className="h-12 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 space-y-4">
        <div className="h-20 rounded bg-slate-200" />
        <div className="h-20 rounded bg-slate-200" />
        <div className="h-10 rounded bg-slate-200" />
      </div>
    </div>
  );
}

const initialState: FormState = {
  identifier: "john.doe@example.com",
  password: "password",
};

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to login.");
      }

      const { user, token, subscription, dashboardPath } =
        data as AuthSuccessBody;
      setAuth({ user, token, subscription, dashboardPath });

      // Give persist middleware time to save to localStorage before redirect
      await new Promise((resolve) => setTimeout(resolve, 100));

      const redirect = searchParams.get("redirect");
      router.push(redirect ?? dashboardPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-6 text-neutral-900 dark:text-neutral-900">
      <div className="pt-8 pb-6">
        <Breadcrumb />
      </div>

      <div className="flex flex-1 items-center justify-center mb-30">
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email or Phone"
              value={formState.identifier}
              onChange={handleChange("identifier")}
              placeholder="john.doe@example.com or +201234567890"
              required
            />
            <Input
              label="Password"
              type="password"
              value={formState.password}
              onChange={handleChange("password")}
              placeholder="********"
              required
            />

            {error && (
              <p className="rounded-md bg-red-100 px-3 py-2 text-md text-red-600 dark:text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-sm bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-md text-neutral-700 dark:text-neutral-700">
            Need an account?{" "}
            <a
              href="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
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
      <span className="mb-1 block text-md font-semibold text-neutral-700 dark:text-neutral-700">
        {label}
      </span>
      <input
        className="w-full rounded-sm border border-neutral-400 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-50 px-3 py-1 text-md text-neutral-700 dark:text-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}
