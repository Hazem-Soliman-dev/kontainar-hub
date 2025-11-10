import { createEventEmitter } from "../realtime/event-emitter";

export type OrderStatus = "pending" | "processing" | "fulfilled" | "cancelled";

export interface OrderRecord {
  id: string;
  buyer: string;
  supplier: string;
  product: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  expectedShipDate: string;
  region: string;
}

type OrderEvents = {
  orderUpdated: OrderRecord;
  orderCreated: OrderRecord;
};

export const orderEvents = createEventEmitter<OrderEvents>();

const buyers = [
  "Northwind Traders",
  "Aurora Retail Group",
  "BlueWave Imports",
  "Summit Supply Co.",
  "Harbor & Sons",
  "Latitude Global",
  "Atlas Distribution",
  "Evergreen Holdings",
  "Pulse Medical",
  "Zenith Outlets",
  "Beacon Partners",
  "Lumen Wholesale",
];

const suppliers = [
  "Aurora Commodities",
  "Zenith Devices",
  "Evergreen Supplies",
  "Harbor Textiles",
  "Pulse Medical Goods",
  "Skyline Logistics",
  "Vertex Manufacturing",
  "Atlas Fiber Mills",
];

const products = [
  "Organic Arabica Roast",
  "Smart Cold Chain Sensors",
  "Sustainable Packaging Kit",
  "Technical Denim Roll",
  "Pharma-grade Steel Drums",
  "Industrial IoT Gateway",
  "Cold Storage Container",
  "Solar Micro-inverter",
  "Alloy Fastener Set",
  "Biodegradable Food Wrap",
];

const regions = ["North America", "Europe", "APAC", "MENA", "LATAM"];

const orders = new Map<string, OrderRecord>();

const ORDER_COUNT = 200;
const now = Date.now();

function seedOrders() {
  if (orders.size > 0) {
    return;
  }

  for (let index = 0; index < ORDER_COUNT; index += 1) {
    const status = pickStatus(index);
    const createdOffset = index * 6 * 60 * 60 * 1000; // every 6 hours
    const createdAt = new Date(now - createdOffset);
    const updatedAt =
      status === "pending"
        ? createdAt
        : new Date(createdAt.getTime() + 2 * 60 * 60 * 1000);
    const expectedShipDate = new Date(
      createdAt.getTime() + 3 * 24 * 60 * 60 * 1000
    );

    const record: OrderRecord = {
      id: `ord-${(4820 + index).toString().padStart(4, "0")}`,
      buyer: buyers[index % buyers.length],
      supplier: suppliers[index % suppliers.length],
      product: products[index % products.length],
      quantity: 40 + ((index * 7) % 160),
      total: 3200 + ((index * 157) % 18000),
      region: regions[index % regions.length],
      status,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      expectedShipDate: expectedShipDate.toISOString(),
    };

    orders.set(record.id, record);
  }
}

seedOrders();

export function listOrders() {
  return Array.from(orders.values()).sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}

export function getOrder(orderId: string) {
  return orders.get(orderId) ?? null;
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const record = orders.get(orderId);
  if (!record) {
    throw new Error(`Order ${orderId} not found.`);
  }

  const updated: OrderRecord = {
    ...record,
    status,
    updatedAt: new Date().toISOString(),
  };

  orders.set(orderId, updated);
  orderEvents.emit("orderUpdated", updated);
  return updated;
}

export function createOrder(input: Omit<OrderRecord, "id" | "updatedAt">) {
  const id = `ord-${(5000 + orders.size + 1).toString().padStart(4, "0")}`;
  const record: OrderRecord = {
    ...input,
    id,
    updatedAt: new Date().toISOString(),
  };
  orders.set(id, record);
  orderEvents.emit("orderCreated", record);
  return record;
}

function pickStatus(index: number): OrderStatus {
  if (index % 11 === 0) {
    return "cancelled";
  }
  if (index % 5 === 0) {
    return "processing";
  }
  if (index % 3 === 0) {
    return "fulfilled";
  }
  return "pending";
}
