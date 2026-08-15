import { GrammarRuleProgress } from "@/domain/entities/grammar";

export interface GrammarSessionResult {
    ruleKey: string;
    attempts: number;
    correct: number;
    bestStreak: number;
}

export interface GrammarRepository {
    getProgress(userId: string): Promise<GrammarRuleProgress[]>;
    recordSession(userId: string, result: GrammarSessionResult): Promise<void>;
}
