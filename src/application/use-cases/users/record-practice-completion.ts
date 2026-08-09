import { UserRepository } from "@/domain/repositories/user-repository";
import { errors } from "@/domain/errors/factory";
import { StreakUpdateResult } from "@/domain/entities/streak";

export function createRecordPracticeCompletionUseCase(userRepository: UserRepository) {
    return async function recordPracticeCompletion(userId: string): Promise<StreakUpdateResult> {
        try {
            return await userRepository.recordPracticeCompletion(userId);
        } catch {
            throw errors.db();
        }
    };
}
