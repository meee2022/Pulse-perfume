import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// PULSE — Convex data model
export default defineSchema({
  orders: defineTable({
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
    }),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        size: v.string(),
        qty: v.number(),
        price: v.number(),
      })
    ),
    total: v.number(),
    currency: v.string(),
    status: v.string(), // "new" | "preparing" | "shipped" | "delivered"
  }).index("by_status", ["status"]),
});
