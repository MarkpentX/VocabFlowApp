import { GrammarSharedResultRepository } from "@/domain/repositories/grammar-shared-result-repository";
import { SharedGrammarResult } from "@/domain/entities/grammar-shared-result";
import { errors } from "@/domain/errors/factory";

export function createGetSharedGrammarResultUseCase(repository: GrammarSharedResultRepository) {
    return async function getSharedGrammarResult(id: string): Promise<SharedGrammarResult> {
        let result: SharedGrammarResult | null;
        try {
            result = await repository.getById(id);
        } catch {
            throw errors.db();
        }

        if (!result) {
            throw errors.notFound("Shared result not found");
        }

        return result;
    };
}
