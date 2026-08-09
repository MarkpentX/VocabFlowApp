import { TranslationService } from "@/domain/services/translation-service";
import { WordLanguage } from "@/domain/entities/word";
import { errors } from "@/domain/errors/factory";

export interface TranslateWordInput {
    text: string;
    sourceLang: WordLanguage;
    targetLang: WordLanguage;
}

export function createTranslateWordUseCase(translationService: TranslationService) {
    return async function translateWord(input: TranslateWordInput): Promise<string> {
        const text = input.text.trim();
        if (!text) {
            return "";
        }

        if (input.sourceLang === input.targetLang) {
            return text;
        }

        try {
            return await translationService.translate({ ...input, text });
        } catch (err) {
            console.error(err);
            throw errors.translation("Translation service is unavailable");
        }
    };
}
