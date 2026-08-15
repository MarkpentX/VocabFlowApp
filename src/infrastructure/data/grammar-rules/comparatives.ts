import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

const ADJECTIVES: { base: string; comparative: string; superlative: string }[] = [
    { base: "tall", comparative: "taller", superlative: "tallest" },
    { base: "big", comparative: "bigger", superlative: "biggest" },
    { base: "happy", comparative: "happier", superlative: "happiest" },
    { base: "beautiful", comparative: "more beautiful", superlative: "most beautiful" },
    { base: "expensive", comparative: "more expensive", superlative: "most expensive" },
    { base: "good", comparative: "better", superlative: "best" },
    { base: "bad", comparative: "worse", superlative: "worst" },
    { base: "fast", comparative: "faster", superlative: "fastest" },
    { base: "easy", comparative: "easier", superlative: "easiest" },
    { base: "interesting", comparative: "more interesting", superlative: "most interesting" },
    { base: "hot", comparative: "hotter", superlative: "hottest" },
    { base: "cheap", comparative: "cheaper", superlative: "cheapest" },
];

const COMPARISON_PAIRS = [
    ["A car", "a bicycle"],
    ["An elephant", "a mouse"],
    ["Summer", "winter"],
    ["This book", "that book"],
    ["My phone", "your phone"],
    ["The city", "the countryside"],
    ["Gold", "silver"],
    ["A plane", "a train"],
    ["Coffee", "tea"],
    ["This road", "that road"],
    ["My house", "his house"],
    ["This exam", "the last one"],
];

const SUPERLATIVE_SUBJECTS = [
    "Everest",
    "This building",
    "My brother",
    "That restaurant",
    "The Nile",
    "This exam",
    "Her house",
    "That movie",
    "The Sahara",
    "This road",
    "Our team",
    "This city",
];

function comparativeExercise() {
    const adjective = pickOne(ADJECTIVES);
    const [subjectA, subjectB] = pickOne(COMPARISON_PAIRS);
    const otherAdjective = pickOne(ADJECTIVES.filter((a) => a.base !== adjective.base));

    const correct = adjective.comparative;
    const distractors = [adjective.base, adjective.superlative, otherAdjective.comparative];

    return buildQuestion(`${subjectA} is ___ (${adjective.base}) than ${subjectB}.`, correct, distractors);
}

function superlativeExercise() {
    const adjective = pickOne(ADJECTIVES);
    const subject = pickOne(SUPERLATIVE_SUBJECTS);
    const otherAdjective = pickOne(ADJECTIVES.filter((a) => a.base !== adjective.base));

    const correct = adjective.superlative;
    const distractors = [adjective.base, adjective.comparative, otherAdjective.superlative];

    return buildQuestion(`${subject} is the ___ (${adjective.base}) one I know.`, correct, distractors);
}

export const comparativesRule: GrammarRuleMeta = {
    key: "comparatives-superlatives",
    level: "A2",
    generateExercises(count) {
        return generateBatch(count, () => (Math.random() < 0.5 ? comparativeExercise() : superlativeExercise()));
    },
};
