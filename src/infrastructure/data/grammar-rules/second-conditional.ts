import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// "If I was..." is common in informal speech, so "was" is never offered as a
// wrong option next to "were".
const BANK: BankItem[] = [
    // if-clause: past simple
    ["If I ___ (have) more money, I would buy a car.", "had", "have", "would have", "will have"],
    ["If I ___ (be) you, I would talk to her.", "were", "am", "will be", "be"],
    ["What would you do if you ___ (find) a wallet in the street?", "found", "find", "will find", "would find"],
    ["She would be happier if she ___ (live) near the sea.", "lived", "lives", "will live", "would live"],
    ["If he ___ (speak) English, he could get a better job.", "spoke", "speaks", "would speak", "will speak"],
    ["If it ___ (not / rain) so much here, I'd go out more.", "didn't rain", "doesn't rain", "wouldn't rain", "won't rain"],
    ["Would you help me if I ___ (ask) you?", "asked", "ask", "will ask", "would ask"],
    ["They would buy that house if it ___ (be) cheaper.", "were", "is", "will be", "would be"],
    ["If you ___ (can) live anywhere, where would you live?", "could", "can", "would can", "will can"],
    ["If I ___ (not / have) so much homework, I'd come with you.", "didn't have", "don't have", "wouldn't have", "won't have"],
    ["My dad would be angry if he ___ (know) about this.", "knew", "knows", "would know", "will know"],
    ["I'd get a dog if I ___ (not / live) in a small flat.", "didn't live", "don't live", "wouldn't live", "won't live"],
    ["If I ___ (be) taller, I'd play basketball.", "were", "am", "will be", "would be"],
    ["Where would you go if you ___ (have) a month off?", "had", "have", "would have", "will have"],
    ["If you ___ (eat) healthier food, you'd feel better.", "ate", "eat", "would eat", "will eat"],
    // result clause: would + verb
    ["If I won the lottery, I ___ (travel) around the world.", "would travel", "will travel", "travelled", "travel"],
    ["If we had a garden, we ___ (grow) our own vegetables.", "would grow", "will grow", "grew", "grow"],
    ["I ___ (not / do) that if I were you.", "wouldn't do", "won't do", "didn't do", "don't do"],
    ["If I knew her number, I ___ (call) her.", "would call", "will call", "called", "call"],
    ["If I could fly, I ___ (go) to school by air.", "would go", "will go", "went", "go"],
    ["If animals could talk, what ___ they say?", "would", "will", "do", "did"],
    ["If she studied more, she ___ (get) better marks.", "would get", "will get", "got", "gets"],
];

export const secondConditionalRule: GrammarRuleMeta = {
    key: "second-conditional",
    level: "B2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
