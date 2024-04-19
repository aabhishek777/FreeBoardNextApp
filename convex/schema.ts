import {v} from "convex/values";

import {defineSchema, defineTable} from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    imageUrl: v.string(),
    authorName: v.string(),
    authorId: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardsId: v.id("boards"),
  })
    .index("by_board", ["boardsId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board", ["userId", "boardsId"])
    .index("by_user_board_org", ["userId", "boardsId", "orgId"]),
});
