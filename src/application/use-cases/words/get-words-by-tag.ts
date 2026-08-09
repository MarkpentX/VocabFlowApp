import { WordRepository } from "@/domain/repositories/word-repository";
import { Word } from "@/domain/entities/word";
import { errors } from "@/domain/errors/factory";

export function createGetWordsByTagUseCase(wordRepository: WordRepository) {
    return async function getWordsByTag(tagName: string, userId: string): Promise<Word[]> {
        try {
            return await wordRepository.findByUserAndTagName(userId, tagName);
        } catch {
            throw errors.db();
        }
    };
}
