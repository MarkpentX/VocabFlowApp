export interface PracticeSessionInfo {
    id: string;
    questionsCount: number;
}

export interface ConsumedPracticeSession {
    questionsCount: number;
    startedAt: Date;
}

// A real user needs at least this long per question (read it, think, answer) — this is a
// deliberately generous lower bound, well under what an honest attempt takes, just enough
// to block zero-effort scripted replays that redeem a session the instant it's created.
export const MIN_SECONDS_PER_QUESTION = 1.5;

export function hasEnoughTimeElapsed(session: ConsumedPracticeSession): boolean {
    const elapsedSeconds = (Date.now() - session.startedAt.getTime()) / 1000;
    return elapsedSeconds >= session.questionsCount * MIN_SECONDS_PER_QUESTION;
}
