import { QuizQuestion } from "@/domain/entities/quiz";

export const DIAGNOSTIC_LEVELS = ["A1", "A2", "B1", "B2"] as const;
export type DiagnosticLevel = (typeof DIAGNOSTIC_LEVELS)[number];

export interface GrammarDiagnosticQuestion extends QuizQuestion {
    ruleKey: string;
}

export interface GrammarDiagnosticAnswer {
    ruleKey: string;
    isCorrect: boolean;
}

export interface RuleBreakdown {
    ruleKey: string;
    correct: number;
    total: number;
    accuracy: number;
    isWeak: boolean;
}

export interface GrammarDiagnosticResult {
    level: DiagnosticLevel;
    correctCount: number;
    total: number;
    overallAccuracy: number;
    weakRules: RuleBreakdown[];
    allRules: RuleBreakdown[];
}

const WEAK_ACCURACY_THRESHOLD = 70;

export function scoreGrammarDiagnostic(answers: GrammarDiagnosticAnswer[], level: DiagnosticLevel): GrammarDiagnosticResult {
    const ruleKeys = Array.from(new Set(answers.map((a) => a.ruleKey)));

    const allRules: RuleBreakdown[] = ruleKeys.map((ruleKey) => {
        const ruleAnswers = answers.filter((a) => a.ruleKey === ruleKey);
        const correct = ruleAnswers.filter((a) => a.isCorrect).length;
        const total = ruleAnswers.length;
        const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
        return { ruleKey, correct, total, accuracy, isWeak: accuracy < WEAK_ACCURACY_THRESHOLD };
    });

    allRules.sort((a, b) => a.accuracy - b.accuracy);

    const weakRules = allRules.filter((rule) => rule.isWeak);
    const correctCount = answers.filter((a) => a.isCorrect).length;

    return {
        level,
        correctCount,
        total: answers.length,
        overallAccuracy: answers.length === 0 ? 0 : Math.round((correctCount / answers.length) * 100),
        weakRules,
        allRules,
    };
}
