import { UserRepository } from "@/domain/repositories/user-repository";
import { errors } from "@/domain/errors/factory";

export function createCompleteOnboardingUseCase(userRepository: UserRepository) {
    return async function completeOnboarding(userId: string): Promise<void> {
        try {
            await userRepository.markOnboardingComplete(userId);
        } catch {
            throw errors.db();
        }
    };
}
