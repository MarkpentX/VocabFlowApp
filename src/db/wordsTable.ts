import {
    pgTable,
    text,
} from "drizzle-orm/pg-core"
import {users} from "@/db/usersTable";

export const words = pgTable("words", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    infinitive: text().notNull(),
    meaning: text().notNull(),
    tag: text().notNull(),
    user_id: text("user_id").references(() => users.id, {onDelete: "cascade"})
})