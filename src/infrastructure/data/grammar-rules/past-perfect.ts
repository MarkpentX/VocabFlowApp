import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

const SUBJECTS = ["I", "You", "We", "They", "He", "She", "It", "My sister", "The team", "Tom"];

const VERBS: { base: string; past: string; participle: string }[] = [
    { base: "finish", past: "finished", participle: "finished" },
    { base: "clean", past: "cleaned", participle: "cleaned" },
    { base: "leave", past: "left", participle: "left" },
    { base: "arrive", past: "arrived", participle: "arrived" },
    { base: "eat", past: "ate", participle: "eaten" },
    { base: "see", past: "saw", participle: "seen" },
    { base: "write", past: "wrote", participle: "written" },
    { base: "go", past: "went", participle: "gone" },
    { base: "lose", past: "lost", participle: "lost" },
    { base: "break", past: "broke", participle: "broken" },
];

const TIME_CLAUSES = [
    "the movie started",
    "I arrived",
    "she called",
    "the meeting began",
    "we got there",
    "the shop closed",
    "midnight",
    "the rain stopped",
    "anyone noticed",
    "the train left",
];

export const pastPerfectRule: GrammarRuleMeta = {
    key: "past-perfect",
    level: "B2",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const verb = pickOne(VERBS);
            const time = pickOne(TIME_CLAUSES);
            const correct = verb.participle;

            const otherVerbs = VERBS.filter((v) => v.base !== verb.base);
            const otherVerbA = pickOne(otherVerbs);
            const otherVerbB = pickOne(otherVerbs.filter((v) => v.base !== otherVerbA.base));
            const distractors = [
                verb.base,
                otherVerbA.participle,
                verb.past !== verb.participle ? verb.past : otherVerbB.participle,
            ];

            return buildQuestion(`${subject} had ___ (${verb.base}) before ${time}.`, correct, distractors);
        });
    },
};
