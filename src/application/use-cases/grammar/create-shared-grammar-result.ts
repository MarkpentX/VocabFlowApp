import { GrammarSharedResultRepository } from "@/domain/repositories/grammar-shared-result-repository";
import { CreateSharedResultInput, SharedGrammarResult } from "@/domain/entities/grammar-shared-result";
import { errors } from "@/domain/errors/factory";

export function createCreateSharedGrammarResultUseCase(repository: GrammarSharedResultRepository) {
    return async function createSharedGrammarResult(
        userId: string,
        studentName: string,
        input: CreateSharedResultInput
    ): Promise<SharedGrammarResult> {
        if (input.ruleKeys.length === 0 || input.questionsCount <= 0) {
            throw errors.validation("Invalid result");
        }

        try {
            return await repository.create(userId, studentName, input);
        } catch {
            throw errors.db();
        }
    };
}
