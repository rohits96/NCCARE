import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addAnnouncement = mutation({
  args: { title: v.string(), message: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.email !== "nccareofficial@gmail.com") {
      throw new Error("Not authorized");
    }
    await ctx.db.insert("announcements", {
      title: args.title,
      message: args.message,
      createdAt: Date.now(),
      author: identity.email,
    });
  },
});

export const getAnnouncements = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("announcements")
      .order("desc")
      .collect();
  },
});

