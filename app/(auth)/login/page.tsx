"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore, type AuthUser } from "../../../lib/store/auth-store";

type FormState = {
  identifier: string;
  password: string;
};

const initialState: FormState = {
  identifier: "",
  password: "",
};

export default function LoginPage() {
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
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-3xl font-semibold">Sign in to your account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email or Phone"
          value={formState.identifier}
          onChange={handleChange("identifier")}
          placeholder="hazem@example.com or +201234567890"
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
          <p className="rounded-md bg-red-100 px-3 py-2 text-md text-red-600">
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

      <p className="mt-6 text-center text-md text-slate-600">
        Need an account?{" "}
        <a
          href="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
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
      <span className="mb-1 block text-md font-semibold text-slate-700">
        {label}
      </span>
      <input
        className="w-full rounded-sm border border-slate-300 px-3 py-1 text-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}
