import { TagRepository } from "@/domain/repositories/tag-repository";
import { TagWithWordsCount } from "@/domain/entities/tag";
import { errors } from "@/domain/errors/factory";

export function createGetTagsUseCase(tagRepository: TagRepository) {
    return async function getTags(userId: string): Promise<TagWithWordsCount[]> {
        try {
            return await tagRepository.findAllWithWordsCount(userId);
        } catch {
            throw errors.db();
        }
    };
}
