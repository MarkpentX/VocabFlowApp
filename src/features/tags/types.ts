import {tagsTable} from "@/db/schema";

export type DbTag = typeof tagsTable.$inferSelect;