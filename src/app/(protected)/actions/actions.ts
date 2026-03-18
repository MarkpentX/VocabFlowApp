import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {GetUserStatsResp} from "@/app/(protected)/types/types";
import {getAllWords} from "@/features/words/queries";
import {getUserTagsDB} from "@/features/tags/queries";

export async function getUserStats(): Promise<GetUserStatsResp> {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/")
    }

    const allUserTags = await getUserTagsDB(session.user.id);
    const userWords = await getAllWords(allUserTags.map(tag => tag.id));

    const userWordsCount = userWords.length
    const userTagsCount = allUserTags.length

    return {
        userWordsCount: userWordsCount,
        userTagsCount: userTagsCount
    }
}