import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "@/infrastructure/db/schema/users-table";

export const practiceSessionsTable = pgTable("practice_sessions", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    questionsCount: integer("questions_count").notNull(),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    consumedAt: timestamp("consumed_at"),
    sharedAt: timestamp("shared_at"),
});
