import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { practiceSessionsTable } from "@/infrastructure/db/schema/practice-sessions-table";
import { PracticeSessionRepository } from "@/domain/repositories/practice-session-repository";

export const drizzlePracticeSessionRepository: PracticeSessionRepository = {
    async create(userId: string, questionsCount: number) {
        const [created] = await db
            .insert(practiceSessionsTable)
            .values({ userId, questionsCount })
            .returning({ id: practiceSessionsTable.id, questionsCount: practiceSessionsTable.questionsCount });

        return created;
    },

    async consume(id: string, userId: string) {
        const [consumed] = await db
            .update(practiceSessionsTable)
            .set({ consumedAt: sql`now()` })
            .where(
                and(
                    eq(practiceSessionsTable.id, id),
                    eq(practiceSessionsTable.userId, userId),
                    isNull(practiceSessionsTable.consumedAt)
                )
            )
            .returning({ questionsCount: practiceSessionsTable.questionsCount, startedAt: practiceSessionsTable.startedAt });

        return consumed ?? null;
    },

    async markShared(id: string, userId: string) {
        const [shared] = await db
            .update(practiceSessionsTable)
            .set({ sharedAt: sql`now()` })
            .where(
                and(
                    eq(practiceSessionsTable.id, id),
                    eq(practiceSessionsTable.userId, userId),
                    isNull(practiceSessionsTable.sharedAt)
                )
            )
            .returning({ questionsCount: practiceSessionsTable.questionsCount, startedAt: practiceSessionsTable.startedAt });

        return shared ?? null;
    },
};
