"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuthStore } from "../../../lib/store/auth-store";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactClient() {
  const user = useAuthStore((state) => state.user);
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormState((prev) => ({
        ...prev,
        name: user.fullName,
        email: user.email,
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
      setError(null);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to an API endpoint
      // const response = await fetch('/api/contact', { ... });
      
      setSuccess(true);
      setFormState(INITIAL_STATE);
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
        <div className="h-16 w-16 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center text-success-600 dark:text-success-400 mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Message Sent!</h3>
        <p className="text-neutral-900 dark:text-neutral-200 max-w-md mx-auto mb-8">
          Thank you for reaching out. We've received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          id="name"
          value={formState.name}
          onChange={handleChange("name")}
          placeholder="John Doe"
          required
        />
        <Input
          label="Email Address"
          id="email"
          type="email"
          value={formState.email}
          onChange={handleChange("email")}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          id="phone"
          type="tel"
          value={formState.phone}
          onChange={handleChange("phone")}
          placeholder="+1 (555) 000-0000"
        />
        <Select
          label="Subject"
          id="subject"
          value={formState.subject}
          onChange={handleChange("subject")}
          options={[
            { value: "", label: "Select a topic" },
            { value: "general", label: "General Inquiry" },
            { value: "support", label: "Technical Support" },
            { value: "sales", label: "Sales & Partnerships" },
            { value: "billing", label: "Billing Question" },
          ]}
          required
        />
      </div>

      <TextArea
        label="Message"
        id="message"
        value={formState.message}
        onChange={handleChange("message")}
        placeholder="How can we help you?"
        rows={6}
        required
      />

      {error && (
        <div className="flex items-center gap-2 text-danger-600 dark:text-danger-400 bg-danger-50 dark:bg-danger-900/20 p-4 rounded-xl text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-neutral-100 dark:text-neutral-900 font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Input({
  label,
  id,
  type = "text",
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/50 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-900 dark:placeholder:text-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${className}`}
        {...props}
      />
    </div>
  );
}

function TextArea({
  label,
  id,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/50 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-900 dark:placeholder:text-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-y ${className}`}
        {...props}
      />
    </div>
  );
}

function Select({
  label,
  id,
  options,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/50 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-900 dark:text-neutral-200">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
