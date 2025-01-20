import { v } from "convex/values";

import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")
    const userId = identity.subject;
    const document = await ctx.db.query("documents").withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", args.parentDocument)).filter((q) => q.eq(q.field("isArchived"), false)).order("desc").collect()
    return document;
  },
})

export const archive = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.documentId)
    if (!existingDocument) throw new Error("Document not found")

    if (existingDocument.userId !== userId) throw new Error("Not authorized")

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db.query("documents").withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", documentId)).collect()
      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: true })
        await recursiveArchive(child._id)
      }
    }

    const document = await ctx.db.patch(args.documentId, { isArchived: true })
    recursiveArchive(args.documentId)
    return document;
  },
})

export const createDocument = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      userId: userId,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPulished: false,
    })
    return document;
  },
})

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject;
    const document = await ctx.db.query("documents").withIndex("by_user", (q) => q.eq("userId", userId)).filter((q) => q.eq(q.field("isArchived"), true),)
      .order("desc").collect()
    return document;
  }
})

export const restore = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.documentId)
    if (!existingDocument) throw new Error("Document not found")

    if (existingDocument.userId !== userId) throw new Error("Not authorized")

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db.query("documents").withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", documentId)).collect()
      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: false })
        await recursiveRestore(child._id)
      }
    }

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    }

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument)
      if (parent?.isArchived) options.parentDocument = undefined
    }

    const document = await ctx.db.patch(args.documentId, options)

    recursiveRestore(args.documentId)
    return document;
  },
})

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.documentId)
    if (!existingDocument) throw new Error("Document not found")

    if (existingDocument.userId !== userId) throw new Error("Not authorized")

    await ctx.db.delete(args.documentId)
    return existingDocument;
  },
})
