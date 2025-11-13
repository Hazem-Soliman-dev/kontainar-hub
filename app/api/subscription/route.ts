import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE, verifyAuthToken } from "../../../lib/auth";
import {
  activateSubscription,
  cancelSubscription,
  getUserSubscription,
  listPlans,
  startTrial,
  type SubscriptionPlanId,
} from "../../../lib/mock/subscriptions";

const DEMO_USER_ID = "demo-user";

type SubscriptionAction = "startTrial" | "activate" | "cancel";

interface SubscriptionRequestBody {
  planId?: unknown;
  action?: unknown;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value ?? null;

  const { userId } = await resolveUserContext(token);
  const subscription = getUserSubscription(userId);

  return NextResponse.json({
    subscription,
    plans: listPlans(),
    isAuthenticated: Boolean(token),
  });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value ?? null;
  const { userId } = await resolveUserContext(token);

  let payload: SubscriptionRequestBody;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const validation = validateRequestPayload(payload);

  if (!validation.success) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  const requestData = validation.data;

  try {
    let subscription = getUserSubscription(userId);

    if (requestData.action === "startTrial") {
      subscription = startTrial(userId, requestData.planId);
    } else if (requestData.action === "activate") {
      subscription = activateSubscription(userId, requestData.planId);
    } else if (requestData.action === "cancel") {
      subscription = cancelSubscription(userId);
    }

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error("Subscription action failed", error);
    const message =
      error instanceof Error ? error.message : "Unable to update subscription.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

async function resolveUserContext(token: string | null) {
  if (!token) {
    return { userId: DEMO_USER_ID, authenticated: false };
  }

  try {
    const payload = await verifyAuthToken(token);
    return { userId: payload.sub, authenticated: true };
  } catch (error) {
    console.warn("Failed to verify auth token, using demo user.", error);
    return { userId: DEMO_USER_ID, authenticated: false };
  }
}

type ValidSubscriptionPayload =
  | {
      action: "startTrial" | "activate";
      planId: SubscriptionPlanId;
    }
  | {
      action: "cancel";
      planId?: undefined;
    };

function validateRequestPayload(
  body: SubscriptionRequestBody
):
  | { success: true; data: ValidSubscriptionPayload }
  | { success: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { success: false, error: "Invalid request payload." };
  }

  const { planId, action } = body;

  if (action !== "startTrial" && action !== "activate" && action !== "cancel") {
    return { success: false, error: "Unsupported subscription action." };
  }

  if (action === "cancel") {
    return {
      success: true,
      data: {
        action: "cancel",
      },
    };
  }

  if (typeof planId !== "string" || !isValidPlanId(planId)) {
    return { success: false, error: "Invalid plan selected." };
  }

  if (planId === "free") {
    return { success: false, error: "Free plan does not support this action." };
  }

  return {
    success: true,
    data: {
      planId,
      action,
    },
  };
}

function isValidPlanId(candidate: string): candidate is SubscriptionPlanId {
  return (
    candidate === "free" || candidate === "supplier" || candidate === "trader"
  );
}
