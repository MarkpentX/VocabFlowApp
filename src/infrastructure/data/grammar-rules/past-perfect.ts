import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

const SUBJECTS = ["I", "You", "We", "They", "He", "She", "My sister", "The team", "Tom"];

interface Verb {
    base: string;
    past: string;
    participle: string;
    object: string;
}

const VERBS: Verb[] = [
    { base: "finish", past: "finished", participle: "finished", object: "the report" },
    { base: "clean", past: "cleaned", participle: "cleaned", object: "the house" },
    { base: "leave", past: "left", participle: "left", object: "the office" },
    { base: "eat", past: "ate", participle: "eaten", object: "dinner" },
    { base: "see", past: "saw", participle: "seen", object: "the message" },
    { base: "write", past: "wrote", participle: "written", object: "the letter" },
    { base: "check", past: "checked", participle: "checked", object: "the instructions" },
    { base: "lose", past: "lost", participle: "lost", object: "the tickets" },
    { base: "book", past: "booked", participle: "booked", object: "the hotel" },
    { base: "pack", past: "packed", participle: "packed", object: "the bags" },
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

            return buildQuestion(`${subject} had ___ (${verb.base}) ${verb.object} before ${time}.`, correct, distractors);
        });
    },
};
