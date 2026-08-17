import { UserRepository } from "@/domain/repositories/user-repository";
import { errors } from "@/domain/errors/factory";

export function createGetOnboardingStatusUseCase(userRepository: UserRepository) {
    return async function getOnboardingStatus(userId: string): Promise<boolean> {
        try {
            return await userRepository.isNewUser(userId);
        } catch {
            throw errors.db();
        }
    };
}
