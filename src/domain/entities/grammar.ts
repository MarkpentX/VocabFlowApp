import { CEFRLevel } from "@/domain/entities/level-test";
import { QuizQuestion } from "@/domain/entities/quiz";

export interface GrammarRuleMeta {
    key: string;
    level: CEFRLevel;
    generateExercises: (count: number) => QuizQuestion[];
}

export interface GrammarRuleProgress {
    ruleKey: string;
    attempts: number;
    correctAttempts: number;
    bestStreak: number;
    lastPracticedAt: Date | null;
}

export interface GrammarRuleStats extends GrammarRuleProgress {
    accuracy: number;
    mastered: boolean;
}

export interface GrammarStats {
    rules: GrammarRuleStats[];
    totalAttempts: number;
    totalCorrect: number;
    overallAccuracy: number;
    rulesMastered: number;
    rulesStarted: number;
    totalRules: number;
}

export const MASTERY_ATTEMPTS_THRESHOLD = 30;
export const MASTERY_ACCURACY_THRESHOLD = 85;
export const MIN_GRAMMAR_EXAM_RULES = 2;

export function computeGrammarStats(ruleKeys: string[], progress: GrammarRuleProgress[]): GrammarStats {
    const progressByKey = new Map(progress.map((entry) => [entry.ruleKey, entry]));

    const rules: GrammarRuleStats[] = ruleKeys.map((ruleKey) => {
        const entry = progressByKey.get(ruleKey) ?? {
            ruleKey,
            attempts: 0,
            correctAttempts: 0,
            bestStreak: 0,
            lastPracticedAt: null,
        };
        const accuracy = entry.attempts === 0 ? 0 : Math.round((entry.correctAttempts / entry.attempts) * 100);
        const mastered = entry.attempts >= MASTERY_ATTEMPTS_THRESHOLD && accuracy >= MASTERY_ACCURACY_THRESHOLD;
        return { ...entry, accuracy, mastered };
    });

    const totalAttempts = rules.reduce((sum, rule) => sum + rule.attempts, 0);
    const totalCorrect = rules.reduce((sum, rule) => sum + rule.correctAttempts, 0);

    return {
        rules,
        totalAttempts,
        totalCorrect,
        overallAccuracy: totalAttempts === 0 ? 0 : Math.round((totalCorrect / totalAttempts) * 100),
        rulesMastered: rules.filter((rule) => rule.mastered).length,
        rulesStarted: rules.filter((rule) => rule.attempts > 0).length,
        totalRules: rules.length,
    };
}
