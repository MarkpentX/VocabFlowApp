import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { grammarSharedResultsTable } from "@/infrastructure/db/schema/grammar-shared-results-table";
import { GrammarSharedResultRepository } from "@/domain/repositories/grammar-shared-result-repository";
import { CreateSharedResultInput, SharedGrammarResult } from "@/domain/entities/grammar-shared-result";

function toDomain(row: typeof grammarSharedResultsTable.$inferSelect): SharedGrammarResult {
    return {
        id: row.id,
        studentName: row.studentName,
        ruleKeys: row.ruleKeys.split(","),
        questionsCount: row.questionsCount,
        correctCount: row.correctCount,
        maxCombo: row.maxCombo,
        createdAt: row.createdAt,
    };
}

export const drizzleGrammarSharedResultRepository: GrammarSharedResultRepository = {
    async create(userId: string, studentName: string, input: CreateSharedResultInput): Promise<SharedGrammarResult> {
        const [created] = await db
            .insert(grammarSharedResultsTable)
            .values({
                userId,
                studentName,
                ruleKeys: input.ruleKeys.join(","),
                questionsCount: input.questionsCount,
                correctCount: input.correctCount,
                maxCombo: input.maxCombo,
            })
            .returning();

        return toDomain(created);
    },

    async getById(id: string): Promise<SharedGrammarResult | null> {
        const [row] = await db.select().from(grammarSharedResultsTable).where(eq(grammarSharedResultsTable.id, id));
        return row ? toDomain(row) : null;
    },
};
