import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

type Preposition = "at" | "on" | "in";

const ALL_PREPOSITIONS: Preposition[] = ["at", "on", "in"];
const EXTRA_DISTRACTORS = ["near", "by", "under"];

const TIME_PAIRS: { phrase: string; correct: Preposition }[] = [
    { phrase: "5 o'clock", correct: "at" },
    { phrase: "noon", correct: "at" },
    { phrase: "midnight", correct: "at" },
    { phrase: "night", correct: "at" },
    { phrase: "sunrise", correct: "at" },
    { phrase: "7:30", correct: "at" },
    { phrase: "lunchtime", correct: "at" },
    { phrase: "sunset", correct: "at" },
    { phrase: "breakfast", correct: "at" },
    { phrase: "dawn", correct: "at" },
    { phrase: "Monday", correct: "on" },
    { phrase: "Friday", correct: "on" },
    { phrase: "my birthday", correct: "on" },
    { phrase: "Christmas Day", correct: "on" },
    { phrase: "weekdays", correct: "on" },
    { phrase: "1 May", correct: "on" },
    { phrase: "Sunday morning", correct: "on" },
    { phrase: "New Year's Day", correct: "on" },
    { phrase: "Tuesday evening", correct: "on" },
    { phrase: "Halloween", correct: "on" },
    { phrase: "January", correct: "in" },
    { phrase: "summer", correct: "in" },
    { phrase: "2020", correct: "in" },
    { phrase: "the morning", correct: "in" },
    { phrase: "the afternoon", correct: "in" },
    { phrase: "the evening", correct: "in" },
    { phrase: "spring", correct: "in" },
    { phrase: "the 21st century", correct: "in" },
    { phrase: "November", correct: "in" },
    { phrase: "autumn", correct: "in" },
];

const PLACE_PAIRS: { phrase: string; correct: Preposition }[] = [
    { phrase: "the bus stop", correct: "at" },
    { phrase: "home", correct: "at" },
    { phrase: "the door", correct: "at" },
    { phrase: "school", correct: "at" },
    { phrase: "the airport", correct: "at" },
    { phrase: "work", correct: "at" },
    { phrase: "the museum", correct: "at" },
    { phrase: "the table", correct: "on" },
    { phrase: "the wall", correct: "on" },
    { phrase: "the second floor", correct: "on" },
    { phrase: "the bus", correct: "on" },
    { phrase: "the shelf", correct: "on" },
    { phrase: "the ceiling", correct: "on" },
    { phrase: "the box", correct: "in" },
    { phrase: "the room", correct: "in" },
    { phrase: "the car", correct: "in" },
    { phrase: "London", correct: "in" },
    { phrase: "the kitchen", correct: "in" },
    { phrase: "the garden", correct: "in" },
    { phrase: "the fridge", correct: "in" },
    { phrase: "the corner", correct: "in" },
];

const TIME_FRAMES = [
    "I'll see you ___ {phrase}.",
    "The meeting starts ___ {phrase}.",
    "She was born ___ {phrase}.",
    "We can meet ___ {phrase}.",
];

const PLACE_FRAMES = [
    "The keys are ___ {phrase}.",
    "I left my bag ___ {phrase}.",
    "The cat is sitting ___ {phrase}.",
    "We found it ___ {phrase}.",
];

function buildFromPair(frame: string, pair: { phrase: string; correct: Preposition }) {
    const wrongPrepositions = ALL_PREPOSITIONS.filter((p) => p !== pair.correct);
    const distractors = [...wrongPrepositions, pickOne(EXTRA_DISTRACTORS)];
    return buildQuestion(frame.replace("{phrase}", pair.phrase), pair.correct, distractors);
}

export const prepositionsRule: GrammarRuleMeta = {
    key: "prepositions-time-place",
    level: "A1",
    generateExercises(count) {
        return generateBatch(count, () => {
            if (Math.random() < 0.5) {
                return buildFromPair(pickOne(TIME_FRAMES), pickOne(TIME_PAIRS));
            }
            return buildFromPair(pickOne(PLACE_FRAMES), pickOne(PLACE_PAIRS));
        });
    },
};
