import { createEventEmitter } from "./event-emitter";
import type { OrderRecord } from "../mock/orders";

type OrdersBusEvents = {
  orderUpdated: OrderRecord;
  orderStatusFailed: { orderId: string; message: string };
};

export const ordersBus = createEventEmitter<OrdersBusEvents>();
