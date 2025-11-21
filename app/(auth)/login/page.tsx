"use client";

import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, Mail, Lock } from "lucide-react";

import { useAuthStore } from "../../../lib/store/auth-store";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import type { AuthSuccessBody } from "../../../lib/auth-response";
import { cn } from "@/lib/utils";

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
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white dark:bg-neutral-900 p-8 shadow-lg">
        <div className="h-8 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800 mx-auto" />
        <div className="space-y-4">
          <div className="h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        </div>
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
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[100px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-secondary-500/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 pt-8 z-10">
        <Breadcrumb />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/80 backdrop-blur-xl p-8 shadow-strong">

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email or Phone"
                value={formState.identifier}
                onChange={handleChange("identifier")}
                placeholder="john.doe@example.com"
                required
                icon={Mail}
              />
              <Input
                label="Password"
                type="password"
                value={formState.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                required
                icon={Lock}
              />

              {error && (
                <div className="rounded-xl bg-red-100 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 dark:bg-blue-500 px-4 py-3 text-sm font-semibold text-neutral-100 dark:text-neutral-900 shadow-lg shadow-primary-500/20 transition-all hover:bg-blue-500 hover:shadow-primary-500/30 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
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
  icon?: any;
};

function Input({
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  icon: Icon,
}: InputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wide ml-1">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-400 group-focus-within:text-blue-500 transition-colors">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          className={cn(
            "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none",
            Icon && "pl-10"
          )}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
