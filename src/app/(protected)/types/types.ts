import {tagsTable} from "@/db/tagTable";

export type GetUserStatsResp = {
    userWordsCount: number
    userTagsCount: number
}

export type DbTag = typeof tagsTable.$inferSelect;