import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

const BANK: BankItem[] = [
    // comparatives — two things, usually with "than"
    ["An elephant is ___ (big) than a horse.", "bigger", "biger", "more big", "biggest"],
    ["This book is ___ (interesting) than the film.", "more interesting", "interestinger", "most interesting", "more interestinger"],
    ["Today is ___ (hot) than yesterday.", "hotter", "hoter", "more hot", "hottest"],
    ["My English is ___ (good) now than last year.", "better", "gooder", "more good", "best"],
    ["A plane is ___ (fast) than a train.", "faster", "more fast", "fastest", "fastter"],
    ["Chess is ___ (difficult) than draughts.", "more difficult", "difficulter", "most difficult", "more difficulter"],
    ["My bag is ___ (heavy) than yours.", "heavier", "heavyer", "more heavy", "heaviest"],
    ["Walking is ___ (slow) than cycling.", "slower", "more slow", "slowest", "slowlier"],
    ["This exercise is ___ (easy) than the last one.", "easier", "easyer", "more easy", "easiest"],
    ["My flat is ___ (small) than my friend's.", "smaller", "more small", "smallest", "smaler"],
    ["Gold is ___ (expensive) than silver.", "more expensive", "expensiver", "most expensive", "more expensiver"],
    ["The weather today is ___ (bad) than yesterday.", "worse", "badder", "more bad", "worst"],
    ["My sister is two years ___ (young) than me.", "younger", "more young", "youngest", "youngger"],
    ["The second exam was much ___ (easy) than the first.", "easier", "more easy", "easiest", "easyer"],
    // superlatives — one out of a group, with "the"
    ["Mount Everest is the ___ (high) mountain in the world.", "highest", "higher", "most high", "more high"],
    ["This is the ___ (bad) film I have ever seen.", "worst", "worse", "baddest", "most bad"],
    ["She is the ___ (tall) girl in our class.", "tallest", "taller", "most tall", "more tall"],
    ["This is the ___ (expensive) hotel in the city.", "most expensive", "expensivest", "more expensive", "most expensivest"],
    ["It's the ___ (happy) day of my life!", "happiest", "happier", "happyest", "more happy"],
    ["Who is the ___ (old) person in your family?", "oldest", "older", "most old", "elder"],
    ["The Nile is the ___ (long) river in Africa.", "longest", "longer", "most long", "more long"],
    ["This is the ___ (comfortable) chair in the house.", "most comfortable", "comfortablest", "more comfortable", "most comfortablest"],
    ["It's the ___ (cold) winter for twenty years.", "coldest", "colder", "most cold", "more cold"],
    ["Which is the ___ (beautiful) city you have ever visited?", "most beautiful", "beautifullest", "more beautiful", "most beautifulest"],
    ["He is the ___ (good) player in the team.", "best", "better", "goodest", "most good"],
    // as ... as — the adjective does not change
    ["This test is not as ___ (hard) as the last one.", "hard", "harder", "hardest", "more hard"],
    ["Tom is as ___ (tall) as his father.", "tall", "taller", "tallest", "more tall"],
];

export const comparativesRule: GrammarRuleMeta = {
    key: "comparatives-superlatives",
    level: "A2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
