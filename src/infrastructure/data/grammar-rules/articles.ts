import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

const NONE = "no article";

const BANK: BankItem[] = [
    // a / an — chosen by the first SOUND, not the first letter
    ["She is ___ doctor.", "a", "an", "the", NONE],
    ["My uncle is ___ engineer.", "an", "a", "the", NONE],
    ["My brother wants to be ___ actor.", "an", "a", "the", NONE],
    ["It takes ___ hour to get there by train.", "an", "a", "the", NONE],
    ["He's ___ honest man.", "an", "a", "the", NONE],
    ["My cousin is ___ university student.", "a", "an", "the", NONE],
    ["She's ___ European citizen.", "a", "an", "the", NONE],
    ["Would you like ___ orange or a banana?", "an", "a", "the", NONE],
    ["We had ___ amazing holiday in Spain.", "an", "a", "the", NONE],
    ["I've never seen ___ elephant in real life.", "an", "a", "the", NONE],
    ["Do you have ___ umbrella I can borrow?", "an", "a", "the", NONE],
    ["It was ___ unusual situation.", "an", "a", "the", NONE],
    ["What ___ beautiful day!", "a", "an", "the", NONE],
    ["It's ___ useful app for learning words.", "a", "an", "the", NONE],
    // the — something already mentioned or the only one
    ["I have a dog and a cat. ___ dog is black and the cat is white.", "The", "A", "An", NONE],
    ["I bought a shirt and a jacket. ___ jacket was very expensive.", "The", "A", "An", NONE],
    ["___ sun rises in the east.", "The", "A", "An", NONE],
    ["___ Moon goes around the Earth.", "The", "A", "An", NONE],
    ["Paris is ___ capital of France.", "the", "a", "an", NONE],
    ["Mount Everest is ___ highest mountain in the world.", "the", "a", "an", NONE],
    ["We live on ___ third floor.", "the", "a", "an", NONE],
    ["Look at ___ sky! It's so blue today.", "the", "a", "an", NONE],
    // no article — meals, sports, languages, transport after "by", things in general
    ["I usually have ___ breakfast at 8 o'clock.", NONE, "a", "an", "the"],
    ["He goes to work by ___ bus.", NONE, "a", "an", "the"],
    ["Can you play ___ tennis?", NONE, "a", "an", "the"],
    ["She speaks ___ English very well.", NONE, "a", "an", "the"],
    ["I love ___ music, especially jazz.", NONE, "a", "an", "the"],
];

export const articlesRule: GrammarRuleMeta = {
    key: "articles",
    level: "A1",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
