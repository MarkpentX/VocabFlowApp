import {tagsTable} from "@/db/schema";

export type DbTag = typeof tagsTable.$inferSelect;

export type TagsWithWords = {
    id: string;
    title: string;
    wordsCount: number;
}