// convex/announcements.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createAnnouncement = mutation({
  args: {
    title: v.string(),
    message: v.string(),
    priority: v.string(),
    targetDepartment: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("announcements", args);
  },
});

export const getAllAnnouncements = query({
  handler: async (ctx) => {
    return await ctx.db.query("announcements").order("desc").collect();
  },
});

export const updateAnnouncement = mutation({
  args: {
    announcementId: v.id("announcements"),
    title: v.string(),
    message: v.string(),
    priority: v.string(),
    targetDepartment: v.string(),
  },
  handler: async (ctx, args) => {
    const { announcementId, ...updates } = args;
    await ctx.db.patch(announcementId, updates);
  },
});

export const deleteAnnouncement = mutation({
  args: { announcementId: v.id("announcements") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.announcementId);
  },
});