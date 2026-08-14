import { QuizQuestion } from "@/domain/entities/quiz";

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

export type CEFRLevel = (typeof CEFR_LEVELS)[number];

export interface LevelTestQuestion extends QuizQuestion {
    level: CEFRLevel;
}

export interface LevelTestScore {
    correctCount: number;
    total: number;
    level: CEFRLevel;
}

const LEVEL_THRESHOLDS: { maxPercent: number; level: CEFRLevel }[] = [
    { maxPercent: 20, level: "A1" },
    { maxPercent: 40, level: "A2" },
    { maxPercent: 60, level: "B1" },
    { maxPercent: 80, level: "B2" },
    { maxPercent: 100, level: "C1" },
];

export function scoreLevelTest(correctCount: number, total: number): LevelTestScore {
    const percent = total === 0 ? 0 : (correctCount / total) * 100;
    const level = LEVEL_THRESHOLDS.find((threshold) => percent <= threshold.maxPercent)?.level ?? "C1";
    return { correctCount, total, level };
}
