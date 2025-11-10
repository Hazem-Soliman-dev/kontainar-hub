"use client";

import { useCallback, useEffect } from "react";
import useSWR from "swr";

import type { OrderRecord, OrderStatus } from "../lib/mock/orders";
import { ordersBus } from "../lib/realtime/orders-bus";

interface OrdersResponse {
  orders: OrderRecord[];
}

const fetcher = async (input: RequestInfo) => {
  const response = await fetch(input, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch orders.");
  }
  return (await response.json()) as OrdersResponse;
};

export function useRealtimeOrders() {
  const { data, error, isLoading, mutate } = useSWR<OrdersResponse>(
    "/api/orders",
    fetcher,
    {
      refreshInterval: 15000,
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    const unsubscribe = ordersBus.on("orderUpdated", (order) => {
      mutate(
        (current) => {
          const base = current ?? { orders: [] };
          const exists = base.orders.some(
            (existing) => existing.id === order.id
          );
          return {
            orders: exists
              ? base.orders.map((existing) =>
                  existing.id === order.id ? order : existing
                )
              : [order, ...base.orders],
          };
        },
        { revalidate: false }
      );
    });

    return () => unsubscribe();
  }, [mutate]);

  const updateOrderStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      let previous: OrdersResponse | undefined;

      await mutate(
        async (current) => {
          previous = current ?? { orders: [] };

          const optimistic = {
            orders: previous.orders.map((order) =>
              order.id === orderId ? { ...order, status } : order
            ),
          };

          try {
            const response = await fetch("/api/orders", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ orderId, status }),
            });

            const payload = await response.json();

            if (!response.ok) {
              throw new Error(payload?.message ?? "Unable to update order.");
            }

            ordersBus.emit("orderUpdated", payload.order as OrderRecord);
            return optimistic;
          } catch (error) {
            ordersBus.emit("orderStatusFailed", {
              orderId,
              message:
                error instanceof Error
                  ? error.message
                  : "Unable to update order.",
            });
            throw error;
          }
        },
        {
          optimisticData: (current) => ({
            orders: (current ?? { orders: [] }).orders.map((order) =>
              order.id === orderId ? { ...order, status } : order
            ),
          }),
          rollbackOnError: true,
          revalidate: false,
        }
      );

      // ensure final state stays in sync
      await mutate();
    },
    [mutate]
  );

  return {
    orders: data?.orders ?? [],
    isLoading,
    isError: Boolean(error),
    error,
    refresh: () => mutate(),
    updateOrderStatus,
  };
}
