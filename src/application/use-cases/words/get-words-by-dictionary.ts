import { WordRepository } from "@/domain/repositories/word-repository";
import { Word } from "@/domain/entities/word";
import { errors } from "@/domain/errors/factory";

export function createGetWordsByDictionaryUseCase(wordRepository: WordRepository) {
    return async function getWordsByDictionary(dictionaryName: string, userId: string): Promise<Word[]> {
        try {
            return await wordRepository.findByUserAndDictionaryName(userId, dictionaryName);
        } catch {
            throw errors.db();
        }
    };
}
