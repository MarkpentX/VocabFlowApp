import { errors } from "@/domain/errors/factory";
import { Tag } from "@/domain/entities/tag";
import { Word } from "@/domain/entities/word";
import { StreakInfo } from "@/domain/entities/streak";

export interface GetUserStatsResult {
    userWordsCount: number;
    userTagsCount: number;
    currentStreak: number;
    longestStreak: number;
}

export interface GetUserStatsDeps {
    getUserTags: (userId: string) => Promise<Tag[]>;
    getUserWords: (tagIds: string[]) => Promise<Word[]>;
    getStreak: (userId: string) => Promise<StreakInfo>;
}

export function createGetUserStatsUseCase({ getUserTags, getUserWords, getStreak }: GetUserStatsDeps) {
    return async function getUserStats(userId: string): Promise<GetUserStatsResult> {
        try {
            const [tags, streak] = await Promise.all([getUserTags(userId), getStreak(userId)]);
            const words = await getUserWords(tags.map((tag) => tag.id));
            return {
                userWordsCount: words.length,
                userTagsCount: tags.length,
                currentStreak: streak.currentStreak,
                longestStreak: streak.longestStreak,
            };
        } catch {
            throw errors.db();
        }
    };
}
