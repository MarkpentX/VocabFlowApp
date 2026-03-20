'use server'

import {tagsTable, words} from "@/db/schema";
import {db} from "@/index";
import {and, eq} from "drizzle-orm";
import {DbTag, TagsWithWords} from "@/features/tags/types";

export async function isTagAvailableDB(user_id: string, tagName: string): Promise<boolean>{
    const tag = await db
        .select()
        .from(tagsTable)
        .where(
            and(
                eq(tagsTable.user_id, user_id),
                eq(tagsTable.name, tagName)
            )
        )
        .limit(1);

    return tag.length === 0;
}

export async function createTagDB(user_id: string, tagName: string):Promise<void>{
    const tag: typeof tagsTable.$inferInsert = {
        name: tagName,
        user_id: user_id,
    };

    await db.insert(tagsTable).values(tag);
}

export async function getUserTagsDB(user_id: string):Promise<DbTag[]>{
    const tags = await db.select().from(tagsTable).where(eq(tagsTable.user_id, user_id));
    return tags;
}

export async function getTagsWithWordsCountDB(user_id: string): Promise<TagsWithWords[]>{
    console.log("Get tags with words count for user with id: ", user_id);
    const tags = await db
        .select({
            id: tagsTable.id,           // добавлено
            title: tagsTable.name,
            wordsCount: db.$count(words, eq(words.tagId, tagsTable.id)),
        })
        .from(tagsTable)
        .where(eq(tagsTable.user_id, user_id));

    return tags;
}

export async function getTagDB(user_id: string, tagName: string): Promise<DbTag> {
    console.log(`Get tag with name: ${tagName} for user with id: ${user_id}`)
    const [tag] = await db
        .select()
        .from(tagsTable)
        .where(
            and(
                eq(tagsTable.user_id, user_id),
                eq(tagsTable.name, tagName)
            )
        );

    return tag
}

export async function deleteTagDB(id: string): Promise<void>{
    console.log('Delete tag with id: ', id);
    await db.delete(tagsTable).where(eq(tagsTable.id, id));
}