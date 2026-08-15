import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Subject {
    text: string;
    be: "am" | "is" | "are";
}

const SUBJECTS: Subject[] = [
    { text: "I", be: "am" },
    { text: "You", be: "are" },
    { text: "We", be: "are" },
    { text: "They", be: "are" },
    { text: "He", be: "is" },
    { text: "She", be: "is" },
    { text: "It", be: "is" },
    { text: "My sister", be: "is" },
    { text: "The team", be: "is" },
    { text: "Tom", be: "is" },
];

const VERBS = ["call", "visit", "finish", "travel", "watch", "cook", "study", "clean", "buy", "meet"];

const TIME_EXPRESSIONS = [
    "tomorrow",
    "next week",
    "next year",
    "soon",
    "later",
    "next month",
    "on Friday",
    "next summer",
    "in an hour",
    "next time",
];

function willExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(VERBS);
    const time = pickOne(TIME_EXPRESSIONS);

    const correct = `will ${verb}`;
    const distractors = [`will ${verb}s`, `${subject.be} going to ${verb}`, `${subject.be} going ${verb}`];

    return buildQuestion(`${subject.text} ___ (${verb}) ${time}. (will)`, correct, distractors);
}

function goingToExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(VERBS);
    const time = pickOne(TIME_EXPRESSIONS);
    const otherSubject = pickOne(SUBJECTS.filter((s) => s.be !== subject.be));

    const correct = `${subject.be} going to ${verb}`;
    const distractors = [`will going to ${verb}`, `${otherSubject.be} going to ${verb}`, `${subject.be} going ${verb}`];

    return buildQuestion(`${subject.text} ___ (${verb}) ${time}. (going to)`, correct, distractors);
}

export const futureRule: GrammarRuleMeta = {
    key: "future-will-going-to",
    level: "A2",
    generateExercises(count) {
        return generateBatch(count, () => (Math.random() < 0.5 ? willExercise() : goingToExercise()));
    },
};
