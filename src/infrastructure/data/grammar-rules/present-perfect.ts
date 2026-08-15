import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Subject {
    text: string;
    have: "have" | "has";
}

const SUBJECTS: Subject[] = [
    { text: "I", have: "have" },
    { text: "You", have: "have" },
    { text: "We", have: "have" },
    { text: "They", have: "have" },
    { text: "He", have: "has" },
    { text: "She", have: "has" },
    { text: "It", have: "has" },
    { text: "My sister", have: "has" },
    { text: "The team", have: "has" },
    { text: "Tom", have: "has" },
];

const VERBS: { base: string; past: string; participle: string }[] = [
    { base: "finish", past: "finished", participle: "finished" },
    { base: "clean", past: "cleaned", participle: "cleaned" },
    { base: "visit", past: "visited", participle: "visited" },
    { base: "watch", past: "watched", participle: "watched" },
    { base: "eat", past: "ate", participle: "eaten" },
    { base: "see", past: "saw", participle: "seen" },
    { base: "do", past: "did", participle: "done" },
    { base: "write", past: "wrote", participle: "written" },
    { base: "go", past: "went", participle: "gone" },
    { base: "break", past: "broke", participle: "broken" },
];

const TIME_MARKERS = [
    "already",
    "since 2010",
    "for five years",
    "recently",
    "so far",
    "lately",
    "before",
    "twice",
    "many times",
    "this year",
];

export const presentPerfectRule: GrammarRuleMeta = {
    key: "present-perfect",
    level: "B1",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const verb = pickOne(VERBS);
            const marker = pickOne(TIME_MARKERS);
            const correct = verb.participle;

            const otherVerbs = VERBS.filter((v) => v.base !== verb.base);
            const otherVerbA = pickOne(otherVerbs);
            const otherVerbB = pickOne(otherVerbs.filter((v) => v.base !== otherVerbA.base));
            const distractors = [
                verb.base,
                otherVerbA.participle,
                verb.past !== verb.participle ? verb.past : otherVerbB.participle,
            ];

            return buildQuestion(`${subject.text} ${subject.have} ___ (${verb.base}) ${marker}.`, correct, distractors);
        });
    },
};
