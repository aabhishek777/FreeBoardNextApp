import {v} from "convex/values";
import {mutation} from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) throw new Error("you are not authrized");
    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      imageUrl: randomImage,
      authorId: identity.subject,
      authorName: identity.name!,
    });
    return board;
  },
});

export const deleteCard = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authorized!");

      const existingFavorite =await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
			    q
				.eq("userId",identity.subject)
				.eq("boardsId",args.id)
        )
        .unique();

		if (existingFavorite) {
			await ctx.db.delete(existingFavorite._id);
		}
      return await ctx.db.delete(args.id);
    } catch (error) {
      console.log(error);
    }
  },
});

export const updateCard = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      const title = args.title.trim();
      if (!identity) throw new Error("not authorized!");
      if (!title) throw new Error("empty Title");
      if (title.length > 60) throw new Error("length is too large");
      return ctx.db.patch(args.id, {title: args.title});
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
});

export const favorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("UnAuthorized!");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("no board found!");
    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardsId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    if (existingFavorite) throw new Error("already favorite");

    return await ctx.db.insert("userFavorites", {
      orgId: args.orgId,
      userId,
      boardsId: board._id,
    });
  },
});

export const unFavorite = mutation({
  args: {
    id: v.id("boards"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("UnAuthorized!");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("no board found!");
    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardsId", board._id)
      )
      .unique();

    if (!existingFavorite) throw new Error("not exist");

    return await ctx.db.delete(existingFavorite._id);
  },
});
