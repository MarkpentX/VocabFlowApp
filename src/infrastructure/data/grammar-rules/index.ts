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
import { pastContinuousRule } from "@/infrastructure/data/grammar-rules/past-continuous";
import { pastPerfectRule } from "@/infrastructure/data/grammar-rules/past-perfect";
import { passiveVoiceRule } from "@/infrastructure/data/grammar-rules/passive-voice";
import { reportedSpeechRule } from "@/infrastructure/data/grammar-rules/reported-speech";
import { relativeClausesRule } from "@/infrastructure/data/grammar-rules/relative-clauses";
import { secondConditionalRule } from "@/infrastructure/data/grammar-rules/second-conditional";

export const GRAMMAR_RULES: GrammarRuleMeta[] = [
    presentSimpleRule,
    presentContinuousRule,
    articlesRule,
    prepositionsRule,
    pastSimpleRule,
    futureRule,
    comparativesRule,
    modalVerbsRule,
    presentPerfectRule,
    pastContinuousRule,
    conditionalsRule,
    passiveVoiceRule,
    pastPerfectRule,
    reportedSpeechRule,
    relativeClausesRule,
    secondConditionalRule,
];

export function getGrammarRule(key: string): GrammarRuleMeta | undefined {
    return GRAMMAR_RULES.find((rule) => rule.key === key);
}
