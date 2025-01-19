import { v } from "convex/values";

import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

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
