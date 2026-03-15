'use server'

import {auth} from "@/auth";
import {words} from "@/db/wordsTable";
import {db} from "@/index";
import {and, eq} from "drizzle-orm";
import {redirect} from "next/navigation";
import {DbWord} from "@/features/words/types";

export async function getAllTags(): Promise<string[]> {
    const session = await auth()
    if (!session?.user?.id){
        redirect("/auth")
    }
    const userWords = await db.select().from(words).where(eq(words.user_id, session.user.id as string));
    const userTags = [];
    for (const word of userWords) {
        if (word.tag){
            userTags.push(word.tag);
        }
    }
    return [... new Set(userTags)];
}

export async function getWordsByTag(tag: string): Promise<DbWord[]>{
    const session = await auth()
    if (!session?.user?.id){
        redirect("/auth")
    }

    const userWords = await db
        .select()
        .from(words)
        .where(and(
            eq(words.user_id, session.user.id as string),
            eq(words.tag, tag)
        ));
    return userWords;
}

export async function deleteWordAction(id: string){
    console.log(id)
    try {
        await db.delete(words).where(eq(words.id, id));
    } catch (error) {
        console.log(error);
    }
}