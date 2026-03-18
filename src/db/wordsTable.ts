import {
    pgTable,
    text,
} from "drizzle-orm/pg-core"
import {tagsTable} from "@/db/tagTable";

export const words = pgTable("words", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    infinitive: text().notNull(),
    meaning: text().notNull(),
    tagId: text("tag_id").references(() => tagsTable.id, {onDelete: "cascade"}).notNull()
})