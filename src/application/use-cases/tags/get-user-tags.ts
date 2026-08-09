import { TagRepository } from "@/domain/repositories/tag-repository";
import { Tag } from "@/domain/entities/tag";
import { errors } from "@/domain/errors/factory";

export function createGetUserTagsUseCase(tagRepository: TagRepository) {
    return async function getUserTags(userId: string): Promise<Tag[]> {
        try {
            return await tagRepository.findAllByUser(userId);
        } catch {
            throw errors.db();
        }
    };
}
