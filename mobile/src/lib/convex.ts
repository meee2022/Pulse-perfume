// Lightweight Convex bridge for the mobile app.
// Sends checkout orders to the SAME backend the web admin dashboard reads,
// so mobile orders show up in /admin alongside web orders.
import { ConvexReactClient } from "convex/react";
import { makeFunctionReference } from "convex/server";

// Public deployment URL (same as the web NEXT_PUBLIC_CONVEX_URL). Override via
// EXPO_PUBLIC_CONVEX_URL if the deployment ever changes.
const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL ?? "https://notable-lemming-557.convex.cloud";

export const CONVEX_ENABLED = !!CONVEX_URL;

const client = new ConvexReactClient(CONVEX_URL);

const createOrderRef = makeFunctionReference<"mutation">("orders:createOrder");

export type OrderCustomer = { name: string; email: string; phone: string; address: string; city: string };
export type OrderItem = { productId: string; name: string; size: string; qty: number; price: number };

export async function submitOrder(input: {
  customer: OrderCustomer;
  items: OrderItem[];
  total: number;
  currency: string;
}): Promise<string> {
  // returns the new order id
  return client.mutation(createOrderRef, input);
}
