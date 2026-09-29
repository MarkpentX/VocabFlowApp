import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// With "before/after" the plain Past Simple is often also acceptable
// ("They finished dinner before the guests arrived"), so it is never offered
// as a wrong option — the choices test the Past Perfect form itself.
const BANK: BankItem[] = [
    ["When we arrived at the cinema, the film ___ (already / start).", "had already started", "has already started", "have already started", "had already start"],
    ["I didn't recognise him because he ___ (change) so much.", "had changed", "has changed", "have changed", "had change"],
    ["She was nervous because she ___ (never / fly) before.", "had never flown", "has never flown", "had never flew", "have never flown"],
    ["By the time I got to the station, the train ___ (leave).", "had left", "has left", "had leaved", "have left"],
    ["They ___ (finish) dinner before the guests arrived.", "had finished", "has finished", "have finished", "had finish"],
    ["After she ___ (do) her homework, she went out.", "had done", "has done", "had did", "have done"],
    ["I couldn't get in because I ___ (lose) my keys.", "had lost", "have lost", "has lost", "had losed"],
    ["When I got home, I realised I ___ (forget) my phone at work.", "had forgotten", "have forgotten", "had forgot", "has forgotten"],
    ["Tom knew the ending because he ___ (read) the book before.", "had read", "has read", "have read", "had readed"],
    ["The streets were wet because it ___ (rain) all night.", "had rained", "has rained", "have rained", "had rain"],
    ["Had you ever ___ (see) snow before you moved to Canada?", "seen", "saw", "see", "seed"],
    ["We were tired because we ___ (walk) for hours.", "had walked", "has walked", "have walked", "had walk"],
    ["When I phoned Anna, she ___ (already / go) to bed.", "had already gone", "has already gone", "had already went", "have already gone"],
    ["It was the first time I ___ (eat) Thai food.", "had eaten", "have eaten", "has eaten", "had ate"],
    ["The party ___ (finish) by the time we got there.", "had finished", "has finished", "have finished", "had finish"],
    ["I ___ (not / meet) his wife before the wedding.", "hadn't met", "haven't met", "hasn't met", "hadn't meet"],
    ["She got a bad mark because she ___ (not / study).", "hadn't studied", "hasn't studied", "haven't studied", "hadn't study"],
    ["___ you finished your work before the boss came back?", "Had", "Have", "Has", "Did"],
    ["The plants died because nobody ___ (water) them.", "had watered", "has watered", "have watered", "had water"],
    ["Before he became an actor, he ___ (work) as a waiter.", "had worked", "has worked", "have worked", "had work"],
    ["When the police arrived, the thief ___ (escape).", "had escaped", "has escaped", "have escaped", "had escape"],
    ["I knew the city well because I ___ (live) there as a child.", "had lived", "has lived", "have lived", "had live"],
    ["She was hungry because she ___ (not / eat) anything all day.", "hadn't eaten", "hasn't eaten", "haven't eaten", "hadn't ate"],
];

export const pastPerfectRule: GrammarRuleMeta = {
    key: "past-perfect",
    level: "B2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
