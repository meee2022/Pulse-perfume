import { makeFunctionReference } from "convex/server";

// Untyped references so the app builds before `npx convex dev` generates types.
// After you run convex dev/deploy you can switch to the generated `api` from
// "@/convex/_generated/api" for full type-safety.
export const createOrderRef = makeFunctionReference<"mutation">("orders:createOrder");
export const listOrdersRef = makeFunctionReference<"query">("orders:listOrders");
