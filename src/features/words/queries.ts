'use server'

import {CreateWord, DbNewWord, DbWord} from "@/features/words/types";
import {words} from "@/db/wordsTable";
import {db} from "@/index";
import {and, eq, inArray} from "drizzle-orm";
import {getTagDB} from "@/features/tags/queries";
import {tagsTable} from "@/db/schema";

export async function createWord(tag_id: string, word: CreateWord){
    // infinitive: z.string().max(255).min(2),
    //     meaning: z.string().max(255).min(2),
    //     tag: z.string().max(255).min(2),

    const createdWord: DbNewWord = {
        infinitive: word.infinitive,
        meaning: word.meaning,
        tagId: tag_id
    };

    await db.insert(words).values(createdWord);
}

export async function getAllWords(tags_id: string[]): Promise<DbWord[]> {
    return await db
        .select()
        .from(words)
        .where(
            inArray(words.tagId, tags_id)
        );
}

export async function getWordsByTagDB(user_id: string, tag_name: string): Promise<DbWord[]> {
    const [tag] = await db
        .select({ id: tagsTable.id })
        .from(tagsTable)
        .where(
            and(
                eq(tagsTable.user_id, user_id),
                eq(tagsTable.name, tag_name)
            )
        );

    if (!tag) return [];

    return await db
        .select()
        .from(words)
        .where(eq(words.tagId, tag.id));
}

export async function deleteWordDB(id: string): Promise<void>{
    console.log('Delete words with id: ', id);
    await db.delete(words).where(eq(words.id, id));
}