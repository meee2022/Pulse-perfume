import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function assertAdmin(key: string | undefined) {
  const expected = process.env.ADMIN_KEY;
  if (!expected || key !== expected) throw new Error("unauthorized");
}

const productFields = {
  slug: v.string(),
  name: v.string(),
  meaning: v.string(),
  price: v.number(),
  colorway: v.string(),
  accentHex: v.string(),
  card: v.string(),
  notesTop: v.string(),
  notesHeart: v.string(),
  notesBase: v.string(),
  blurb: v.string(),
  order: v.number(),
  active: v.boolean(),
};

// Public: the storefront reads active products in display order.
// Resolves an uploaded image (cardStorageId) to a URL, overriding `card`.
export const listProducts = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("products").collect();
    rows.sort((a, b) => a.order - b.order);
    return await Promise.all(
      rows.map(async (r) => ({
        ...r,
        card: r.cardStorageId ? (await ctx.storage.getUrl(r.cardStorageId)) ?? r.card : r.card,
      }))
    );
  },
});

// Admin: create/overwrite the whole catalogue (used by the "seed" action).
export const seedProducts = mutation({
  args: { adminKey: v.string(), products: v.array(v.object(productFields)) },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    for (const p of args.products) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", p.slug))
        .unique();
      if (existing) await ctx.db.patch(existing._id, p);
      else await ctx.db.insert("products", p);
    }
    return { count: args.products.length };
  },
});

// Admin: patch a single product (price, name, notes, active, ...).
export const adminUpdateProduct = mutation({
  args: {
    adminKey: v.string(),
    id: v.id("products"),
    patch: v.object({
      name: v.optional(v.string()),
      meaning: v.optional(v.string()),
      price: v.optional(v.number()),
      accentHex: v.optional(v.string()),
      notesTop: v.optional(v.string()),
      notesHeart: v.optional(v.string()),
      notesBase: v.optional(v.string()),
      blurb: v.optional(v.string()),
      order: v.optional(v.number()),
      active: v.optional(v.boolean()),
      cardStorageId: v.optional(v.id("_storage")),
    }),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    await ctx.db.patch(args.id, args.patch);
  },
});
