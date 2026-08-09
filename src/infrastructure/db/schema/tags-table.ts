import { pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "@/infrastructure/db/schema/users-table";

export const tagsTable = pgTable("tags", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    user_id: text("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
});
