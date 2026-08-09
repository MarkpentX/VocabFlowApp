import { UserRepository } from "@/domain/repositories/user-repository";
import { errors } from "@/domain/errors/factory";
import { StreakInfo } from "@/domain/entities/streak";

export function createGetStreakUseCase(userRepository: UserRepository) {
    return async function getStreak(userId: string): Promise<StreakInfo> {
        try {
            return await userRepository.getStreak(userId);
        } catch {
            throw errors.db();
        }
    };
}
