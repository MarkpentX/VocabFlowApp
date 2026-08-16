import { and, eq } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { dictionariesTable } from "@/infrastructure/db/schema/dictionaries-table";
import { wordsTable } from "@/infrastructure/db/schema/words-table";
import { DictionaryRepository } from "@/domain/repositories/dictionary-repository";
import { Dictionary } from "@/domain/entities/dictionary";

function toDomain(row: typeof dictionariesTable.$inferSelect): Dictionary {
    return { id: row.id, name: row.name, userId: row.user_id };
}

export const drizzleDictionaryRepository: DictionaryRepository = {
    async create(userId: string, name: string) {
        const [createdDictionary] = await db.insert(dictionariesTable).values({ name, user_id: userId }).returning();
        return toDomain(createdDictionary);
    },

    async findByUserAndName(userId: string, name: string) {
        const [dictionary] = await db
            .select()
            .from(dictionariesTable)
            .where(and(eq(dictionariesTable.user_id, userId), eq(dictionariesTable.name, name)));
        return dictionary ? toDomain(dictionary) : null;
    },

    async findAllByUser(userId: string) {
        const rows = await db.select().from(dictionariesTable).where(eq(dictionariesTable.user_id, userId));
        return rows.map(toDomain);
    },

    async findAllWithWordsCount(userId: string) {
        return db
            .select({
                id: dictionariesTable.id,
                title: dictionariesTable.name,
                wordsCount: db.$count(wordsTable, eq(wordsTable.dictionaryId, dictionariesTable.id)),
            })
            .from(dictionariesTable)
            .where(eq(dictionariesTable.user_id, userId));
    },

    async delete(id: string, userId: string) {
        await db.delete(dictionariesTable).where(and(eq(dictionariesTable.id, id), eq(dictionariesTable.user_id, userId)));
    },
};
