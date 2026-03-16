import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {db} from "@/index";
import {eq} from "drizzle-orm";
import {words} from "@/db/wordsTable";
import {GetUserStatsResp} from "@/app/(protected)/types/types";

export async function getUserStats(): Promise<GetUserStatsResp> {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/")
    }


    const uniqueSet = new Set();
    const userWords = await db.select().from(words).where(eq(words.user_id, session.user.id));

    for (const word of userWords) {
        uniqueSet.add(word.tag);
    }

    const userWordsCount = userWords.length
    const userTagsCount = uniqueSet.size;

    return {
        userWordsCount: userWordsCount,
        userTagsCount: userTagsCount
    }
}