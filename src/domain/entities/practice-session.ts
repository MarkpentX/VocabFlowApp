export interface PracticeSessionInfo {
    id: string;
    questionsCount: number;
}

export interface ConsumedPracticeSession {
    questionsCount: number;
    startedAt: Date;
}

// A real user needs at least this long per question (read it, think, answer) — kept low
// on purpose so fast, honest players are never blocked; it only exists to catch a script
// that redeems a session in essentially zero time (no real round played at all).
export const MIN_SECONDS_PER_QUESTION = 0.4;

export function hasEnoughTimeElapsed(session: ConsumedPracticeSession): boolean {
    const elapsedSeconds = (Date.now() - session.startedAt.getTime()) / 1000;
    return elapsedSeconds >= session.questionsCount * MIN_SECONDS_PER_QUESTION;
}
