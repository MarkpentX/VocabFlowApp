import {TagsWithWords} from "@/features/tags/types";
import {getTagsWithWordsCountDB} from "@/features/tags/queries";
import {errors} from "@/lib/errors/factory";
import {cacheLife, cacheTag} from "next/cache";


export async function getTags(userId: string): Promise<TagsWithWords[]> {
    'use cache'
    cacheLife('weeks')
    cacheTag(`USER_TAGS-${userId}`)
    try {
        return await getTagsWithWordsCountDB(userId)
    } catch (error) {
        throw errors.db()
    }
}