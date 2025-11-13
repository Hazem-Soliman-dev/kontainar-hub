import { NextResponse } from "next/server";

import {
  AUTH_COOKIE,
  buildAuthUser,
  generateAuthToken,
  getCookieOptions,
} from "./auth";
import type { PublicUser, UserRole } from "./mock/db";
import {
  getUserSubscription,
  startTrial,
  type SubscriptionSnapshot,
} from "./mock/subscriptions";

export interface AuthSuccessBody {
  user: ReturnType<typeof buildAuthUser>;
  token: string;
  dashboardPath: string;
  subscription: SubscriptionSnapshot;
}

export async function respondWithAuthSuccess(
  user: PublicUser,
  init?: ResponseInit,
  options?: { subscription?: SubscriptionSnapshot }
) {
  const token = await generateAuthToken(user);
  let subscription =
    options?.subscription ?? getUserSubscription(user.id);

  const needsTrial =
    subscription.planId !== user.role ||
    (subscription.planId === user.role &&
      ((subscription.status === "trial" && !subscription.isTrialActive) ||
        subscription.status === "expired" ||
        subscription.status === "canceled"));

  if (needsTrial) {
    subscription = startTrial(user.id, user.role);
  }

  const response = NextResponse.json<AuthSuccessBody>(
    {
      user: buildAuthUser(user),
      token,
      dashboardPath: resolveDashboardPath(user.role),
      subscription,
    },
    init
  );

  response.cookies.set(AUTH_COOKIE, token, getCookieOptions());

  return response;
}

export function resolveDashboardPath(role: UserRole) {
  return role === "supplier" ? "/supplier/dashboard" : "/trader/dashboard";
}
