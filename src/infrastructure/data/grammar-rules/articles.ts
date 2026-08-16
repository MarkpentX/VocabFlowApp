import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

const VOWEL_SOUND_NOUNS = ["apple", "elephant", "orange", "umbrella", "idea", "hour", "engineer", "island"];
const CONSONANT_SOUND_NOUNS = [
    "dog",
    "cat",
    "book",
    "car",
    "house",
    "teacher",
    "banana",
    "chair",
    "table",
    "student",
    "phone",
    "garden",
];

// Kept to nouns every adjective below can plausibly describe — people-nouns
// like "teacher"/"student" paired badly with several (e.g. "crowded", "expensive").
const SECOND_MENTION_NOUNS = [
    "dog",
    "cat",
    "book",
    "car",
    "house",
    "chair",
    "table",
    "phone",
    "garden",
    "bike",
    "restaurant",
    "hotel",
    "movie",
];

const ADJECTIVES = [
    "friendly",
    "old",
    "new",
    "big",
    "small",
    "expensive",
    "useful",
    "popular",
    "famous",
    "comfortable",
    "amazing",
    "modern",
    "quiet",
    "beautiful",
];

const UNIQUE_NOUNS = ["sun", "moon", "sky", "internet", "world", "ocean", "universe", "government", "news", "weather"];

function aAnExercise() {
    const useVowel = Math.random() < 0.5;
    const noun = useVowel ? pickOne(VOWEL_SOUND_NOUNS) : pickOne(CONSONANT_SOUND_NOUNS);
    const correct = useVowel ? "an" : "a";
    const distractors = [useVowel ? "a" : "an", "the", "some"];
    return buildQuestion(`It's ___ ${noun}.`, correct, distractors);
}

function secondMentionExercise() {
    const noun = pickOne(SECOND_MENTION_NOUNS);
    const adjective = pickOne(ADJECTIVES);
    const firstArticle = /^[aeiou]/i.test(noun) ? "an" : "a";
    return buildQuestion(
        `I have ${firstArticle} ${noun}. ___ ${noun} is ${adjective}.`,
        "The",
        ["A", "An", "Some"]
    );
}

function uniqueNounExercise() {
    const noun = pickOne(UNIQUE_NOUNS);
    return buildQuestion(`___ ${noun} is very important today.`, "The", ["A", "An", "Some"]);
}

export const articlesRule: GrammarRuleMeta = {
    key: "articles",
    level: "A1",
    generateExercises(count) {
        return generateBatch(count, () => {
            const roll = Math.random();
            if (roll < 0.4) {
                return aAnExercise();
            }
            if (roll < 0.8) {
                return secondMentionExercise();
            }
            return uniqueNounExercise();
        });
    },
};
