import { WordRepository } from "@/domain/repositories/word-repository";
import { TagRepository } from "@/domain/repositories/tag-repository";
import { CreateWordSchema } from "@/domain/validation/word.schema";
import { validate } from "@/application/shared/validate";
import { trimObject } from "@/application/shared/trim-object";
import { errors } from "@/domain/errors/factory";
import { NewWordInput } from "@/domain/entities/word";

export interface CreateWordDeps {
    wordRepository: WordRepository;
    tagRepository: TagRepository;
}

export function createCreateWordUseCase({ wordRepository, tagRepository }: CreateWordDeps) {
    return async function createWord(input: NewWordInput, userId: string): Promise<void> {
        const trimmed = trimObject({
            infinitive: input.infinitive,
            meaning: input.meaning,
            tag: input.tag,
        });
        const tagName = trimmed.tag.toLowerCase();

        validate(CreateWordSchema, {
            infinitive: trimmed.infinitive,
            meaning: trimmed.meaning,
            meaningLang: input.meaningLang,
            tag: tagName,
        });

        try {
            let tag = await tagRepository.findByUserAndName(userId, tagName);
            if (!tag) {
                tag = await tagRepository.create(userId, tagName);
            }

            await wordRepository.create(tag.id, {
                infinitive: trimmed.infinitive,
                meaning: trimmed.meaning,
                meaningLang: input.meaningLang,
                tag: tagName,
            });
        } catch (err) {
            console.error(err);
            throw errors.db();
        }
    };
}
