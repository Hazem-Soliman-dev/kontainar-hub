import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE, verifyAuthToken } from "./lib/auth-token";
import {
  ensureAccess,
  type SubscriptionPlanId,
} from "./lib/mock/subscriptions";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.next();
  }

  try {
    const payload = await verifyAuthToken(token);
    const requiredPlan = resolveRequiredPlan(request.nextUrl.pathname);

    if (requiredPlan) {
      const access = ensureAccess(payload.sub, requiredPlan);

      if (!access.allowed) {
        return redirectToPlans(request, requiredPlan);
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

function resolveRequiredPlan(pathname: string): SubscriptionPlanId | null {
  if (pathname.startsWith("/supplier")) {
    return "supplier";
  }

  if (pathname.startsWith("/trader")) {
    return "trader";
  }

  return null;
}

function redirectToPlans(request: NextRequest, plan: SubscriptionPlanId) {
  const redirectUrl = new URL("/plans", request.url);
  redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
  redirectUrl.searchParams.set("plan", plan);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/supplier/:path*", "/trader/:path*"],
};
