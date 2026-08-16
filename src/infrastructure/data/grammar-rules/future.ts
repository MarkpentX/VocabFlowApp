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
    { text: "My sister", be: "is" },
    { text: "The team", be: "is" },
    { text: "Tom", be: "is" },
];

interface Verb {
    base: string;
    object: string;
}

const VERBS: Verb[] = [
    { base: "call", object: "the dentist" },
    { base: "visit", object: "her parents" },
    { base: "buy", object: "a new laptop" },
    { base: "watch", object: "the new series" },
    { base: "cook", object: "a big dinner" },
    { base: "clean", object: "the garage" },
    { base: "meet", object: "the new clients" },
    { base: "paint", object: "the fence" },
    { base: "join", object: "a gym" },
    { base: "finish", object: "the project" },
];

// Real exams never tell you which form to produce — they give a context (a
// spontaneous reaction/promise vs. an already-made plan) and expect the
// learner to infer will vs. going to from meaning. Each frame here embeds an
// unambiguous cue as an independent lead-in sentence, so the subject always
// stays sentence-initial (correct capitalization for both pronouns and names)
// and the answer can't be read off a label.
const WILL_FRAMES = [
    (subject: string, verb: Verb) =>
        `Nobody can know the future for certain. ${subject} ___ (${verb.base}) ${verb.object} eventually, I think.`,
    (subject: string, verb: Verb) =>
        `Here's my promise: ${subject} ___ (${verb.base}) ${verb.object} as soon as possible.`,
];

const GOING_TO_FRAMES = [
    (subject: string, verb: Verb) =>
        `Everything is already arranged. ${subject} ___ (${verb.base}) ${verb.object} next week.`,
    (subject: string, verb: Verb) =>
        `The decision is completely final. ${subject} ___ (${verb.base}) ${verb.object} next month.`,
];

function willExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(VERBS);
    const frame = pickOne(WILL_FRAMES);

    const correct = `will ${verb.base}`;
    const distractors = [`will ${verb.base}s`, `${subject.be} going to ${verb.base}`, `${subject.be} going ${verb.base}`];

    return buildQuestion(frame(subject.text, verb), correct, distractors);
}

function goingToExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(VERBS);
    const frame = pickOne(GOING_TO_FRAMES);
    const otherSubject = pickOne(SUBJECTS.filter((s) => s.be !== subject.be));

    const correct = `${subject.be} going to ${verb.base}`;
    const distractors = [
        `will going to ${verb.base}`,
        `${otherSubject.be} going to ${verb.base}`,
        `${subject.be} going ${verb.base}`,
    ];

    return buildQuestion(frame(subject.text, verb), correct, distractors);
}

export const futureRule: GrammarRuleMeta = {
    key: "future-will-going-to",
    level: "A2",
    generateExercises(count) {
        return generateBatch(count, () => (Math.random() < 0.5 ? willExercise() : goingToExercise()));
    },
};
