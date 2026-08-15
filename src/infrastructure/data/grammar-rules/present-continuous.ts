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
    { text: "It", be: "is", wasWere: "was" },
    { text: "My sister", be: "is", wasWere: "was" },
    { text: "The dog", be: "is", wasWere: "was" },
    { text: "Tom", be: "is", wasWere: "was" },
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
    "right now",
    "at the moment",
    "currently",
    "this week",
    "these days",
    "today",
    "at present",
    "just now",
    "still",
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

            return buildQuestion(`${subject.text} ___ (${verb.base}) ${time}.`, correct, distractors);
        });
    },
};
