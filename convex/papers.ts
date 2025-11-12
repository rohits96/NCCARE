import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ✅ Upload Paper (Admin Only)
export const uploadPaper = mutation({
  args: {
    title: v.string(),
    subject: v.string(),
    department: v.string(),
    semester: v.number(),
    year: v.number(),
    exam_type: v.string(),
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Admin check
    if (identity.email !== "nccareofficial@gmail.com") {
      throw new Error("Unauthorized: Admin access only");
    }

    const paperId = await ctx.db.insert("papers", {
      ...args,
      verified: true, // 🧪 Testing: set to true for instant visibility (change back to false later)
      uploadedBy: identity.subject,
      createdAt: Date.now(),
    });

    console.log("New paper inserted:", paperId);
    return paperId;
  },
});

// ✅ Get All Papers (For Students - Only Verified)
export const getPapers = query({
  handler: async (ctx) => {
    const papers = await ctx.db
      .query("papers")
      .filter((q) => q.eq(q.field("verified"), true))
      .order("desc")
      .collect();

    return papers;
  },
});

// ✅ Get All Papers (For Admin - All Papers)
export const getAllPapersAdmin = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity || identity.email !== "nccareofficial@gmail.com") {
      throw new Error("Unauthorized: Admin access only");
    }

    const papers = await ctx.db
      .query("papers")
      .order("desc")
      .collect();

    return papers;
  },
});

// ✅ Toggle Verify Paper (Admin Only)
export const toggleVerifyPaper = mutation({
  args: {
    paperId: v.id("papers"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity || identity.email !== "nccareofficial@gmail.com") {
      throw new Error("Unauthorized: Admin access only");
    }

    const paper = await ctx.db.get(args.paperId);
    if (!paper) throw new Error("Paper not found");

    await ctx.db.patch(args.paperId, {
      verified: !paper.verified,
    });

    return { success: true };
  },
});

// ✅ Delete Paper (Admin Only)
export const deletePaper = mutation({
  args: {
    paperId: v.id("papers"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity || identity.email !== "nccareofficial@gmail.com") {
      throw new Error("Unauthorized: Admin access only");
    }

    const paper = await ctx.db.get(args.paperId);
    if (!paper) throw new Error("Paper not found");

    // Delete file from storage
    await ctx.storage.delete(paper.fileId);
    
    // Delete paper record
    await ctx.db.delete(args.paperId);

    return { success: true };
  },
});

// ✅ Generate Upload URL (For file upload)
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

// ✅ Get Download URL (For students to download)
export const getFileUrl = mutation({
  args: {
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});