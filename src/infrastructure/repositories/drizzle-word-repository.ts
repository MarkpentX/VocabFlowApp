import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { wordsTable } from "@/infrastructure/db/schema/words-table";
import { tagsTable } from "@/infrastructure/db/schema/tags-table";
import { WordRepository } from "@/domain/repositories/word-repository";
import { NewWordInput, Word, WordLanguage } from "@/domain/entities/word";

function toDomain(row: typeof wordsTable.$inferSelect): Word {
    return {
        id: row.id,
        infinitive: row.infinitive,
        meaning: row.meaning,
        meaningLang: row.meaningLang as WordLanguage,
        tagId: row.tagId,
    };
}

export const drizzleWordRepository: WordRepository = {
    async create(tagId: string, word: NewWordInput) {
        await db.insert(wordsTable).values({
            infinitive: word.infinitive,
            meaning: word.meaning,
            meaningLang: word.meaningLang,
            tagId,
        });
    },

    async findByTagIds(tagIds: string[]) {
        if (tagIds.length === 0) {
            return [];
        }
        const rows = await db.select().from(wordsTable).where(inArray(wordsTable.tagId, tagIds));
        return rows.map(toDomain);
    },

    async findByUserAndTagName(userId: string, tagName: string) {
        const [tag] = await db
            .select({ id: tagsTable.id })
            .from(tagsTable)
            .where(and(eq(tagsTable.user_id, userId), eq(tagsTable.name, tagName)));

        if (!tag) {
            return [];
        }

        const rows = await db.select().from(wordsTable).where(eq(wordsTable.tagId, tag.id));
        return rows.map(toDomain);
    },

    async delete(id: string) {
        await db.delete(wordsTable).where(eq(wordsTable.id, id));
    },
};
