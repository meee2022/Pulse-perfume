import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function assertAdmin(key: string | undefined) {
  const expected = process.env.ADMIN_KEY;
  if (!expected || key !== expected) throw new Error("unauthorized");
}

const customer = v.object({
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  address: v.string(),
  city: v.string(),
});

const item = v.object({
  productId: v.string(),
  name: v.string(),
  size: v.string(),
  qty: v.number(),
  price: v.number(),
});

// Public: create an order from the checkout flow.
export const createOrder = mutation({
  args: { customer, items: v.array(item), total: v.number(), currency: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", { ...args, status: "new" });
  },
});

// Admin: list recent orders (protected — orders hold customer data).
// Returns [] on a wrong key rather than throwing, so the dashboard degrades
// gracefully instead of crashing.
export const listOrders = query({
  args: { adminKey: v.string() },
  handler: async (ctx, args) => {
    if (!process.env.ADMIN_KEY || args.adminKey !== process.env.ADMIN_KEY) return [];
    return await ctx.db.query("orders").order("desc").take(200);
  },
});

// Admin: change an order's status.
export const updateOrderStatus = mutation({
  args: { adminKey: v.string(), id: v.id("orders"), status: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    await ctx.db.patch(args.id, { status: args.status });
  },
});
