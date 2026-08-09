import { TagRepository } from "@/domain/repositories/tag-repository";
import { errors } from "@/domain/errors/factory";

export function createDeleteTagUseCase(tagRepository: TagRepository) {
    return async function deleteTag(id: string): Promise<void> {
        try {
            await tagRepository.delete(id);
        } catch {
            throw errors.db();
        }
    };
}
