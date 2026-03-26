import {GetUserStatsResp} from "@/features/users/types";
import {getUserTags} from "@/features/tags/use-cases/getUserTags";
import {getUserWords} from "@/features/words/use-cases/getAllWords";
import {errors} from "@/lib/errors/factory";

export async function getUserStats(userId: string): Promise<GetUserStatsResp>{
    try {
        const allUserTags = await getUserTags(userId);
        const userWords = await getUserWords(allUserTags.map(tag => tag.id));
        const result = {
            userWordsCount: userWords.length,
            userTagsCount: allUserTags.length
        }
        return result;
    } catch (err) {
        throw errors.db();
    }
}