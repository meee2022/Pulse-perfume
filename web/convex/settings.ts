import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function assertAdmin(key: string | undefined) {
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) throw new Error("unauthorized");
}

// Public: hero/site settings with media URLs resolved.
export const getSettings = query({
  args: {},
  handler: async (ctx) => {
    const s = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site"))
      .unique();
    if (!s) return null;
    return {
      heroEyebrow: s.heroEyebrow ?? null,
      heroTagline: s.heroTagline ?? null,
      heroSub: s.heroSub ?? null,
      heroVideo: s.heroVideoStorageId ? await ctx.storage.getUrl(s.heroVideoStorageId) : null,
      heroPoster: s.heroPosterStorageId ? await ctx.storage.getUrl(s.heroPosterStorageId) : null,
    };
  },
});

// Admin: patch hero/site settings (text and/or media storage ids).
export const updateSettings = mutation({
  args: {
    adminKey: v.string(),
    patch: v.object({
      heroEyebrow: v.optional(v.string()),
      heroTagline: v.optional(v.string()),
      heroSub: v.optional(v.string()),
      heroVideoStorageId: v.optional(v.id("_storage")),
      heroPosterStorageId: v.optional(v.id("_storage")),
    }),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site"))
      .unique();
    if (existing) await ctx.db.patch(existing._id, args.patch);
    else await ctx.db.insert("settings", { key: "site", ...args.patch });
  },
});
