import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Verb {
    base: string;
    participle: string;
}

const CLEAN: Verb = { base: "clean", participle: "cleaned" };
const BUILD: Verb = { base: "build", participle: "built" };
const WRITE: Verb = { base: "write", participle: "written" };
const MAKE: Verb = { base: "make", participle: "made" };
const SELL: Verb = { base: "sell", participle: "sold" };
const BREAK: Verb = { base: "break", participle: "broken" };
const PAINT: Verb = { base: "paint", participle: "painted" };
const DELIVER: Verb = { base: "deliver", participle: "delivered" };
const CLOSE: Verb = { base: "close", participle: "closed" };
const REPAIR: Verb = { base: "repair", participle: "repaired" };
const TRANSLATE: Verb = { base: "translate", participle: "translated" };

interface Subject {
    text: string;
    be: "is" | "are";
    was: "was" | "were";
    verbs: Verb[];
}

// Every subject only pairs with verbs that make sense for it — a letter can be
// written or delivered, but never "built"; a car can be built or sold, but
// never "written". Real coursebook passive-voice drills always match the
// object to a plausible action, so the cross-product is curated per subject
// instead of pulling from one shared verb pool.
const SUBJECTS: Subject[] = [
    { text: "The car", be: "is", was: "was", verbs: [CLEAN, BUILD, SELL, REPAIR, MAKE] },
    { text: "The cars", be: "are", was: "were", verbs: [CLEAN, BUILD, SELL, REPAIR, MAKE] },
    { text: "The letter", be: "is", was: "was", verbs: [WRITE, DELIVER, TRANSLATE] },
    { text: "The letters", be: "are", was: "were", verbs: [WRITE, DELIVER, TRANSLATE] },
    { text: "This book", be: "is", was: "was", verbs: [WRITE, SELL, TRANSLATE] },
    { text: "These books", be: "are", was: "were", verbs: [WRITE, SELL, TRANSLATE] },
    { text: "The window", be: "is", was: "was", verbs: [CLEAN, BREAK, REPAIR, CLOSE, PAINT] },
    { text: "The windows", be: "are", was: "were", verbs: [CLEAN, BREAK, REPAIR, CLOSE, PAINT] },
    { text: "The house", be: "is", was: "was", verbs: [BUILD, CLEAN, SELL, PAINT, REPAIR] },
    { text: "The doors", be: "are", was: "were", verbs: [CLOSE, REPAIR, PAINT, BUILD] },
];

const PRESENT_TIME = ["every week", "regularly", "often", "usually"];
const PAST_TIME = ["last year", "yesterday", "last month", "in 2020", "last week"];

function presentPassiveExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(subject.verbs);
    const time = pickOne(PRESENT_TIME);
    const otherSubject = pickOne(SUBJECTS.filter((s) => s.be !== subject.be));

    const correct = `${subject.be} ${verb.participle}`;
    const distractors = [`${subject.was} ${verb.participle}`, `${subject.be} ${verb.base}`, `${otherSubject.be} ${verb.participle}`];

    return buildQuestion(`${subject.text} ___ (${verb.base}) ${time}.`, correct, distractors);
}

function pastPassiveExercise() {
    const subject = pickOne(SUBJECTS);
    const verb = pickOne(subject.verbs);
    const time = pickOne(PAST_TIME);
    const otherSubject = pickOne(SUBJECTS.filter((s) => s.was !== subject.was));

    const correct = `${subject.was} ${verb.participle}`;
    const distractors = [`${subject.be} ${verb.participle}`, `${subject.was} ${verb.base}`, `${otherSubject.was} ${verb.participle}`];

    return buildQuestion(`${subject.text} ___ (${verb.base}) ${time}.`, correct, distractors);
}

export const passiveVoiceRule: GrammarRuleMeta = {
    key: "passive-voice",
    level: "B2",
    generateExercises(count) {
        return generateBatch(count, () => (Math.random() < 0.5 ? presentPassiveExercise() : pastPassiveExercise()));
    },
};
