'use server'
import {deleteTagDB, getTagsWithWordsCountDB} from "@/features/tags/queries";
import {DbWord} from "@/features/words/types";
import {deleteWordDB, getWordsByTagDB} from "@/features/words/queries";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {ActionResult, handleActionError, handleActionSuccess} from "@/lib/actionResult";
import {TagsWithWords} from "@/features/tags/types";
import {cacheLife, cacheTag, updateTag} from "next/cache";


export async function getAllTags(userId: string): Promise<TagsWithWords[]> {
    'use cache'
    cacheLife('weeks')
    cacheTag(`USER_TAGS-${userId}`)

    const tags = await getTagsWithWordsCountDB(userId)

    return tags
}
export async function getWordsByTag(tag: string): Promise<DbWord[]>{
    const user = await getSessionUser()

    const userWords = await getWordsByTagDB(user.id, tag)
    return userWords
}

export async function deleteTagAction(id: string): Promise<ActionResult> {
    try {
        const user = await getSessionUser()
        updateTag(`USER_TAGS-${user.id}`)
        await deleteTagDB(id)
        return handleActionSuccess("Tag deleted successfully.")
    } catch {
        return handleActionError("Error to delete tag database.")
    }
}

export async function deleteWordAction(id: string): Promise<ActionResult> {
    try {
        const user = await getSessionUser()
        updateTag(`USER_WORDS-${user.id}`)
        updateTag(`USER_TAGS-${user.id}`)
        await deleteWordDB(id)
        return handleActionSuccess("Word deleted successfully.")
    } catch {
        return handleActionError("Error to delete word database.")
    }
}

// export async function deleteWordAction(id: string){
//     console.log(id)
//     try {
//         await db.delete(words).where(eq(words.id, id));
//     } catch (error) {
//         console.log(error);
//     }
// }