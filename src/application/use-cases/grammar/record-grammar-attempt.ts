import { GrammarRepository, GrammarSessionResult } from "@/domain/repositories/grammar-repository";
import { errors } from "@/domain/errors/factory";

export function createRecordGrammarAttemptUseCase(grammarRepository: GrammarRepository) {
    return async function recordGrammarAttempt(userId: string, result: GrammarSessionResult): Promise<void> {
        try {
            await grammarRepository.recordSession(userId, result);
        } catch {
            throw errors.db();
        }
    };
}
