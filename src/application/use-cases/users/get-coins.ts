import { UserRepository } from "@/domain/repositories/user-repository";
import { errors } from "@/domain/errors/factory";
import { CoinsInfo } from "@/domain/entities/coins";

export function createGetCoinsUseCase(userRepository: UserRepository) {
    return async function getCoins(userId: string): Promise<CoinsInfo> {
        try {
            return await userRepository.getCoins(userId);
        } catch {
            throw errors.db();
        }
    };
}
