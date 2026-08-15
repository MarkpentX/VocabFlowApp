import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

const SUBJECTS = ["I", "You", "We", "They", "He", "She", "It", "My sister", "The dog", "Tom"];

const VERBS: { base: string; past: string }[] = [
    { base: "play", past: "played" },
    { base: "work", past: "worked" },
    { base: "watch", past: "watched" },
    { base: "live", past: "lived" },
    { base: "study", past: "studied" },
    { base: "go", past: "went" },
    { base: "do", past: "did" },
    { base: "have", past: "had" },
    { base: "eat", past: "ate" },
    { base: "see", past: "saw" },
];

const TIME_EXPRESSIONS = [
    "yesterday",
    "last night",
    "last week",
    "last month",
    "last year",
    "two days ago",
    "a week ago",
    "in 2015",
    "last summer",
    "when she was a child",
];

export const pastSimpleRule: GrammarRuleMeta = {
    key: "past-simple",
    level: "A2",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const verb = pickOne(VERBS);
            const time = pickOne(TIME_EXPRESSIONS);
            const correct = verb.past;

            const otherVerbs = VERBS.filter((v) => v.base !== verb.base);
            const otherVerbA = pickOne(otherVerbs);
            const otherVerbB = pickOne(otherVerbs.filter((v) => v.base !== otherVerbA.base));

            const distractors = [verb.base, otherVerbA.past, otherVerbB.past];

            return buildQuestion(`${subject} ___ (${verb.base}) ${time}.`, correct, distractors);
        });
    },
};
