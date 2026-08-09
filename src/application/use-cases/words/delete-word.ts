import { WordRepository } from "@/domain/repositories/word-repository";
import { errors } from "@/domain/errors/factory";

export function createDeleteWordUseCase(wordRepository: WordRepository) {
    return async function deleteWord(id: string): Promise<void> {
        try {
            await wordRepository.delete(id);
        } catch {
            throw errors.db();
        }
    };
}
