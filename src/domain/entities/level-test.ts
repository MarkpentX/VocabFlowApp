import { QuizQuestion } from "@/domain/entities/quiz";

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export type CEFRLevel = (typeof CEFR_LEVELS)[number];

export interface LevelTestQuestion extends QuizQuestion {
    level: CEFRLevel;
}

export interface LevelTestAnswer {
    level: CEFRLevel;
    isCorrect: boolean;
}

export interface LevelBreakdown {
    level: CEFRLevel;
    correct: number;
    total: number;
    accuracy: number;
}

export interface LevelTestScore {
    correctCount: number;
    total: number;
    level: CEFRLevel;
    breakdown: LevelBreakdown[];
}

const PASS_THRESHOLD_PERCENT = 60;

/**
 * Determines the CEFR level by walking the levels in order and requiring
 * at least PASS_THRESHOLD_PERCENT accuracy on each one before granting the
 * next — this mirrors how real placement tests work (mastery must be
 * demonstrated progressively) instead of just averaging every question.
 */
export function scoreLevelTest(answers: LevelTestAnswer[]): LevelTestScore {
    const breakdown: LevelBreakdown[] = CEFR_LEVELS.map((level) => {
        const levelAnswers = answers.filter((answer) => answer.level === level);
        const correct = levelAnswers.filter((answer) => answer.isCorrect).length;
        const total = levelAnswers.length;
        const accuracy = total === 0 ? 0 : (correct / total) * 100;
        return { level, correct, total, accuracy };
    });

    let level: CEFRLevel = CEFR_LEVELS[0];
    for (const entry of breakdown) {
        if (entry.total === 0) {
            continue;
        }
        if (entry.accuracy >= PASS_THRESHOLD_PERCENT) {
            level = entry.level;
        } else {
            break;
        }
    }

    const correctCount = answers.filter((answer) => answer.isCorrect).length;

    return { correctCount, total: answers.length, level, breakdown };
}
