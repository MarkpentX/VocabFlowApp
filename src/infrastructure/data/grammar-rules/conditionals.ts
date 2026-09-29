import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// In a zero-conditional result "will" is often also acceptable ("If you press
// this button, the machine will stop"), so "will" is only offered as a wrong
// option in the if-clause, where it is always wrong.
const BANK: BankItem[] = [
    // zero conditional — general truths: if + present, present
    ["If you heat ice, it ___ (melt).", "melts", "melt", "melted", "will melts"],
    ["If you mix red and white, you ___ (get) pink.", "get", "gets", "got", "will got"],
    ["Water ___ (freeze) if the temperature drops below 0°C.", "freezes", "freeze", "froze", "frozen"],
    ["If you press this button, the machine ___ (stop).", "stops", "stop", "stopped", "stopping"],
    ["Plants die if they ___ (not / get) enough water.", "don't get", "won't get", "doesn't get", "didn't get"],
    ["If I drink coffee in the evening, I ___ (not / sleep) well.", "don't sleep", "doesn't sleep", "didn't sleep", "not sleep"],
    ["If you ___ (not / water) plants, they die.", "don't water", "won't water", "doesn't water", "didn't water"],
    ["If people ___ (eat) too much sugar, they put on weight.", "eat", "eats", "will eat", "ate"],
    ["If you ___ (drop) a glass, it breaks.", "drop", "will drop", "dropped", "drops"],
    ["If you mix oil and water, they ___ (not / mix).", "don't mix", "doesn't mix", "didn't mix", "won't mixing"],
    // first conditional — real future possibilities: if + present, will + verb
    ["If it rains tomorrow, we ___ (stay) at home.", "will stay", "would stay", "stayed", "stays"],
    ["If you ___ (study) hard, you will pass the exam.", "study", "will study", "studied", "studies"],
    ["If she ___ (call) me, I'll tell her the news.", "calls", "will call", "call", "called"],
    ["I'll buy you a coffee if you ___ (help) me.", "help", "will help", "helped", "helps"],
    ["If we don't hurry, we ___ (miss) the train.", "will miss", "miss", "missed", "would miss"],
    ["What will you do if you ___ (not / pass) the test?", "don't pass", "won't pass", "doesn't pass", "didn't pass"],
    ["If the weather ___ (be) nice on Saturday, we'll have a picnic.", "is", "will be", "be", "was"],
    ["You'll feel better if you ___ (take) this medicine.", "take", "will take", "took", "takes"],
    ["If he ___ (be) late again, the boss will be angry.", "is", "will be", "was", "be"],
    ["If I see Tom, I ___ (give) him your message.", "will give", "give", "gave", "would give"],
    ["Unless you hurry, you ___ (be) late.", "will be", "are", "would be", "were"],
    ["If I ___ (have) time tonight, I'll call you.", "have", "will have", "had", "has"],
    ["We ___ (go) to the beach if it's sunny tomorrow.", "will go", "go", "went", "would go"],
    ["She won't come unless you ___ (invite) her.", "invite", "will invite", "invited", "invites"],
    ["If you touch that dog, it ___ (bite) you.", "will bite", "bite", "bit", "would bite"],
];

export const conditionalsRule: GrammarRuleMeta = {
    key: "conditionals-zero-first",
    level: "B1",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
