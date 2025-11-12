import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  papers: defineTable({
    title: v.string(),
    subject: v.string(),
    department: v.string(),
    semester: v.number(),
    year: v.number(),
    exam_type: v.string(),
    verified: v.boolean(),
    uploadedBy: v.string(),
    fileId: v.id("_storage"),
    createdAt: v.number(),
  })
    .index("by_verified", ["verified"])
    .index("by_department", ["department"]),
});