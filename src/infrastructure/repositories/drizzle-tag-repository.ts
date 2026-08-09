import { and, eq } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { tagsTable } from "@/infrastructure/db/schema/tags-table";
import { wordsTable } from "@/infrastructure/db/schema/words-table";
import { TagRepository } from "@/domain/repositories/tag-repository";
import { Tag } from "@/domain/entities/tag";

function toDomain(row: typeof tagsTable.$inferSelect): Tag {
    return { id: row.id, name: row.name, userId: row.user_id };
}

export const drizzleTagRepository: TagRepository = {
    async create(userId: string, name: string) {
        const [createdTag] = await db.insert(tagsTable).values({ name, user_id: userId }).returning();
        return toDomain(createdTag);
    },

    async findByUserAndName(userId: string, name: string) {
        const [tag] = await db
            .select()
            .from(tagsTable)
            .where(and(eq(tagsTable.user_id, userId), eq(tagsTable.name, name)));
        return tag ? toDomain(tag) : null;
    },

    async findAllByUser(userId: string) {
        const rows = await db.select().from(tagsTable).where(eq(tagsTable.user_id, userId));
        return rows.map(toDomain);
    },

    async findAllWithWordsCount(userId: string) {
        return db
            .select({
                id: tagsTable.id,
                title: tagsTable.name,
                wordsCount: db.$count(wordsTable, eq(wordsTable.tagId, tagsTable.id)),
            })
            .from(tagsTable)
            .where(eq(tagsTable.user_id, userId));
    },

    async delete(id: string) {
        await db.delete(tagsTable).where(eq(tagsTable.id, id));
    },
};
