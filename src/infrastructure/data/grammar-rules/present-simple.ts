import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Subject {
    text: string;
    person: "base" | "third";
}

const SUBJECTS: Subject[] = [
    { text: "I", person: "base" },
    { text: "You", person: "base" },
    { text: "We", person: "base" },
    { text: "They", person: "base" },
    { text: "He", person: "third" },
    { text: "She", person: "third" },
    { text: "It", person: "third" },
    { text: "My sister", person: "third" },
    { text: "The dog", person: "third" },
    { text: "Tom", person: "third" },
];

const VERBS: { base: string; third: string }[] = [
    { base: "work", third: "works" },
    { base: "play", third: "plays" },
    { base: "watch", third: "watches" },
    { base: "study", third: "studies" },
    { base: "live", third: "lives" },
    { base: "go", third: "goes" },
    { base: "do", third: "does" },
    { base: "have", third: "has" },
    { base: "try", third: "tries" },
    { base: "wash", third: "washes" },
];

const TIME_EXPRESSIONS = [
    "every day",
    "every morning",
    "every week",
    "on Sundays",
    "on weekdays",
    "at the weekend",
    "twice a week",
    "in the morning",
    "usually",
    "often",
];

function randomForm(verb: { base: string; third: string }) {
    return pickOne([verb.base, verb.third]);
}

export const presentSimpleRule: GrammarRuleMeta = {
    key: "present-simple",
    level: "A1",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const verb = pickOne(VERBS);
            const time = pickOne(TIME_EXPRESSIONS);
            const correct = subject.person === "base" ? verb.base : verb.third;

            const otherVerb = pickOne(VERBS.filter((v) => v.base !== verb.base));
            const distractors = [
                subject.person === "base" ? verb.third : verb.base,
                randomForm(otherVerb),
                randomForm(pickOne(VERBS.filter((v) => v.base !== verb.base && v.base !== otherVerb.base))),
            ];

            return buildQuestion(`${subject.text} ___ (${verb.base}) ${time}.`, correct, distractors);
        });
    },
};
