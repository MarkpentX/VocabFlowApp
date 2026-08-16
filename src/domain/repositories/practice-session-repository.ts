import { ConsumedPracticeSession, PracticeSessionInfo } from "@/domain/entities/practice-session";

export interface PracticeSessionRepository {
    create(userId: string, questionsCount: number): Promise<PracticeSessionInfo>;
    // Atomically marks the session used for a coin award and returns its data — or null
    // if it doesn't exist, doesn't belong to this user, or was already consumed (single-use).
    consume(id: string, userId: string): Promise<ConsumedPracticeSession | null>;
    // Separate single-use flag for "attest this session's result to build a shareable
    // link" — independent of coin consumption, since not every completed round awards
    // coins (imperfect rounds, exams, diagnostics) but any of them can still be shared.
    markShared(id: string, userId: string): Promise<ConsumedPracticeSession | null>;
}
