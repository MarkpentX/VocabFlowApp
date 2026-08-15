import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { QuizQuestion } from "@/domain/entities/quiz";
import { errors } from "@/domain/errors/factory";

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function createGenerateGrammarSessionUseCase(rules: GrammarRuleMeta[]) {
    return async function generateGrammarSession(ruleKeys: string[], countPerRule: number): Promise<QuizQuestion[]> {
        const selectedRules = rules.filter((rule) => ruleKeys.includes(rule.key));

        if (selectedRules.length === 0) {
            throw errors.validation("Unknown grammar rule");
        }

        const exercises = selectedRules.flatMap((rule) => rule.generateExercises(countPerRule));
        return shuffle(exercises);
    };
}
