import { PracticeSessionRepository } from "@/domain/repositories/practice-session-repository";
import { PracticeCoinsAward } from "@/domain/entities/coins";
import { hasEnoughTimeElapsed } from "@/domain/entities/practice-session";
import { errors } from "@/domain/errors/factory";

type AwardPracticeCoins = (userId: string, currentStreak: number) => Promise<PracticeCoinsAward>;

export function createCompletePracticeSessionUseCase(
    repository: PracticeSessionRepository,
    awardPracticeCoins: AwardPracticeCoins
) {
    return async function completePracticeSession(
        userId: string,
        sessionId: string,
        currentStreak: number
    ): Promise<PracticeCoinsAward> {
        const consumed = await repository.consume(sessionId, userId);
        if (!consumed) {
            throw errors.validation("Invalid or already-used practice session");
        }

        if (!hasEnoughTimeElapsed(consumed)) {
            throw errors.validation("Practice session completed too quickly");
        }

        return awardPracticeCoins(userId, currentStreak);
    };
}
