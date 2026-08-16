import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { DiagnosticLevel, GrammarDiagnosticQuestion } from "@/domain/entities/grammar-diagnostic";
import { CEFR_LEVELS } from "@/domain/entities/level-test";
import { errors } from "@/domain/errors/factory";

const QUESTIONS_PER_RULE = 6;

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function createGenerateGrammarDiagnosticUseCase(rules: GrammarRuleMeta[]) {
    return async function generateGrammarDiagnostic(level: DiagnosticLevel): Promise<GrammarDiagnosticQuestion[]> {
        const maxLevelIndex = CEFR_LEVELS.indexOf(level);
        const matchingRules = rules.filter((rule) => CEFR_LEVELS.indexOf(rule.level) <= maxLevelIndex);

        if (matchingRules.length === 0) {
            throw errors.validation("No grammar rules for this level");
        }

        const questions = matchingRules.flatMap((rule) =>
            rule.generateExercises(QUESTIONS_PER_RULE).map((exercise) => ({ ...exercise, ruleKey: rule.key }))
        );

        return shuffle(questions);
    };
}
