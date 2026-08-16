import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

type RelativeWord = "who" | "which" | "where" | "whose";
const ALL_RELATIVE_WORDS: RelativeWord[] = ["who", "which", "where", "whose"];

function distractorsFor(correct: RelativeWord): string[] {
    return ALL_RELATIVE_WORDS.filter((w) => w !== correct);
}

const PEOPLE = ["The man", "The woman", "The teacher", "My friend", "The doctor", "The student", "My neighbor", "The boy", "The girl", "The manager"];
const PEOPLE_ACTIONS = ["lives next door", "helped me", "teaches math", "called yesterday", "works here", "won the prize", "wrote this book", "answered the question", "fixed my car", "sang the song"];

interface Thing {
    text: string;
    clauses: string[];
}

// Each thing only pairs with clauses that make sense for it — a song can be
// written or sung, but never "built"; a bridge can be designed, but never "lost".
const THINGS: Thing[] = [
    { text: "The car", clauses: ["I bought", "I fixed", "we love", "I lost", "she sold"] },
    { text: "The book", clauses: ["I bought", "she wrote", "I lost", "we love", "I recommended"] },
    { text: "The movie", clauses: ["we watched", "we love", "she directed", "I recommended"] },
    { text: "The house", clauses: ["he built", "I painted", "we love", "they designed", "I bought"] },
    { text: "The phone", clauses: ["I bought", "I lost", "I fixed", "we love"] },
    { text: "The restaurant", clauses: ["they opened", "we love", "I recommended", "she owns"] },
    { text: "The picture", clauses: ["I painted", "we love", "I found", "I took"] },
    { text: "The song", clauses: ["she wrote", "we love", "I heard", "he sang"] },
    { text: "The laptop", clauses: ["I bought", "I lost", "I fixed", "we love"] },
    { text: "The bridge", clauses: ["they designed", "he built", "we love", "I photographed"] },
];

const PLACES = ["The city", "The restaurant", "The school", "The park", "The hotel", "The village", "The office", "The beach", "The store", "The café"];
const PLACE_CLAUSES = ["we met", "I grew up", "she works", "we had dinner", "he studied", "they live", "I was born", "we stayed", "she teaches", "he plays football"];

const OWNERS = ["The man", "The woman", "The student", "My neighbor", "The boy", "The writer", "The artist", "The driver", "The girl", "The scientist"];
const POSSESSED_CLAUSES = ["car is red", "book became famous", "phone rang", "house burned down", "dog barks a lot", "painting sold for millions", "bike was stolen", "sister called me", "brother won the race", "research changed everything"];

function whoExercise() {
    const person = pickOne(PEOPLE);
    const action = pickOne(PEOPLE_ACTIONS);
    return buildQuestion(`${person} ___ ${action} is well known.`, "who", distractorsFor("who"));
}

function whichExercise() {
    const thing = pickOne(THINGS);
    const clause = pickOne(thing.clauses);
    return buildQuestion(`${thing.text} ___ ${clause} is very popular.`, "which", distractorsFor("which"));
}

function whereExercise() {
    const place = pickOne(PLACES);
    const clause = pickOne(PLACE_CLAUSES);
    return buildQuestion(`${place} ___ ${clause} is beautiful.`, "where", distractorsFor("where"));
}

function whoseExercise() {
    const owner = pickOne(OWNERS);
    const clause = pickOne(POSSESSED_CLAUSES);
    return buildQuestion(`${owner} ___ ${clause} is my friend.`, "whose", distractorsFor("whose"));
}

export const relativeClausesRule: GrammarRuleMeta = {
    key: "relative-clauses",
    level: "B2",
    generateExercises(count) {
        return generateBatch(count, () => {
            const roll = Math.random();
            if (roll < 0.25) return whoExercise();
            if (roll < 0.5) return whichExercise();
            if (roll < 0.75) return whereExercise();
            return whoseExercise();
        });
    },
};
