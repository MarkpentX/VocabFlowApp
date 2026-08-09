import { pgTable, text } from "drizzle-orm/pg-core";
import { tagsTable } from "@/infrastructure/db/schema/tags-table";

export const wordsTable = pgTable("words", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    infinitive: text().notNull(),
    meaning: text().notNull(),
    meaningLang: text("meaning_lang", { enum: ["en", "ru", "uk"] })
        .notNull()
        .default("en"),
    tagId: text("tag_id").references(() => tagsTable.id, { onDelete: "cascade" }).notNull(),
});
