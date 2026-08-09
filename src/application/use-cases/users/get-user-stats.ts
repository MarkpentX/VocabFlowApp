import { errors } from "@/domain/errors/factory";
import { Dictionary } from "@/domain/entities/dictionary";
import { Word } from "@/domain/entities/word";
import { StreakInfo } from "@/domain/entities/streak";

export interface GetUserStatsResult {
    userWordsCount: number;
    userDictionariesCount: number;
    currentStreak: number;
    longestStreak: number;
}

export interface GetUserStatsDeps {
    getUserDictionaries: (userId: string) => Promise<Dictionary[]>;
    getUserWords: (dictionaryIds: string[]) => Promise<Word[]>;
    getStreak: (userId: string) => Promise<StreakInfo>;
}

export function createGetUserStatsUseCase({ getUserDictionaries, getUserWords, getStreak }: GetUserStatsDeps) {
    return async function getUserStats(userId: string): Promise<GetUserStatsResult> {
        try {
            const [dictionaries, streak] = await Promise.all([getUserDictionaries(userId), getStreak(userId)]);
            const words = await getUserWords(dictionaries.map((dictionary) => dictionary.id));
            return {
                userWordsCount: words.length,
                userDictionariesCount: dictionaries.length,
                currentStreak: streak.currentStreak,
                longestStreak: streak.longestStreak,
            };
        } catch {
            throw errors.db();
        }
    };
}
