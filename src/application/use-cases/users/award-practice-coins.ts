import { UserRepository } from "@/domain/repositories/user-repository";
import { errors } from "@/domain/errors/factory";
import { PracticeCoinsAward } from "@/domain/entities/coins";

const BASE_COINS = 10;
const STREAK_BONUS_CAP = 20;

export function createAwardPracticeCoinsUseCase(userRepository: UserRepository) {
    return async function awardPracticeCoins(userId: string, currentStreak: number): Promise<PracticeCoinsAward> {
        try {
            const amount = BASE_COINS + Math.min(Math.max(currentStreak, 0), STREAK_BONUS_CAP);
            return await userRepository.awardCoins(userId, amount);
        } catch {
            throw errors.db();
        }
    };
}
