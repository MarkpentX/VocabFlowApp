import { TranslationRequest, TranslationService } from "@/domain/services/translation-service";

export function createCompositeTranslationService(services: TranslationService[]): TranslationService {
    return {
        async translate(request: TranslationRequest): Promise<string> {
            let lastError: unknown;

            for (const service of services) {
                try {
                    return await service.translate(request);
                } catch (err) {
                    lastError = err;
                }
            }

            throw lastError instanceof Error ? lastError : new Error("All translation services failed");
        },
    };
}
