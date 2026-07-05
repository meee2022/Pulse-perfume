import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Admin: get a short-lived URL to upload an image/video to Convex storage.
export const generateUploadUrl = mutation({
  args: { adminKey: v.string() },
  handler: async (ctx, args) => {
    if (!process.env.ADMIN_KEY || args.adminKey !== process.env.ADMIN_KEY) throw new Error("unauthorized");
    return await ctx.storage.generateUploadUrl();
  },
});
