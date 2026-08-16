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
    { text: "My sister", person: "third" },
    { text: "My brother", person: "third" },
    { text: "Our teacher", person: "third" },
    { text: "Tom", person: "third" },
];

interface Verb {
    base: string;
    third: string;
    object: string;
}

// Every verb carries the object it needs so the finished sentence is a complete,
// natural statement — real coursebooks (Cambridge, Murphy) never drill a bare
// transitive verb like "watches" or "has" without something to attach it to.
const VERBS: Verb[] = [
    { base: "work", third: "works", object: "in an office" },
    { base: "play", third: "plays", object: "football" },
    { base: "watch", third: "watches", object: "TV" },
    { base: "study", third: "studies", object: "English" },
    { base: "cook", third: "cooks", object: "dinner" },
    { base: "go", third: "goes", object: "to the gym" },
    { base: "do", third: "does", object: "the shopping" },
    { base: "have", third: "has", object: "breakfast" },
    { base: "clean", third: "cleans", object: "the house" },
    { base: "read", third: "reads", object: "the news" },
];

const TIME_EXPRESSIONS = [
    "every day",
    "every morning",
    "every week",
    "on Sundays",
    "on weekdays",
    "at the weekend",
    "twice a week",
    "usually",
    "often",
    "always",
];

function randomForm(verb: Verb) {
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
            const thirdVerb = pickOne(VERBS.filter((v) => v.base !== verb.base && v.base !== otherVerb.base));
            const distractors = [
                subject.person === "base" ? verb.third : verb.base,
                randomForm(otherVerb),
                randomForm(thirdVerb),
            ];

            return buildQuestion(`${subject.text} ___ (${verb.base}) ${verb.object} ${time}.`, correct, distractors);
        });
    },
};
