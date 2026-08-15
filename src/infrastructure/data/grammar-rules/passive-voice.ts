import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Subject {
    text: string;
    be: "is" | "are";
    was: "was" | "were";
}

const SUBJECTS: Subject[] = [
    { text: "The car", be: "is", was: "was" },
    { text: "The cars", be: "are", was: "were" },
    { text: "The letter", be: "is", was: "was" },
    { text: "The letters", be: "are", was: "were" },
    { text: "This book", be: "is", was: "was" },
    { text: "These books", be: "are", was: "were" },
    { text: "The window", be: "is", was: "was" },
    { text: "The windows", be: "are", was: "were" },
    { text: "The house", be: "is", was: "was" },
    { text: "The doors", be: "are", was: "were" },
];

const VERBS: { base: string; participle: string }[] = [
    { base: "clean", participle: "cleaned" },
    { base: "build", participle: "built" },
    { base: "write", participle: "written" },
    { base: "make", participle: "made" },
    { base: "sell", participle: "sold" },
    { base: "break", participle: "broken" },
    { base: "paint", participle: "painted" },
    { base: "deliver", participle: "delivered" },
    { base: "close", participle: "closed" },
    { base: "repair", participle: "repaired" },
];

const PRESENT_TIME = ["every week", "every day", "regularly", "often", "usually"];
const PAST_TIME = ["last year", "yesterday", "last month", "in 2020", "last week"];

function presentPassiveExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(VERBS);
    const time = pickOne(PRESENT_TIME);
    const otherSubject = pickOne(SUBJECTS.filter((s) => s.be !== subject.be));

    const correct = `${subject.be} ${verb.participle}`;
    const distractors = [`${subject.was} ${verb.participle}`, `${subject.be} ${verb.base}`, `${otherSubject.be} ${verb.participle}`];

    return buildQuestion(`${subject.text} ___ (${verb.base}) ${time}. (present passive)`, correct, distractors);
}

function pastPassiveExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(VERBS);
    const time = pickOne(PAST_TIME);
    const otherSubject = pickOne(SUBJECTS.filter((s) => s.was !== subject.was));

    const correct = `${subject.was} ${verb.participle}`;
    const distractors = [`${subject.be} ${verb.participle}`, `${subject.was} ${verb.base}`, `${otherSubject.was} ${verb.participle}`];

    return buildQuestion(`${subject.text} ___ (${verb.base}) ${time}. (past passive)`, correct, distractors);
}

export const passiveVoiceRule: GrammarRuleMeta = {
    key: "passive-voice",
    level: "B2",
    generateExercises(count) {
        return generateBatch(count, () => (Math.random() < 0.5 ? presentPassiveExercise() : pastPassiveExercise()));
    },
};
