'use server'

import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {GetTagsResp} from "@/app/(protected)/types/types";
import {getTagsWithWordsCountDB} from "@/features/tags/queries";
import {DbWord} from "@/features/words/types";
import {getWordsByTagDB} from "@/features/words/queries";
import {getSessionUser} from "@/lib/utils/auth-utils";

export async function getAllTags(): Promise<GetTagsResp> {
    const user = await getSessionUser()

    const tags = await getTagsWithWordsCountDB(user.id)
    return tags
}
export async function getWordsByTag(tag: string): Promise<DbWord[]>{
    const user = await getSessionUser()

    const userWords = await getWordsByTagDB(user.id, tag)
    return userWords
}

// export async function deleteWordAction(id: string){
//     console.log(id)
//     try {
//         await db.delete(words).where(eq(words.id, id));
//     } catch (error) {
//         console.log(error);
//     }
// }