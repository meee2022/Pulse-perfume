import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

// Create an order (called from the checkout flow)
export const createOrder = mutation({
  args: {
    customer,
    items: v.array(item),
    total: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", { ...args, status: "new" });
  },
});

// List recent orders (for an admin/dashboard)
export const listOrders = query({
  args: {},
  handler: async (ctx) => ctx.db.query("orders").order("desc").take(100),
});
