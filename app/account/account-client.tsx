'use client';

import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Edit2, Save, X } from "lucide-react";

import { TrialBanner } from "../../components/subscription/trial-banner";
import {
  useAuthStore,
  type AuthUser,
} from "../../lib/store/auth-store";
import type {
  SubscriptionPlanId,
  SubscriptionSnapshot,
} from "../../lib/mock/subscriptions";

type SubscriptionActionType = "startTrial" | "activate" | "cancel";

export function AccountClient() {
  const user = useAuthStore((state) => state.user);
  const subscription = useAuthStore((state) => state.subscription);
  const dashboardPath = useAuthStore((state) => state.dashboardPath);
  const updateSubscription = useAuthStore((state) => state.updateSubscription);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [isLoading, setIsLoading] = useState<boolean>(
    Boolean(user && !subscription),
  );
  const [processing, setProcessing] = useState<SubscriptionActionType | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    businessName: user?.businessName || "",
    businessType: user?.businessType || "",
  });

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadSubscription = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/subscription", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ?? "Unable to load subscription details.",
          );
        }

        if (!cancelled) {
          updateSubscription(data.subscription as SubscriptionSnapshot);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading your subscription.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadSubscription();

    return () => {
      cancelled = true;
    };
  }, [user?.id, updateSubscription]);

  const rolePlanId: SubscriptionPlanId =
    user?.role === "supplier" ? "supplier" : "trader";

  const resolvedDashboard =
    dashboardPath ??
    (user?.role === "supplier" ? "/supplier/dashboard" : "/trader/dashboard");

  const currentSubscription = subscription;
  const isTrialActive =
    Boolean(currentSubscription?.status === "trial") &&
    Boolean(currentSubscription?.isTrialActive);
  const isActivePlan = currentSubscription?.status === "active";
  const planName =
    currentSubscription?.plan.name ?? (user ? "Free Preview" : "Guest plan");

  const canStartTrial =
    Boolean(user) &&
    (!currentSubscription ||
      currentSubscription.planId === "free" ||
      currentSubscription.status === "canceled" ||
      currentSubscription.status === "expired");

  const canActivate =
    Boolean(user) &&
    currentSubscription?.planId === rolePlanId &&
    currentSubscription.status !== "active";

  const canCancel =
    Boolean(user) &&
    (currentSubscription?.status === "trial" ||
      currentSubscription?.status === "active");

  const planStatusText = useMemo(() => {
    if (!currentSubscription) {
      return "Free preview";
    }

    switch (currentSubscription.status) {
      case "trial":
        return currentSubscription.isTrialActive
          ? "Trial active"
          : "Trial ended";
      case "active":
        return "Active subscription";
      case "expired":
        return "Trial expired";
      case "canceled":
        return "Canceled";
      default:
        return "Free preview";
    }
  }, [currentSubscription]);

  const formattedJoinedDate = useMemo(() => {
    if (!user) {
      return null;
    }

    try {
      return new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return null;
    }
  }, [user]);

  const handleSubscriptionAction = async (action: SubscriptionActionType) => {
    if (!user) {
      setError("You need to sign in to manage your subscription.");
      return;
    }

    setProcessing(action);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          action === "cancel"
            ? { action: "cancel" }
            : {
                action,
                planId: rolePlanId,
              },
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ?? "Unable to update your subscription right now.",
        );
      }

      updateSubscription(data.subscription as SubscriptionSnapshot);

      setMessage(
        action === "activate"
          ? "Subscription activated. Enjoy full workspace access!"
          : action === "cancel"
          ? "Subscription canceled. You're back on the free preview."
          : "Trial restarted for another day.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating your subscription.",
      );
    } finally {
      setProcessing(null);
    }
  };

  const handleTrialExpired = () => {
    const latest = useAuthStore.getState().subscription;
    if (!latest) {
      return;
    }

    updateSubscription({
      ...latest,
      status: "expired",
      isTrialActive: false,
      trialStatus: "expired",
      trialSecondsRemaining: 0,
    });

    setMessage("Your trial ended. Activate your plan to keep full access.");
  };

  // Initialize profile form data when user changes
  useEffect(() => {
    if (user) {
      setProfileFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        businessName: user.businessName,
        businessType: user.businessType,
      });
    }
  }, [user]);

  const handleProfileChange = (field: keyof typeof profileFormData) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setProfileFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdatingProfile(true);
    setError(null);
    setMessage(null);

    try {
      // Update local store immediately for optimistic update
      updateUser({
        fullName: profileFormData.fullName,
        email: profileFormData.email,
        phone: profileFormData.phone,
        businessName: profileFormData.businessName,
        businessType: profileFormData.businessType,
        updatedAt: new Date().toISOString(),
      });

      // Optionally call API to persist changes
      // const response = await fetch("/api/user/profile", {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(profileFormData),
      // });
      // if (!response.ok) throw new Error("Failed to update profile");

      setMessage("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update profile. Please try again."
      );
      // Revert to original user data on error
      if (user) {
        setProfileFormData({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          businessName: user.businessName,
          businessType: user.businessType,
        });
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setProfileFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        businessName: user.businessName,
        businessType: user.businessType,
      });
    }
    setIsEditingProfile(false);
    setError(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 text-center">
          <header className="space-y-4">
            <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-900">
              You're browsing as a guest
            </h1>
            <p className="text-base text-neutral-700 dark:text-neutral-700">
              Create a free trial to unlock supplier or trader workspaces, save
              marketplace activity, and manage analytics in real time.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/login"
              className="rounded-xl border border-blue-400/50 bg-blue-500/10 dark:bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-400 dark:text-blue-400 transition hover:bg-blue-500/20 dark:hover:bg-blue-500/20"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-emerald-400/50 bg-emerald-500/10 dark:bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 dark:text-emerald-400 transition hover:bg-emerald-500/20 dark:hover:bg-emerald-500/20"
            >
              Start free trial
            </Link>
            <Link
              href="/plans"
              className="rounded-xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-700 transition hover:border-blue-400/40 hover:text-neutral-900 dark:hover:text-neutral-900"
            >
              Compare plans
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl">
              Welcome back, {user.fullName}
            </h1>
            <p className="max-w-4xl text-md text-neutral-700 dark:text-neutral-700 mt-3">
              Manage your profile details, monitor subscription status, and keep
              your workspace running without interruption.
            </p>
            {formattedJoinedDate ? (
              <p className="text-md text-neutral-700 dark:text-neutral-700">
                Member since {formattedJoinedDate}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={resolvedDashboard}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-neutral-50 dark:text-neutral-50 transition hover:bg-blue-700 dark:hover:bg-blue-700"
            >
              Open dashboard
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg border border-blue-400/40 px-4 py-2 text-sm font-semibold text-blue-400 dark:text-blue-400 transition hover:border-blue-400/60 hover:text-neutral-900 dark:hover:text-neutral-900"
            >
              Explore plans
            </Link>
          </div>
        </header>

        {isTrialActive && currentSubscription?.trialEndsAt ? (
          <TrialBanner
            planName={currentSubscription.plan.name}
            trialEndsAt={currentSubscription.trialEndsAt}
            initialSecondsRemaining={currentSubscription.trialSecondsRemaining}
            onExpired={handleTrialExpired}
          />
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {message}
          </div>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <article className="rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">Profile</h2>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
                  Personal details used for workspace collaboration and compliance
                  notifications.
                </p>
              </div>
              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-400/50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-blue-400 dark:text-blue-400 transition hover:bg-blue-400/10 dark:hover:bg-blue-400/10"
                >
                  <Edit2 className="h-3 w-3" />
                  Edit
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleProfileSubmit} className="mt-6 space-y-4">
                <div className="space-y-3">
                  <ProfileInput
                    label="Full name"
                    value={profileFormData.fullName}
                    onChange={handleProfileChange("fullName")}
                    required
                  />
                  <ProfileInput
                    label="Email"
                    type="email"
                    value={profileFormData.email}
                    onChange={handleProfileChange("email")}
                    required
                  />
                  <ProfileInput
                    label="Phone"
                    value={profileFormData.phone}
                    onChange={handleProfileChange("phone")}
                    required
                  />
                  <ProfileRow
                    label="Role"
                    value={user.role === "supplier" ? "Supplier" : "Trader"}
                    readOnly
                  />
                  <ProfileInput
                    label="Business"
                    value={profileFormData.businessName}
                    onChange={handleProfileChange("businessName")}
                    required
                  />
                  <ProfileInput
                    label="Business type"
                    value={profileFormData.businessType}
                    onChange={handleProfileChange("businessType")}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save className="h-3 w-3" />
                    {isUpdatingProfile ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isUpdatingProfile}
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-700 transition hover:border-neutral-300 dark:hover:border-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <X className="h-3 w-3" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <dl className="mt-6 space-y-3 text-sm text-neutral-700 dark:text-neutral-700">
                  <ProfileRow label="Full name" value={user.fullName} />
                  <ProfileRow label="Email" value={user.email} />
                  <ProfileRow label="Phone" value={user.phone} />
                  <ProfileRow
                    label="Role"
                    value={user.role === "supplier" ? "Supplier" : "Trader"}
                  />
                  <ProfileRow label="Business" value={user.businessName} />
                  <ProfileRow label="Business type" value={user.businessType} />
                </dl>
              </>
            )}
          </article>

          <article className="rounded-3xl border border-blue-500/20 bg-blue-500/10 dark:bg-blue-500/10 p-6 shadow-sm">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                  {planName}
                </h2>
                <p className="text-sm text-blue-400 dark:text-blue-400">{planStatusText}</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-white/10 dark:bg-white/10 px-3 py-1 text-sm font-semibold uppercase text-neutral-700 dark:text-neutral-700">
                {user.role} workspace
              </span>
            </header>

            <div className="mt-4 space-y-2 text-sm text-blue-400 dark:text-blue-400">
              {currentSubscription ? (
                <>
                  <p>
                    Access level:{" "}
                    <span className="font-semibold text-neutral-900 dark:text-neutral-900">
                      {currentSubscription.plan.bestFor}
                    </span>
                  </p>
                  {currentSubscription.trialEndsAt ? (
                    <p>
                      Trial ends:{" "}
                      <span className="font-semibold text-neutral-900 dark:text-neutral-900">
                        {new Date(
                          currentSubscription.trialEndsAt,
                        ).toLocaleString()}
                      </span>
                    </p>
                  ) : null}
                  {currentSubscription.activatedAt ? (
                    <p>
                      Activated:{" "}
                      <span className="font-semibold text-neutral-900 dark:text-neutral-900">
                        {new Date(
                          currentSubscription.activatedAt,
                        ).toLocaleString()}
                      </span>
                    </p>
                  ) : null}
                </>
              ) : (
                <p>Subscription details will appear here shortly.</p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {canActivate ? (
                <button
                  type="button"
                  onClick={() => handleSubscriptionAction("activate")}
                  disabled={processing === "activate" || isLoading}
                  className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-white px-4 py-2 text-sm font-semibold text-blue-900 dark:text-blue-900 transition hover:bg-blue-100 dark:hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing === "activate"
                    ? "Activating..."
                    : "Activate full access"}
                </button>
              ) : null}

              {canCancel ? (
                <button
                  type="button"
                  onClick={() => handleSubscriptionAction("cancel")}
                  disabled={processing === "cancel" || isLoading}
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 dark:border-white/30 px-4 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-900 transition hover:border-white/60 dark:hover:border-white/60 hover:text-blue-400 dark:hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing === "cancel" ? "Canceling..." : "Cancel plan"}
                </button>
              ) : null}

              {canStartTrial ? (
                <button
                  type="button"
                  onClick={() => handleSubscriptionAction("startTrial")}
                  disabled={processing === "startTrial" || isLoading}
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 dark:border-white/30 px-4 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-900 transition hover:border-white/60 dark:hover:border-white/60 hover:text-blue-400 dark:hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing === "startTrial"
                    ? "Starting trial..."
                    : "Restart 1-day trial"}
                </button>
              ) : null}
            </div>

            <section className="mt-6 rounded-2xl border border-white/10 dark:border-white/10 bg-neutral-100/50 dark:bg-neutral-100/50 p-4 text-sm text-neutral-700 dark:text-neutral-700">
              <h3 className="text-md font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-900">
                What's included
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-700">
                {(currentSubscription?.plan.features ?? defaultFeatures(user))
                  .slice(0, 6)
                  .map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 text-blue-400">
                        •
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </section>
          </article>
        </section>

        <section className="rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 px-6 py-8 text-sm text-neutral-700 dark:text-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">Need help?</h2>
          <p className="mt-2">
            Reach out to our team if you need to adjust your plan, add more
            teammates, or connect supplier analytics to your CRM stack.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="mailto:support@kontainarhub.com"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-700 transition hover:border-blue-400 hover:text-neutral-900 dark:hover:text-neutral-900"
            >
              Contact support
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-700 transition hover:border-blue-400 hover:text-neutral-900 dark:hover:text-neutral-900"
            >
              Compare plan tiers
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProfileRow({
  label,
  value,
  readOnly,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-100/70 dark:bg-neutral-100/70 px-4 py-2">
      <span className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-700">
        {label}
      </span>
      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">{value}</span>
    </div>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-lg border border-neutral-200 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-50 px-4 py-2 text-sm text-neutral-900 dark:text-neutral-900 placeholder:text-neutral-700 dark:placeholder:text-neutral-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}

function defaultFeatures(user: AuthUser | null): string[] {
  if (!user) {
    return [
      "Marketplace browsing preview",
      "Saved stores and products",
      "Weekly highlights email",
    ];
  }

  if (user.role === "supplier") {
    return [
      "Supplier dashboard overview",
      "Product catalog insights",
      "Order tracking previews",
      "RFQ highlights",
      "Team collaboration basics",
    ];
  }

  return [
    "Trader dashboard overview",
    "Store management preview",
    "Inventory tracking highlights",
    "Supplier shortlisting",
    "Order workflow insights",
  ];
}

