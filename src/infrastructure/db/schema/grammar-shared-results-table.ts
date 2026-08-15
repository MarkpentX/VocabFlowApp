import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "@/infrastructure/db/schema/users-table";

export const grammarSharedResultsTable = pgTable("grammar_shared_results", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    studentName: text("student_name").notNull(),
    ruleKeys: text("rule_keys").notNull(),
    questionsCount: integer("questions_count").notNull(),
    correctCount: integer("correct_count").notNull(),
    maxCombo: integer("max_combo").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
