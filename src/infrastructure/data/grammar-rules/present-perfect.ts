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
    { text: "My sister", have: "has" },
    { text: "The team", have: "has" },
    { text: "Tom", have: "has" },
];

interface Verb {
    base: string;
    past: string;
    participle: string;
    object: string;
}

const VERBS: Verb[] = [
    { base: "finish", past: "finished", participle: "finished", object: "the project" },
    { base: "clean", past: "cleaned", participle: "cleaned", object: "the flat" },
    { base: "visit", past: "visited", participle: "visited", object: "Paris" },
    { base: "watch", past: "watched", participle: "watched", object: "that series" },
    { base: "buy", past: "bought", participle: "bought", object: "a new phone" },
    { base: "see", past: "saw", participle: "seen", object: "that film" },
    { base: "write", past: "wrote", participle: "written", object: "the email" },
    { base: "try", past: "tried", participle: "tried", object: "sushi" },
    { base: "lose", past: "lost", participle: "lost", object: "the keys" },
    { base: "win", past: "won", participle: "won", object: "the match" },
];

const TIME_MARKERS = [
    "already",
    "since 2010",
    "for five years",
    "recently",
    "so far",
    "lately",
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

            return buildQuestion(
                `${subject.text} ${subject.have} ___ (${verb.base}) ${verb.object} ${marker}.`,
                correct,
                distractors
            );
        });
    },
};
