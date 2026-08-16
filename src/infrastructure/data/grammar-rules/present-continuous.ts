import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Subject {
    text: string;
    be: "am" | "is" | "are";
    wasWere: "was" | "were";
}

const SUBJECTS: Subject[] = [
    { text: "I", be: "am", wasWere: "was" },
    { text: "You", be: "are", wasWere: "were" },
    { text: "We", be: "are", wasWere: "were" },
    { text: "They", be: "are", wasWere: "were" },
    { text: "He", be: "is", wasWere: "was" },
    { text: "She", be: "is", wasWere: "was" },
    { text: "My sister", be: "is", wasWere: "was" },
    { text: "My brother", be: "is", wasWere: "was" },
    { text: "Our teacher", be: "is", wasWere: "was" },
    { text: "Tom", be: "is", wasWere: "was" },
];

interface Verb {
    base: string;
    ing: string;
    object: string;
}

const VERBS: Verb[] = [
    { base: "work", ing: "working", object: "on a report" },
    { base: "play", ing: "playing", object: "video games" },
    { base: "read", ing: "reading", object: "a magazine" },
    { base: "watch", ing: "watching", object: "a film" },
    { base: "cook", ing: "cooking", object: "dinner" },
    { base: "write", ing: "writing", object: "an email" },
    { base: "make", ing: "making", object: "coffee" },
    { base: "clean", ing: "cleaning", object: "the kitchen" },
    { base: "wash", ing: "washing", object: "the dishes" },
    { base: "study", ing: "studying", object: "for an exam" },
];

const TIME_EXPRESSIONS = [
    "right now",
    "at the moment",
    "currently",
    "this week",
    "these days",
    "today",
    "at present",
    "just now",
];

export const presentContinuousRule: GrammarRuleMeta = {
    key: "present-continuous",
    level: "A1",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const verb = pickOne(VERBS);
            const time = pickOne(TIME_EXPRESSIONS);
            const correct = `${subject.be} ${verb.ing}`;

            const otherVerb = pickOne(VERBS.filter((v) => v.base !== verb.base));
            const otherSubject = pickOne(SUBJECTS.filter((s) => s.be !== subject.be));

            const distractors = [
                `${subject.be} ${otherVerb.ing}`,
                `${otherSubject.be} ${verb.ing}`,
                `${subject.wasWere} ${verb.ing}`,
            ];

            return buildQuestion(`${subject.text} ___ (${verb.base}) ${verb.object} ${time}.`, correct, distractors);
        });
    },
};
