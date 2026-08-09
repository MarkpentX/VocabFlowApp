import { DictionaryRepository } from "@/domain/repositories/dictionary-repository";
import { DictionaryWithWordsCount } from "@/domain/entities/dictionary";
import { errors } from "@/domain/errors/factory";

export function createGetDictionariesUseCase(dictionaryRepository: DictionaryRepository) {
    return async function getDictionaries(userId: string): Promise<DictionaryWithWordsCount[]> {
        try {
            return await dictionaryRepository.findAllWithWordsCount(userId);
        } catch {
            throw errors.db();
        }
    };
}
