import {GetUserStatsResp} from "@/app/(protected)/types/types";
import {getAllWords} from "@/features/words/queries";
import {getUserTagsDB} from "@/features/tags/queries";
import {getSessionUser} from "@/lib/utils/auth-utils";

export async function getUserStats(): Promise<GetUserStatsResp> {
    const user = await getSessionUser()

    const allUserTags = await getUserTagsDB(user.id);
    const userWords = await getAllWords(allUserTags.map(tag => tag.id));

    const userWordsCount = userWords.length
    const userTagsCount = allUserTags.length

    return {
        userWordsCount: userWordsCount,
        userTagsCount: userTagsCount
    }
}