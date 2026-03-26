import {DbWord} from "@/features/words/types";
import {getWordsByTagDB} from "@/features/words/queries";
import {errors} from "@/lib/errors/factory";
import {cacheLife, cacheTag} from "next/cache";

export async function getWordsByTag(tag: string, userId: string): Promise<DbWord[]>{
    'use cache'
    cacheLife('seconds')
    cacheTag(`USER_WORDS-${userId}-${tag}`)
    try {
        const userWords = await getWordsByTagDB(userId, tag)
        return userWords
    } catch (err){
        throw errors.db()
    }
}