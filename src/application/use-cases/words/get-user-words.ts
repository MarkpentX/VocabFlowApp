import { WordRepository } from "@/domain/repositories/word-repository";
import { Word } from "@/domain/entities/word";
import { errors } from "@/domain/errors/factory";

export function createGetUserWordsUseCase(wordRepository: WordRepository) {
    return async function getUserWords(tagIds: string[]): Promise<Word[]> {
        try {
            return await wordRepository.findByTagIds(tagIds);
        } catch {
            throw errors.db();
        }
    };
}
