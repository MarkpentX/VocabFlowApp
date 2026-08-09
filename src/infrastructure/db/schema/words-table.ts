import { pgTable, text } from "drizzle-orm/pg-core";
import { dictionariesTable } from "@/infrastructure/db/schema/dictionaries-table";

export const wordsTable = pgTable("words", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    infinitive: text().notNull(),
    meaning: text().notNull(),
    meaningLang: text("meaning_lang", { enum: ["en", "ru", "uk"] })
        .notNull()
        .default("en"),
    dictionaryId: text("dictionary_id").references(() => dictionariesTable.id, { onDelete: "cascade" }).notNull(),
});
