import { pgTable, text, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "@/infrastructure/db/schema/users-table";

export const grammarProgressTable = pgTable(
    "grammar_progress",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        userId: text("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        ruleKey: text("rule_key").notNull(),
        attempts: integer("attempts").notNull().default(0),
        correctAttempts: integer("correct_attempts").notNull().default(0),
        bestStreak: integer("best_streak").notNull().default(0),
        lastPracticedAt: timestamp("last_practiced_at"),
    },
    (table) => [uniqueIndex("grammar_progress_user_rule_idx").on(table.userId, table.ruleKey)]
);
