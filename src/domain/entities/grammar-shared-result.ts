export interface CreateSharedResultInput {
    sessionId: string;
    ruleKeys: string[];
    questionsCount: number;
    correctCount: number;
    maxCombo: number;
}

export interface SharedGrammarResult {
    id: string;
    studentName: string;
    ruleKeys: string[];
    questionsCount: number;
    correctCount: number;
    maxCombo: number;
    createdAt: Date;
}
