import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// Native speakers often accept both "will" and "going to" in the same sentence,
// so the two are only offered side by side where the context makes one of them
// clearly wrong. Otherwise the wrong options test the form itself
// ("will going to", "going to" without "be", "will to").
const BANK: BankItem[] = [
    // going to — plans already made, predictions from what we can see
    ["I've already bought the tickets. We ___ (fly) to Rome in May.", "are going to fly", "will going to fly", "are going fly", "going to fly"],
    ["Look at those black clouds! It ___ (rain) soon.", "is going to rain", "is going rain", "will going to rain", "going to rain"],
    ["Emma has made up her mind. She ___ (study) medicine.", "is going to study", "will going to study", "is going study", "going to study"],
    ["Be careful! You ___ (fall)!", "are going to fall", "will going to fall", "are going fall", "going to fall"],
    ["They've saved enough money. They ___ (buy) a house.", "are going to buy", "will going to buy", "are going buy", "going to buy"],
    ["The car is making a strange noise. It ___ (break) down.", "is going to break", "is going break", "will going to break", "going to break"],
    ["He ___ (not / come) to the party — he told me yesterday.", "isn't going to come", "won't going to come", "isn't going come", "not going to come"],
    ["I ___ (visit) my aunt this weekend. I've already told her.", "am going to visit", "will going to visit", "am going visit", "going to visit"],
    ["What ___ you going to do after school?", "are", "will", "do", "is"],
    ["Where ___ you going to stay in London?", "are", "will", "do", "is"],
    // will — decisions made at the moment of speaking, offers, promises, opinions
    ["The phone is ringing. — Stay there, I ___ (get) it.", "will get", "will to get", "am get", "will gets"],
    ["It's hot in here. — I ___ (open) the window for you.", "will open", "will to open", "am open", "will opens"],
    ["I'm hungry. — Wait, I ___ (make) you a sandwich.", "will make", "will to make", "am make", "will makes"],
    ["Don't worry about the dishes — I ___ (wash) them later.", "will wash", "will to wash", "am wash", "will washes"],
    ["I promise I ___ (not / tell) anyone.", "won't tell", "don't going to tell", "will not to tell", "not will tell"],
    ["I think it ___ (be) sunny tomorrow.", "will be", "will is", "is be", "will being"],
    ["Perhaps people ___ (live) on Mars one day.", "will live", "will lives", "will to live", "living"],
    ["I ___ (be) 18 next month.", "will be", "will is", "am be", "will being"],
    ["Maybe I ___ (see) you at the party.", "will see", "will saw", "am see", "will to see"],
    ["I'm sure you ___ (pass) the exam.", "will pass", "will passed", "will to pass", "passing"],
    ["I don't think she ___ (like) this present.", "will like", "will likes", "will to like", "is like"],
    ["Don't worry, she ___ (not / be) late.", "won't be", "won't is", "not will be", "doesn't going to be"],
    ["___ you help me carry these bags, please?", "Will", "Are", "Going", "Does"],
    ["The lift isn't working. — Then we ___ (take) the stairs.", "will take", "will to take", "are take", "will takes"],
];

export const futureRule: GrammarRuleMeta = {
    key: "future-will-going-to",
    level: "A2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
