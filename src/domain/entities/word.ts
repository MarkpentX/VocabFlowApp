export const WORD_LANGUAGES = ["en", "ru", "uk"] as const;

export type WordLanguage = (typeof WORD_LANGUAGES)[number];

export interface Word {
    id: string;
    infinitive: string;
    meaning: string;
    meaningLang: WordLanguage;
    dictionaryId: string;
}

export interface NewWordInput {
    infinitive: string;
    meaning: string;
    meaningLang: WordLanguage;
    dictionary: string;
}
