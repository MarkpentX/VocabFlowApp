import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

const SPEAKERS = ["He", "She", "They"];

const VERBS: { base: string; third: string; past: string }[] = [
    { base: "like", third: "likes", past: "liked" },
    { base: "love", third: "loves", past: "loved" },
    { base: "want", third: "wants", past: "wanted" },
    { base: "need", third: "needs", past: "needed" },
    { base: "enjoy", third: "enjoys", past: "enjoyed" },
    { base: "hate", third: "hates", past: "hated" },
    { base: "know", third: "knows", past: "knew" },
    { base: "have", third: "has", past: "had" },
    { base: "live", third: "lives", past: "lived" },
    { base: "work", third: "works", past: "worked" },
];

const OBJECTS = [
    "pizza",
    "the city",
    "her job",
    "his new car",
    "the plan",
    "coffee",
    "the book",
    "this song",
    "the weather here",
    "her new phone",
];

export const reportedSpeechRule: GrammarRuleMeta = {
    key: "reported-speech",
    level: "B2",
    generateExercises(count) {
        return generateBatch(count, () => {
            const speaker = pickOne(SPEAKERS);
            const verb = pickOne(VERBS);
            const object = pickOne(OBJECTS);
            const correct = verb.past;
            // "verb.third" is deliberately excluded from distractors — backshift is
            // optional in real English for still-true statements, so the present-tense
            // form would also be a defensible answer here and made the question ambiguous.
            const distractors = [verb.base, `will ${verb.base}`, `would ${verb.base}`];

            return buildQuestion(
                `${speaker} said (that) ${speaker.toLowerCase()} ___ (${verb.base}) ${object}.`,
                correct,
                distractors
            );
        });
    },
};
