import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// Past Simple forms that American English allows in some of these sentences
// ("I just finished", "Did you eat yet?") are never offered as wrong options.
const BANK: BankItem[] = [
    ["I ___ (never / be) to Japan.", "have never been", "has never been", "have never went", "am never been"],
    ["She ___ (just / finish) her homework.", "has just finished", "have just finished", "has just finish", "is just finished"],
    ["We ___ (know) each other since 2015.", "have known", "know", "knew", "are knowing"],
    ["They ___ (live) in this town for ten years, and they still love it.", "have lived", "live", "are living", "has lived"],
    ["Have you ever ___ (eat) sushi?", "eaten", "ate", "eat", "eated"],
    ["I ___ (lose) my keys. Can you help me find them?", "have lost", "has lost", "have losed", "have lose"],
    ["He ___ (not / call) me yet.", "hasn't called", "haven't called", "hasn't call", "not has called"],
    ["This is the best film I ___ (ever / see).", "have ever seen", "has ever seen", "have ever saw", "am ever seen"],
    ["Sorry, Tom isn't here. He ___ (already / go) home.", "has already gone", "have already gone", "has already went", "is already go"],
    ["My parents ___ (be) married for 25 years, and they're still happy.", "have been", "are", "has been", "were being"],
    ["I ___ (not / see) him for a long time.", "haven't seen", "hasn't seen", "haven't saw", "don't see"],
    ["Look! Somebody ___ (break) the window.", "has broken", "have broken", "has broke", "is break"],
    ["Oh no! I ___ (forget) my password.", "have forgotten", "has forgotten", "have forgot", "am forget"],
    ["Kate ___ (be) to the USA twice.", "has been", "have been", "has went", "is been"],
    ["She ___ (write) three books so far.", "has written", "have written", "has wrote", "wrote"],
    ["How long ___ you known Anna?", "have", "did", "are", "do"],
    ["Have you finished your lunch? — Yes, I ___.", "have", "did", "has", "am"],
    // for / since / yet / already / ever
    ["I haven't seen him ___ Monday.", "since", "for", "from", "ago"],
    ["I've had this car ___ 2019.", "since", "for", "from", "ago"],
    ["She has worked here ___ five years.", "for", "since", "from", "during"],
    ["We've lived in this flat ___ three months.", "for", "since", "during", "ago"],
    ["Has the film started ___?", "yet", "still", "ago", "since"],
    ["I haven't finished my project ___.", "yet", "already", "just", "ever"],
    ["I've ___ done my homework, so I can go out now.", "already", "yet", "ever", "since"],
    ["Have you ___ been to Canada?", "ever", "yet", "since", "ago"],
    // Present Perfect vs Past Simple — a finished time needs the Past Simple
    ["I ___ (see) that film last week.", "saw", "have seen", "has seen", "seen"],
    ["When ___ you arrive in London?", "did", "have", "has", "are"],
    ["We ___ (go) to Italy in 2019.", "went", "have gone", "have been", "has gone"],
];

export const presentPerfectRule: GrammarRuleMeta = {
    key: "present-perfect",
    level: "B1",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
