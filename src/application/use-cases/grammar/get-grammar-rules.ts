import { GrammarRuleMeta } from "@/domain/entities/grammar";

export interface GrammarRuleSummary {
    key: string;
    level: GrammarRuleMeta["level"];
}

export function createGetGrammarRulesUseCase(rules: GrammarRuleMeta[]) {
    return async function getGrammarRules(): Promise<GrammarRuleSummary[]> {
        return rules.map((rule) => ({ key: rule.key, level: rule.level }));
    };
}
