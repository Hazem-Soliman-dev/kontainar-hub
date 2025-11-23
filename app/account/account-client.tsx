"use client";

import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Edit2, Save, X } from "lucide-react";

import { TrialBanner } from "../../components/subscription/trial-banner";
import { Breadcrumb } from "../../components/ui/breadcrumb";
import { useAuthStore, type AuthUser } from "../../lib/store/auth-store";
import { useLanguage } from "../../components/providers/language-provider";
import { MotionWrapper } from "../../components/ui/motion-wrapper";
import type {
  SubscriptionPlanId,
  SubscriptionSnapshot,
} from "../../lib/mock/subscriptions";

type SubscriptionActionType = "startTrial" | "activate" | "cancel";

export function AccountClient() {
  const { t } = useLanguage();
  const user = useAuthStore((state) => state.user);
  const subscription = useAuthStore((state) => state.subscription);
  const dashboardPath = useAuthStore((state) => state.dashboardPath);
  const updateSubscription = useAuthStore((state) => state.updateSubscription);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [isLoading, setIsLoading] = useState<boolean>(
    Boolean(user && !subscription)
  );
  const [processing, setProcessing] = useState<SubscriptionActionType | null>(
    null
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
            data?.message ?? t("home.accountPage.errors.loadSubscriptionFailed")
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
              : t("home.accountPage.errors.loadSubscriptionFailed")
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
  const planName = currentSubscription?.plan.name
    ? t(`home.plansPage.plans.${currentSubscription.plan.id}.name`) ||
      currentSubscription.plan.name
    : user
    ? t("home.plansPage.plans.free.name")
    : t("home.accountPage.guestPlan");

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
      return t("home.accountPage.subscription.status.freePreview");
    }

    switch (currentSubscription.status) {
      case "trial":
        return currentSubscription.isTrialActive
          ? t("home.accountPage.subscription.status.trialActive")
          : t("home.accountPage.subscription.status.trialEnded");
      case "active":
        return t("home.accountPage.subscription.status.active");
      case "expired":
        return t("home.accountPage.subscription.status.expired");
      case "canceled":
        return t("home.accountPage.subscription.status.canceled");
      default:
        return t("home.accountPage.subscription.status.freePreview");
    }
  }, [currentSubscription, t]);

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
      setError(t("home.accountPage.errors.signInRequired"));
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
              }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ?? t("home.accountPage.errors.updateSubscriptionFailed")
        );
      }

      updateSubscription(data.subscription as SubscriptionSnapshot);

      setMessage(
        action === "activate"
          ? t("home.accountPage.messages.activated")
          : action === "cancel"
          ? t("home.accountPage.messages.canceled")
          : t("home.accountPage.messages.trialRestarted")
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("home.accountPage.errors.updateSubscriptionFailed")
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

    setMessage(t("home.accountPage.messages.trialEnded"));
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

  const handleProfileChange =
    (field: keyof typeof profileFormData) =>
    (e: ChangeEvent<HTMLInputElement>) => {
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

      setMessage(t("home.accountPage.messages.profileUpdated"));
      setIsEditingProfile(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("home.accountPage.errors.updateProfileFailed")
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
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-8 pb-16 text-center">
          <Breadcrumb />

          <div className="max-w-md mx-auto space-y-6">
            <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-6 w-fit mx-auto">
              <svg
                className="h-16 w-16 text-neutral-400 dark:text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                {t("home.accountPage.signInRequired.title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {t("home.accountPage.signInRequired.description")}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {t("home.accountPage.signInRequired.signIn")}
              </Link>
              <Link
                href="/register"
                className="rounded-xl border-2 border-primary-200 dark:border-primary-900/50 px-6 py-3 text-sm font-semibold text-primary-700 dark:text-primary-400 transition-all hover:bg-primary-50 dark:hover:bg-primary-950/30"
              >
                {t("home.accountPage.signInRequired.createAccount")}
              </Link>
            </div>
            <Link
              href="/plans"
              className="inline-block text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t("home.accountPage.signInRequired.viewPlans")}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Banner */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />
        <MotionWrapper variant="fade-up" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-2">
                {user.fullName}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                {user.role === "supplier"
                  ? t("home.accountPage.role.supplier")
                  : t("home.accountPage.role.trader")}{" "}
                {t("home.accountPage.account")}
                {formattedJoinedDate && (
                  <span className="ml-3 text-neutral-500 dark:text-neutral-500">
                    {t("home.accountPage.memberSince")} {formattedJoinedDate}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={resolvedDashboard}
                className="inline-flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {t("home.accountPage.buttons.openDashboard")}
              </Link>
              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded-xl border-2 border-neutral-300 dark:border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-200 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {t("home.accountPage.buttons.viewPlans")}
              </Link>
            </div>
          </div>
        </MotionWrapper>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        {isTrialActive && currentSubscription?.trialEndsAt ? (
          <TrialBanner
            planName={currentSubscription.plan.name}
            trialEndsAt={currentSubscription.trialEndsAt}
            initialSecondsRemaining={currentSubscription.trialSecondsRemaining}
            onExpired={handleTrialExpired}
          />
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-600 dark:text-red-400 mb-6">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400 mb-6">
            {message}
          </div>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-2">
          <MotionWrapper variant="slide-right" delay={0.1} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {t("home.accountPage.profile.title")}
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {t("home.accountPage.profile.description")}
                </p>
              </div>
              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 dark:border-blue-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-100 transition-all hover:bg-primary-50 dark:hover:bg-blue-950/30"
                >
                  <Edit2 className="h-3 w-3" />
                  {t("home.accountPage.profile.edit")}
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="space-y-3">
                  <ProfileInput
                    label={t("home.accountPage.profile.fields.fullName")}
                    value={profileFormData.fullName}
                    onChange={handleProfileChange("fullName")}
                    required
                  />
                  <ProfileInput
                    label={t("home.accountPage.profile.fields.email")}
                    type="email"
                    value={profileFormData.email}
                    onChange={handleProfileChange("email")}
                    required
                  />
                  <ProfileInput
                    label={t("home.accountPage.profile.fields.phone")}
                    value={profileFormData.phone}
                    onChange={handleProfileChange("phone")}
                    required
                  />
                  <ProfileRow
                    label={t("home.accountPage.profile.fields.role")}
                    value={
                      user.role === "supplier"
                        ? t("home.accountPage.role.supplier")
                        : t("home.accountPage.role.trader")
                    }
                    readOnly
                  />
                  <ProfileInput
                    label={t("home.accountPage.profile.fields.business")}
                    value={profileFormData.businessName}
                    onChange={handleProfileChange("businessName")}
                    required
                  />
                  <ProfileInput
                    label={t("home.accountPage.profile.fields.businessType")}
                    value={profileFormData.businessType}
                    onChange={handleProfileChange("businessType")}
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 hover:scale-105"
                  >
                    <Save className="h-4 w-4" />
                    {isUpdatingProfile
                      ? t("home.accountPage.profile.updating")
                      : t("home.accountPage.profile.saveChanges")}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isUpdatingProfile}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-100 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <X className="h-4 w-4" />
                    {t("home.accountPage.profile.cancel")}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <dl className="space-y-3 text-sm">
                  <ProfileRow
                    label={t("home.accountPage.profile.fields.fullName")}
                    value={user.fullName}
                  />
                  <ProfileRow
                    label={t("home.accountPage.profile.fields.email")}
                    value={user.email}
                  />
                  <ProfileRow
                    label={t("home.accountPage.profile.fields.phone")}
                    value={user.phone}
                  />
                  <ProfileRow
                    label={t("home.accountPage.profile.fields.role")}
                    value={
                      user.role === "supplier"
                        ? t("home.accountPage.role.supplier")
                        : t("home.accountPage.role.trader")
                    }
                  />
                  <ProfileRow
                    label={t("home.accountPage.profile.fields.business")}
                    value={user.businessName}
                  />
                  <ProfileRow
                    label={t("home.accountPage.profile.fields.businessType")}
                    value={user.businessType}
                  />
                </dl>
              </>
            )}
          </MotionWrapper>

          <MotionWrapper variant="slide-left" delay={0.2} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-900/50 p-6 sm:p-8 shadow-sm">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {planName}
                </h2>
                <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                  {planStatusText}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-950/50 px-4 py-1.5 text-xs font-semibold uppercase text-primary-700 dark:text-neutral-100">
                {user.role === "supplier"
                  ? t("home.accountPage.role.supplier")
                  : t("home.accountPage.role.trader")}{" "}
                {t("home.accountPage.workspace")}
              </span>
            </header>

            <div className="space-y-3 mb-6 text-sm text-neutral-600 dark:text-neutral-400">
              {currentSubscription ? (
                <>
                  <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-800">
                    <span>
                      {t("home.accountPage.subscription.accessLevel")}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {currentSubscription.plan.bestFor}
                    </span>
                  </div>
                  {currentSubscription.trialEndsAt ? (
                    <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-800">
                      <span>
                        {t("home.accountPage.subscription.trialEnds")}
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {new Date(
                          currentSubscription.trialEndsAt
                        ).toLocaleString()}
                      </span>
                    </div>
                  ) : null}
                  {currentSubscription.activatedAt ? (
                    <div className="flex justify-between py-2">
                      <span>
                        {t("home.accountPage.subscription.activated")}
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {new Date(
                          currentSubscription.activatedAt
                        ).toLocaleString()}
                      </span>
                    </div>
                  ) : null}
                </>
              ) : (
                <p>{t("home.accountPage.subscription.loading")}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {canActivate ? (
                <button
                  type="button"
                  onClick={() => handleSubscriptionAction("activate")}
                  disabled={processing === "activate" || isLoading}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing === "activate"
                    ? t("home.accountPage.subscription.buttons.activating")
                    : t("home.accountPage.subscription.buttons.activate")}
                </button>
              ) : null}

              {canCancel ? (
                <button
                  type="button"
                  onClick={() => handleSubscriptionAction("cancel")}
                  disabled={processing === "cancel" || isLoading}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-neutral-200 dark:border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-100 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing === "cancel"
                    ? t("home.accountPage.subscription.buttons.canceling")
                    : t("home.accountPage.subscription.buttons.cancel")}
                </button>
              ) : null}

              {canStartTrial ? (
                <button
                  type="button"
                  onClick={() => handleSubscriptionAction("startTrial")}
                  disabled={processing === "startTrial" || isLoading}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-primary-200 dark:border-blue-400/50 px-6 py-3 text-sm font-semibold text-primary-700 dark:text-neutral-100 transition-all hover:bg-primary-50 dark:hover:bg-blue-950/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing === "startTrial"
                    ? t("home.accountPage.subscription.buttons.startingTrial")
                    : t("home.accountPage.subscription.buttons.restartTrial")}
                </button>
              ) : null}
            </div>

            <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 p-4 sm:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">
                {t("home.accountPage.subscription.whatsIncluded")}
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                {(
                  currentSubscription?.plan.features ?? defaultFeatures(user, t)
                )
                  .slice(0, 6)
                  .map((feature, index) => {
                    // Translate plan features if they exist
                    const featureMap: Record<string, Record<string, string>> = {
                      free: {
                        "Access to public landing pages":
                          "home.plansPage.features.free.feature1",
                        "Featured categories preview":
                          "home.plansPage.features.free.feature2",
                        "Featured stores carousel":
                          "home.plansPage.features.free.feature3",
                        "Best sellers teaser data":
                          "home.plansPage.features.free.feature4",
                      },
                      supplier: {
                        "Supplier dashboard & analytics":
                          "home.plansPage.features.supplier.feature1",
                        "Product catalog management (CRUD)":
                          "home.plansPage.features.supplier.feature2",
                        "Order pipeline with status updates":
                          "home.plansPage.features.supplier.feature3",
                        "Real-time order notifications":
                          "home.plansPage.features.supplier.feature4",
                        "Access to trader inquiries":
                          "home.plansPage.features.supplier.feature5",
                      },
                      trader: {
                        "Trader dashboard & analytics":
                          "home.plansPage.features.trader.feature1",
                        "Multi-store management":
                          "home.plansPage.features.trader.feature2",
                        "Inventory sync across suppliers":
                          "home.plansPage.features.trader.feature3",
                        "Order tracking & team collaboration":
                          "home.plansPage.features.trader.feature4",
                        "Supplier performance insights":
                          "home.plansPage.features.trader.feature5",
                      },
                    };

                    const planId =
                      currentSubscription?.planId ||
                      (user?.role === "supplier" ? "supplier" : "trader");
                    const translatedFeature = featureMap[planId]?.[feature]
                      ? t(featureMap[planId][feature] as any)
                      : feature;

                    return (
                      <li
                        key={`${feature}-${index}`}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center">
                          <svg
                            className="h-3 w-3 text-primary-600 dark:text-primary-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span>{translatedFeature}</span>
                      </li>
                    );
                  })}
              </ul>
            </section>
          </MotionWrapper>
        </section>

        <MotionWrapper variant="fade-up" delay={0.3} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 px-6 py-8 mt-8">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            {t("home.accountPage.help.title")}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            {t("home.accountPage.help.description")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="mailto:support@tajirjomlahub.com"
              className="inline-flex items-center justify-center rounded-xl border-2 border-neutral-200 dark:border-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-100 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {t("home.accountPage.help.contactSupport")}
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-xl border-2 border-primary-200 dark:border-blue-400/50 px-5 py-2.5 text-sm font-semibold text-primary-700 dark:text-neutral-100 transition-all hover:bg-primary-50 dark:hover:bg-blue-950/30"
            >
              {t("home.accountPage.help.comparePlans")}
            </Link>
          </div>
        </MotionWrapper>
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
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 px-4 py-3">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {value}
      </span>
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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-500 focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
      />
    </div>
  );
}

function defaultFeatures(user: AuthUser | null, t: (key: string) => string): string[] {
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
