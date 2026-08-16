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
    { text: "My sister", was: "was", be: "is" },
    { text: "The children", was: "were", be: "are" },
    { text: "Tom", was: "was", be: "is" },
];

interface Verb {
    base: string;
    ing: string;
    object: string;
}

const VERBS: Verb[] = [
    { base: "work", ing: "working", object: "in the garden" },
    { base: "play", ing: "playing", object: "outside" },
    { base: "read", ing: "reading", object: "a book" },
    { base: "watch", ing: "watching", object: "a film" },
    { base: "cook", ing: "cooking", object: "dinner" },
    { base: "run", ing: "running", object: "in the park" },
    { base: "sit", ing: "sitting", object: "at the table" },
    { base: "write", ing: "writing", object: "a letter" },
    { base: "make", ing: "making", object: "some tea" },
    { base: "talk", ing: "talking", object: "on the phone" },
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

            return buildQuestion(`${subject.text} ___ (${verb.base}) ${verb.object} ${time}.`, correct, distractors);
        });
    },
};
