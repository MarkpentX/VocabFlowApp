import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// Phrases where British and American usage differ ("at/on the weekend",
// "in/on the bus") or where two prepositions are both correct ("at/in a bank",
// "at/by the bus stop") are deliberately left out.
const BANK: BankItem[] = [
    // time
    ["The film starts ___ 8 o'clock.", "at", "on", "in", "for"],
    ["Let's meet ___ noon.", "at", "on", "in", "to"],
    ["Dinner is ___ 7:30.", "at", "on", "in", "to"],
    ["I can't sleep ___ night.", "at", "in", "on", "to"],
    ["We have a meeting ___ Monday.", "on", "in", "at", "to"],
    ["The party is ___ Saturday evening.", "on", "in", "at", "to"],
    ["The concert is ___ 12 June.", "on", "in", "at", "to"],
    ["The shops are closed ___ Christmas Day.", "on", "in", "at", "to"],
    ["The museum is closed ___ Mondays.", "on", "in", "at", "to"],
    ["My birthday is ___ March.", "in", "on", "at", "to"],
    ["I was born ___ 2005.", "in", "on", "at", "of"],
    ["She usually gets up early ___ the morning.", "in", "on", "at", "to"],
    ["I always do my homework ___ the evening.", "in", "on", "at", "to"],
    ["We usually go skiing ___ winter.", "in", "on", "at", "to"],
    ["Many trees lose their leaves ___ autumn.", "in", "on", "at", "to"],
    // place
    ["My keys are ___ my bag.", "in", "on", "at", "to"],
    ["The milk is ___ the fridge.", "in", "on", "at", "to"],
    ["She lives ___ London.", "in", "at", "on", "to"],
    ["The children are playing ___ the garden.", "in", "on", "at", "to"],
    ["There is a picture ___ the wall.", "on", "in", "at", "to"],
    ["Put the plates ___ the table, please.", "on", "in", "at", "to"],
    ["Our flat is ___ the fifth floor.", "on", "in", "at", "to"],
    ["There's a spider ___ the ceiling!", "on", "in", "at", "to"],
    ["I'm staying ___ home tonight.", "at", "in", "on", "to"],
    ["There's someone ___ the door.", "at", "in", "on", "to"],
    ["We arrived ___ the airport two hours early.", "at", "in", "on", "to"],
    ["My brother is still ___ school — he finishes at three.", "at", "on", "to", "of"],
];

export const prepositionsRule: GrammarRuleMeta = {
    key: "prepositions-time-place",
    level: "A1",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
