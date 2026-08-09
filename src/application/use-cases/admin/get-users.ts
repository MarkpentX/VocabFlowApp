import { UserRepository } from "@/domain/repositories/user-repository";
import { User } from "@/domain/entities/user";
import { errors } from "@/domain/errors/factory";

export function createGetUsersUseCase(userRepository: UserRepository) {
    return async function getUsers(limit: number): Promise<User[]> {
        try {
            return await userRepository.findMany(limit);
        } catch {
            throw errors.db();
        }
    };
}
