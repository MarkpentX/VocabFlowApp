import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

const BANK: BankItem[] = [
    // present passive: am / is / are + past participle
    ["English ___ (speak) in many countries.", "is spoken", "speaks", "is speaking", "is spoke"],
    ["Cars ___ (make) in this factory.", "are made", "make", "are making", "is made"],
    ["The letters ___ (deliver) every morning.", "are delivered", "deliver", "is delivered", "are deliver"],
    ["Coffee ___ (grow) in Brazil and Colombia.", "is grown", "are grown", "is grew", "was grow"],
    ["Breakfast ___ (serve) from 7 to 10 a.m.", "is served", "serves", "is serving", "are served"],
    ["The room ___ (clean) every day.", "is cleaned", "cleans", "is cleaning", "are cleaned"],
    ["Rice ___ (eat) all over the world.", "is eaten", "eats", "is eating", "is ate"],
    ["Millions of emails ___ (send) every day.", "are sent", "send", "is sent", "are sending"],
    ["The children ___ (take) to school by bus every day.", "are taken", "take", "are taking", "is taken"],
    ["These phones ___ (not / make) in Europe.", "aren't made", "don't make", "isn't made", "aren't make"],
    // past passive: was / were + past participle
    ["This bridge ___ (build) in 1890.", "was built", "built", "is built", "was build"],
    ["The Mona Lisa ___ (paint) by Leonardo da Vinci.", "was painted", "painted", "is painting", "was paint"],
    ["My bike ___ (steal) last night.", "was stolen", "stole", "was stealed", "is stolen"],
    ["The windows ___ (clean) yesterday.", "were cleaned", "was cleaned", "cleaned", "are cleaned"],
    ["The thief ___ (arrest) by the police yesterday.", "was arrested", "arrested", "is arrested", "was arrest"],
    ["Harry Potter ___ (write) by J. K. Rowling.", "was written", "wrote", "is writing", "was wrote"],
    ["The telephone ___ (invent) in 1876.", "was invented", "invented", "is invented", "was invent"],
    ["The meeting ___ (cancel) because the boss was ill.", "was cancelled", "cancelled", "is cancelled", "was cancel"],
    ["Our car ___ (repair) yesterday, so we can use it again.", "was repaired", "repaired", "is repaired", "was repair"],
    ["The new hospital ___ (open) by the mayor last week.", "was opened", "opened", "is opened", "was opening"],
    ["___ this photo taken in Italy?", "Was", "Did", "Were", "Has"],
    // future passive and passive after modals
    ["The results ___ (announce) tomorrow.", "will be announced", "will announce", "are announce", "will announced"],
    ["The film ___ (show) in cinemas next month.", "will be shown", "will show", "is show", "will shown"],
    ["Tickets can ___ (buy) online.", "be bought", "buy", "bought", "be buy"],
    ["This medicine must ___ (keep) in the fridge.", "be kept", "keep", "kept", "be keep"],
];

export const passiveVoiceRule: GrammarRuleMeta = {
    key: "passive-voice",
    level: "B2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
