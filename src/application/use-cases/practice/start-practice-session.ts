import { PracticeSessionRepository } from "@/domain/repositories/practice-session-repository";
import { PracticeSessionInfo } from "@/domain/entities/practice-session";
import { errors } from "@/domain/errors/factory";

const MAX_QUESTIONS_PER_SESSION = 300;

export function createStartPracticeSessionUseCase(repository: PracticeSessionRepository) {
    return async function startPracticeSession(userId: string, questionsCount: number): Promise<PracticeSessionInfo> {
        if (!Number.isInteger(questionsCount) || questionsCount <= 0 || questionsCount > MAX_QUESTIONS_PER_SESSION) {
            throw errors.validation("Invalid questions count");
        }

        try {
            return await repository.create(userId, questionsCount);
        } catch {
            throw errors.db();
        }
    };
}
