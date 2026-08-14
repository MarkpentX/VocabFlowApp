import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { wordsTable } from "@/infrastructure/db/schema/words-table";
import { dictionariesTable } from "@/infrastructure/db/schema/dictionaries-table";
import { WordRepository } from "@/domain/repositories/word-repository";
import { NewWordInput, Word, WordLanguage } from "@/domain/entities/word";

function toDomain(row: typeof wordsTable.$inferSelect): Word {
    return {
        id: row.id,
        infinitive: row.infinitive,
        meaning: row.meaning,
        meaningLang: row.meaningLang as WordLanguage,
        dictionaryId: row.dictionaryId,
    };
}

export const drizzleWordRepository: WordRepository = {
    async create(dictionaryId: string, word: NewWordInput) {
        await db.insert(wordsTable).values({
            infinitive: word.infinitive,
            meaning: word.meaning,
            meaningLang: word.meaningLang,
            dictionaryId,
        });
    },

    async findByDictionaryIds(dictionaryIds: string[]) {
        if (dictionaryIds.length === 0) {
            return [];
        }
        const rows = await db.select().from(wordsTable).where(inArray(wordsTable.dictionaryId, dictionaryIds));
        return rows.map(toDomain);
    },

    async findByUserAndDictionaryName(userId: string, dictionaryName: string) {
        const [dictionary] = await db
            .select({ id: dictionariesTable.id })
            .from(dictionariesTable)
            .where(and(eq(dictionariesTable.user_id, userId), eq(dictionariesTable.name, dictionaryName)));

        if (!dictionary) {
            return [];
        }

        const rows = await db.select().from(wordsTable).where(eq(wordsTable.dictionaryId, dictionary.id));
        return rows.map(toDomain);
    },

    async findByUserAndDictionaryIds(userId: string, dictionaryIds: string[]) {
        if (dictionaryIds.length === 0) {
            return [];
        }

        const ownedDictionaries = await db
            .select({ id: dictionariesTable.id })
            .from(dictionariesTable)
            .where(and(eq(dictionariesTable.user_id, userId), inArray(dictionariesTable.id, dictionaryIds)));

        if (ownedDictionaries.length === 0) {
            return [];
        }

        const rows = await db
            .select()
            .from(wordsTable)
            .where(inArray(wordsTable.dictionaryId, ownedDictionaries.map((d) => d.id)));
        return rows.map(toDomain);
    },

    async delete(id: string) {
        await db.delete(wordsTable).where(eq(wordsTable.id, id));
    },
};
