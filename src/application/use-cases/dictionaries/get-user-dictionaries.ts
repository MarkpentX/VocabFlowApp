import { DictionaryRepository } from "@/domain/repositories/dictionary-repository";
import { Dictionary } from "@/domain/entities/dictionary";
import { errors } from "@/domain/errors/factory";

export function createGetUserDictionariesUseCase(dictionaryRepository: DictionaryRepository) {
    return async function getUserDictionaries(userId: string): Promise<Dictionary[]> {
        try {
            return await dictionaryRepository.findAllByUser(userId);
        } catch {
            throw errors.db();
        }
    };
}
