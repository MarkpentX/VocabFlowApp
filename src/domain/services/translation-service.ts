import { WordLanguage } from "@/domain/entities/word";

export interface TranslationRequest {
    text: string;
    sourceLang: WordLanguage;
    targetLang: WordLanguage;
}

export interface TranslationService {
    translate(request: TranslationRequest): Promise<string>;
}
