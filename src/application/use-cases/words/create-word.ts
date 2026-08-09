import { WordRepository } from "@/domain/repositories/word-repository";
import { DictionaryRepository } from "@/domain/repositories/dictionary-repository";
import { CreateWordSchema } from "@/domain/validation/word.schema";
import { validate } from "@/application/shared/validate";
import { trimObject } from "@/application/shared/trim-object";
import { errors } from "@/domain/errors/factory";
import { NewWordInput } from "@/domain/entities/word";

export interface CreateWordDeps {
    wordRepository: WordRepository;
    dictionaryRepository: DictionaryRepository;
}

export function createCreateWordUseCase({ wordRepository, dictionaryRepository }: CreateWordDeps) {
    return async function createWord(input: NewWordInput, userId: string): Promise<void> {
        const trimmed = trimObject({
            infinitive: input.infinitive,
            meaning: input.meaning,
            dictionary: input.dictionary,
        });
        const dictionaryName = trimmed.dictionary.toLowerCase();

        validate(CreateWordSchema, {
            infinitive: trimmed.infinitive,
            meaning: trimmed.meaning,
            meaningLang: input.meaningLang,
            dictionary: dictionaryName,
        });

        try {
            let dictionary = await dictionaryRepository.findByUserAndName(userId, dictionaryName);
            if (!dictionary) {
                dictionary = await dictionaryRepository.create(userId, dictionaryName);
            }

            await wordRepository.create(dictionary.id, {
                infinitive: trimmed.infinitive,
                meaning: trimmed.meaning,
                meaningLang: input.meaningLang,
                dictionary: dictionaryName,
            });
        } catch (err) {
            console.error(err);
            throw errors.db();
        }
    };
}
