import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE, verifyAuthToken } from "../../../lib/auth";
import {
  listOrders,
  updateOrderStatus,
  type OrderStatus,
} from "../../../lib/mock/orders";

interface UpdateOrderRequest {
  orderId?: unknown;
  status?: unknown;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (token) {
    try {
      await verifyAuthToken(token);
    } catch (error) {
      console.warn("Invalid auth token provided, continuing as guest.", error);
    }
  }

  const orders = listOrders();
  return NextResponse.json({ orders });
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (token) {
    try {
      await verifyAuthToken(token);
    } catch (error) {
      console.warn("Invalid auth token provided, continuing as guest.", error);
    }
  }

  let payload: UpdateOrderRequest;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const validation = validatePayload(payload);

  if (!validation.success) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  try {
    const order = updateOrderStatus(
      validation.data.orderId,
      validation.data.status
    );
    return NextResponse.json({ order });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update order status.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

function validatePayload(payload: UpdateOrderRequest):
  | {
      success: true;
      data: { orderId: string; status: OrderStatus };
    }
  | { success: false; error: string } {
  if (typeof payload !== "object" || payload === null) {
    return { success: false, error: "Invalid request payload." };
  }

  const { orderId, status } = payload;

  if (typeof orderId !== "string" || orderId.trim().length === 0) {
    return { success: false, error: "Order ID is required." };
  }

  if (
    status !== "pending" &&
    status !== "processing" &&
    status !== "fulfilled" &&
    status !== "cancelled"
  ) {
    return { success: false, error: "Unsupported status." };
  }

  return {
    success: true,
    data: {
      orderId,
      status,
    },
  };
}
