import { GrammarSharedResultRepository } from "@/domain/repositories/grammar-shared-result-repository";
import { PracticeSessionRepository } from "@/domain/repositories/practice-session-repository";
import { CreateSharedResultInput, SharedGrammarResult } from "@/domain/entities/grammar-shared-result";
import { hasEnoughTimeElapsed } from "@/domain/entities/practice-session";
import { errors } from "@/domain/errors/factory";

export function createCreateSharedGrammarResultUseCase(
    repository: GrammarSharedResultRepository,
    practiceSessionRepository: PracticeSessionRepository
) {
    return async function createSharedGrammarResult(
        userId: string,
        studentName: string,
        input: CreateSharedResultInput
    ): Promise<SharedGrammarResult> {
        if (input.ruleKeys.length === 0 || input.questionsCount <= 0 || input.correctCount < 0) {
            throw errors.validation("Invalid result");
        }
        if (input.correctCount > input.questionsCount || input.maxCombo > input.questionsCount) {
            throw errors.validation("Invalid result");
        }

        // The session token is the server's own record of how many questions a round
        // actually contained and when it started — this stops a client from fabricating
        // a shareable "perfect score" link without ever having played.
        const session = await practiceSessionRepository.markShared(input.sessionId, userId);
        if (!session) {
            throw errors.validation("Invalid or already-shared practice session");
        }
        if (session.questionsCount !== input.questionsCount) {
            throw errors.validation("Result does not match the practice session");
        }
        if (!hasEnoughTimeElapsed(session)) {
            throw errors.validation("Practice session completed too quickly");
        }

        try {
            return await repository.create(userId, studentName, input);
        } catch {
            throw errors.db();
        }
    };
}
