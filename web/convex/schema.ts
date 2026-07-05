import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// PULSE — Convex data model
export default defineSchema({
  products: defineTable({
    slug: v.string(),
    name: v.string(),
    meaning: v.string(),
    price: v.number(),
    colorway: v.string(),
    accentHex: v.string(),
    card: v.string(), // static path fallback
    cardStorageId: v.optional(v.id("_storage")), // uploaded image (overrides card)
    notesTop: v.string(),
    notesHeart: v.string(),
    notesBase: v.string(),
    blurb: v.string(),
    order: v.number(),
    active: v.boolean(),
  }).index("by_slug", ["slug"]),

  // single-document site settings (hero, etc.)
  settings: defineTable({
    key: v.string(), // always "site"
    heroEyebrow: v.optional(v.string()),
    heroTagline: v.optional(v.string()),
    heroSub: v.optional(v.string()),
    heroVideoStorageId: v.optional(v.id("_storage")),
    heroPosterStorageId: v.optional(v.id("_storage")),
  }).index("by_key", ["key"]),

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
    status: v.string(),
  }).index("by_status", ["status"]),
});
