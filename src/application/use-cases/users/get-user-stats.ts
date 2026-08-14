import { errors } from "@/domain/errors/factory";
import { Dictionary } from "@/domain/entities/dictionary";
import { Word } from "@/domain/entities/word";
import { StreakInfo } from "@/domain/entities/streak";
import { CoinsInfo } from "@/domain/entities/coins";

export interface GetUserStatsResult {
    userWordsCount: number;
    userDictionariesCount: number;
    currentStreak: number;
    longestStreak: number;
    coins: number;
}

export interface GetUserStatsDeps {
    getUserDictionaries: (userId: string) => Promise<Dictionary[]>;
    getUserWords: (dictionaryIds: string[]) => Promise<Word[]>;
    getStreak: (userId: string) => Promise<StreakInfo>;
    getCoins: (userId: string) => Promise<CoinsInfo>;
}

export function createGetUserStatsUseCase({ getUserDictionaries, getUserWords, getStreak, getCoins }: GetUserStatsDeps) {
    return async function getUserStats(userId: string): Promise<GetUserStatsResult> {
        try {
            const [dictionaries, streak, coinsInfo] = await Promise.all([
                getUserDictionaries(userId),
                getStreak(userId),
                getCoins(userId),
            ]);
            const words = await getUserWords(dictionaries.map((dictionary) => dictionary.id));
            return {
                userWordsCount: words.length,
                userDictionariesCount: dictionaries.length,
                currentStreak: streak.currentStreak,
                longestStreak: streak.longestStreak,
                coins: coinsInfo.coins,
            };
        } catch {
            throw errors.db();
        }
    };
}
