import { TranslationRequest, TranslationService } from "@/domain/services/translation-service";

const MYMEMORY_ENDPOINT = "https://api.mymemory.translated.net/get";

interface MyMemoryResponse {
    responseData?: { translatedText?: string };
    responseStatus?: number | string;
    responseDetails?: string;
}

export const mymemoryTranslationService: TranslationService = {
    async translate({ text, sourceLang, targetLang }: TranslationRequest): Promise<string> {
        const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`MyMemory request failed with status ${res.status}`);
        }

        const data = (await res.json()) as MyMemoryResponse;

        if (data.responseStatus && Number(data.responseStatus) >= 400) {
            throw new Error(data.responseDetails ?? "MyMemory translation error");
        }

        const translation = data.responseData?.translatedText;
        if (!translation) {
            throw new Error("MyMemory returned an empty translation");
        }

        return translation;
    },
};
