import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

const SUBJECTS = ["I", "You", "We", "They", "He", "She", "My sister", "My brother", "Our teacher", "Tom"];

interface Verb {
    base: string;
    past: string;
    object: string;
}

const VERBS: Verb[] = [
    { base: "play", past: "played", object: "tennis" },
    { base: "work", past: "worked", object: "late" },
    { base: "watch", past: "watched", object: "a documentary" },
    { base: "visit", past: "visited", object: "her grandmother" },
    { base: "study", past: "studied", object: "for the test" },
    { base: "go", past: "went", object: "to the cinema" },
    { base: "do", past: "did", object: "the homework" },
    { base: "have", past: "had", object: "lunch" },
    { base: "eat", past: "ate", object: "a sandwich" },
    { base: "see", past: "saw", object: "an old friend" },
];

const TIME_EXPRESSIONS = [
    "yesterday",
    "last night",
    "last week",
    "last month",
    "two days ago",
    "a week ago",
    "in 2015",
    "last summer",
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

            return buildQuestion(`${subject} ___ (${verb.base}) ${verb.object} ${time}.`, correct, distractors);
        });
    },
};
