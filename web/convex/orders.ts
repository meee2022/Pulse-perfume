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

// Mirrors SIZES in the web/mobile product data.
const SIZE_MULTIPLIER: Record<string, number> = { "100ml": 1, "3ml": 0.18 };

// Public: create an order from the checkout flow.
// Names, prices and the total are taken from the products table, never from the
// client — a stale app or a hand-crafted request cannot record a wrong price.
export const createOrder = mutation({
  args: { customer, items: v.array(item), total: v.number(), currency: v.string() },
  handler: async (ctx, args) => {
    if (args.items.length === 0) throw new Error("empty order");
    const items = [];
    for (const it of args.items) {
      const p = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", it.productId))
        .unique();
      const mult = SIZE_MULTIPLIER[it.size];
      if (!p || !p.active) throw new Error(`product unavailable: ${it.productId}`);
      if (!mult) throw new Error(`unknown size: ${it.size}`);
      if (!Number.isInteger(it.qty) || it.qty < 1 || it.qty > 50) throw new Error("invalid quantity");
      items.push({ productId: p.slug, name: p.name, size: it.size, qty: it.qty, price: Math.round(p.price * mult) });
    }
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    return await ctx.db.insert("orders", { customer: args.customer, items, total, currency: "QAR", status: "new" });
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
