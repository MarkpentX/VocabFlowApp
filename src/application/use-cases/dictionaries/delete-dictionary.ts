import { DictionaryRepository } from "@/domain/repositories/dictionary-repository";
import { errors } from "@/domain/errors/factory";

export function createDeleteDictionaryUseCase(dictionaryRepository: DictionaryRepository) {
    return async function deleteDictionary(id: string): Promise<void> {
        try {
            await dictionaryRepository.delete(id);
        } catch {
            throw errors.db();
        }
    };
}
