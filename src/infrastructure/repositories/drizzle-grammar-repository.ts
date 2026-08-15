import { and, eq } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { grammarProgressTable } from "@/infrastructure/db/schema/grammar-progress-table";
import { GrammarRepository, GrammarSessionResult } from "@/domain/repositories/grammar-repository";
import { GrammarRuleProgress } from "@/domain/entities/grammar";

export const drizzleGrammarRepository: GrammarRepository = {
    async getProgress(userId: string): Promise<GrammarRuleProgress[]> {
        const rows = await db
            .select()
            .from(grammarProgressTable)
            .where(eq(grammarProgressTable.userId, userId));

        return rows.map((row) => ({
            ruleKey: row.ruleKey,
            attempts: row.attempts,
            correctAttempts: row.correctAttempts,
            bestStreak: row.bestStreak,
            lastPracticedAt: row.lastPracticedAt,
        }));
    },

    async recordSession(userId: string, result: GrammarSessionResult): Promise<void> {
        const [existing] = await db
            .select()
            .from(grammarProgressTable)
            .where(and(eq(grammarProgressTable.userId, userId), eq(grammarProgressTable.ruleKey, result.ruleKey)));

        if (!existing) {
            await db.insert(grammarProgressTable).values({
                userId,
                ruleKey: result.ruleKey,
                attempts: result.attempts,
                correctAttempts: result.correct,
                bestStreak: result.bestStreak,
                lastPracticedAt: new Date(),
            });
            return;
        }

        await db
            .update(grammarProgressTable)
            .set({
                attempts: existing.attempts + result.attempts,
                correctAttempts: existing.correctAttempts + result.correct,
                bestStreak: Math.max(existing.bestStreak, result.bestStreak),
                lastPracticedAt: new Date(),
            })
            .where(eq(grammarProgressTable.id, existing.id));
    },
};
