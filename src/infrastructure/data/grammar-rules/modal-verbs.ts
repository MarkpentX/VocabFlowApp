import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// "must" and "have to" are interchangeable in most positive sentences, so they
// never appear together as options there. The classic contrast that IS
// unambiguous — "mustn't" (forbidden) vs "don't have to" (not necessary) — is
// drilled on its own.
const BANK: BankItem[] = [
    // can / can't / could — ability, requests
    ["My grandmother is 80, but she ___ still swim very well.", "can", "must", "should", "has"],
    ["He ___ speak three languages.", "can", "cans", "can to", "is can"],
    ["I ___ find my keys anywhere. Have you seen them?", "can't", "mustn't", "don't have to", "shouldn't"],
    ["She ___ play the guitar, but she can play the piano.", "can't", "mustn't", "doesn't have to", "shouldn't"],
    ["I'm sorry, I ___ come to your party on Saturday. I'm working.", "can't", "mustn't", "don't have to", "shouldn't"],
    ["I ___ read when I was four.", "could", "can", "must", "should"],
    ["___ you help me with my homework, please?", "Could", "Must", "Should", "Have"],
    ["___ I open the window? It's hot in here.", "Can", "Have", "Do", "Am"],
    // should — advice
    ["You look tired. You ___ go to bed earlier.", "should", "should to", "shoulds", "ought"],
    ["You ___ eat so many sweets — they're bad for your teeth.", "shouldn't", "don't have to", "shouldn't to", "not should"],
    ["You ___ try this cake — it's delicious!", "should", "should to", "shoulds", "ought"],
    // must / have to — obligation
    ["Drivers ___ stop at a red light.", "must", "mustn't", "don't have to", "can't"],
    ["In the UK, people ___ drive on the left.", "have to", "has to", "must to", "can to"],
    ["She ___ wear a uniform at her school.", "has to", "have to", "must to", "has"],
    ["My brother ___ work on Saturdays, but he gets Sundays off.", "has to", "have to", "must to", "have got"],
    ["You ___ be 18 to vote in most countries.", "have to", "has to", "must to", "should to"],
    ["When I was a child, I ___ wear glasses.", "had to", "must", "have to", "should"],
    // mustn't (forbidden) vs don't have to (not necessary)
    ["You ___ smoke in the hospital. It's forbidden.", "mustn't", "don't have to", "can", "should"],
    ["You ___ touch that wire! It's dangerous.", "mustn't", "don't have to", "needn't", "can"],
    ["It's a secret — you ___ tell anyone!", "mustn't", "don't have to", "needn't", "haven't to"],
    ["Students ___ use their phones during the exam.", "mustn't", "don't have to", "must", "needn't"],
    ["It's Sunday tomorrow, so I ___ get up early.", "don't have to", "mustn't", "can't", "haven't to"],
    ["We ___ pay for the museum — it's free.", "don't have to", "mustn't", "can't", "doesn't have to"],
    ["You ___ come if you don't want to.", "don't have to", "mustn't", "have to", "can't"],
    ["You ___ bring any food — there will be plenty.", "don't have to", "mustn't", "can't", "haven't to"],
    ["He ___ wear a suit to work — his office is very relaxed.", "doesn't have to", "mustn't", "don't have to", "can't"],
];

export const modalVerbsRule: GrammarRuleMeta = {
    key: "modal-verbs",
    level: "A2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
