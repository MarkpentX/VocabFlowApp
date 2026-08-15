import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { presentSimpleRule } from "@/infrastructure/data/grammar-rules/present-simple";
import { presentContinuousRule } from "@/infrastructure/data/grammar-rules/present-continuous";
import { pastSimpleRule } from "@/infrastructure/data/grammar-rules/past-simple";
import { presentPerfectRule } from "@/infrastructure/data/grammar-rules/present-perfect";
import { futureRule } from "@/infrastructure/data/grammar-rules/future";
import { articlesRule } from "@/infrastructure/data/grammar-rules/articles";
import { comparativesRule } from "@/infrastructure/data/grammar-rules/comparatives";
import { modalVerbsRule } from "@/infrastructure/data/grammar-rules/modal-verbs";
import { prepositionsRule } from "@/infrastructure/data/grammar-rules/prepositions";
import { conditionalsRule } from "@/infrastructure/data/grammar-rules/conditionals";

export const GRAMMAR_RULES: GrammarRuleMeta[] = [
    presentSimpleRule,
    presentContinuousRule,
    pastSimpleRule,
    presentPerfectRule,
    futureRule,
    articlesRule,
    comparativesRule,
    modalVerbsRule,
    prepositionsRule,
    conditionalsRule,
];

export function getGrammarRule(key: string): GrammarRuleMeta | undefined {
    return GRAMMAR_RULES.find((rule) => rule.key === key);
}
