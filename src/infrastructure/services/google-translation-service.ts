import { TranslationRequest, TranslationService } from "@/domain/services/translation-service";

const GOOGLE_TRANSLATE_ENDPOINT = "https://translate.googleapis.com/translate_a/single";

type GoogleTranslateResponse = [Array<[string, string, ...unknown[]]> | null, ...unknown[]];

export const googleTranslationService: TranslationService = {
    async translate({ text, sourceLang, targetLang }: TranslationRequest): Promise<string> {
        const url = `${GOOGLE_TRANSLATE_ENDPOINT}?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Google Translate request failed with status ${res.status}`);
        }

        const data = (await res.json()) as GoogleTranslateResponse;
        const translation = data[0]?.map((segment) => segment[0]).join("");

        if (!translation) {
            throw new Error("Google Translate returned an empty translation");
        }

        return translation;
    },
};
