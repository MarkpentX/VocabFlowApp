import { WordRepository } from "@/domain/repositories/word-repository";
import { Word } from "@/domain/entities/word";
import { errors } from "@/domain/errors/factory";
import { MIN_EXAM_DICTIONARIES } from "@/domain/entities/exam";

export function createGetExamWordsUseCase(wordRepository: WordRepository) {
    return async function getExamWords(userId: string, dictionaryIds: string[]): Promise<Word[]> {
        if (dictionaryIds.length < MIN_EXAM_DICTIONARIES) {
            throw errors.validation(`Select at least ${MIN_EXAM_DICTIONARIES} dictionaries`);
        }

        try {
            return await wordRepository.findByUserAndDictionaryIds(userId, dictionaryIds);
        } catch {
            throw errors.db();
        }
    };
}
