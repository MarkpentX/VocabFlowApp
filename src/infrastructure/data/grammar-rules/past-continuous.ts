import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Subject {
    text: string;
    was: "was" | "were";
    be: "am" | "is" | "are";
}

const SUBJECTS: Subject[] = [
    { text: "I", was: "was", be: "am" },
    { text: "You", was: "were", be: "are" },
    { text: "We", was: "were", be: "are" },
    { text: "They", was: "were", be: "are" },
    { text: "He", was: "was", be: "is" },
    { text: "She", was: "was", be: "is" },
    { text: "It", was: "was", be: "is" },
    { text: "My sister", was: "was", be: "is" },
    { text: "The children", was: "were", be: "are" },
    { text: "Tom", was: "was", be: "is" },
];

const VERBS: { base: string; ing: string }[] = [
    { base: "work", ing: "working" },
    { base: "play", ing: "playing" },
    { base: "read", ing: "reading" },
    { base: "watch", ing: "watching" },
    { base: "cook", ing: "cooking" },
    { base: "run", ing: "running" },
    { base: "swim", ing: "swimming" },
    { base: "sit", ing: "sitting" },
    { base: "write", ing: "writing" },
    { base: "make", ing: "making" },
];

const TIME_EXPRESSIONS = [
    "at 8 o'clock last night",
    "all day yesterday",
    "at this time last week",
    "when you called",
    "at midnight",
    "during the storm",
    "the whole morning",
    "at that moment",
    "at 3pm yesterday",
    "when the phone rang",
];

export const pastContinuousRule: GrammarRuleMeta = {
    key: "past-continuous",
    level: "B1",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const verb = pickOne(VERBS);
            const time = pickOne(TIME_EXPRESSIONS);
            const correct = `${subject.was} ${verb.ing}`;

            const otherSubject = pickOne(SUBJECTS.filter((s) => s.was !== subject.was));
            const distractors = [
                `${otherSubject.was} ${verb.ing}`,
                `${subject.be} ${verb.ing}`,
                `${subject.was} ${verb.base}`,
            ];

            return buildQuestion(`${subject.text} ___ (${verb.base}) ${time}.`, correct, distractors);
        });
    },
};
