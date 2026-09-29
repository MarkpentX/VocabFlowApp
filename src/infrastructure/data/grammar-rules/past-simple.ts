import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

const BANK: BankItem[] = [
    ["We ___ (go) to the cinema last night.", "went", "goed", "go", "gone"],
    ["She ___ (buy) a new phone yesterday.", "bought", "buyed", "buys", "brought"],
    ["I ___ (see) Tom at the station two days ago.", "saw", "seen", "see", "seed"],
    ["They ___ (visit) their grandparents last weekend.", "visited", "visit", "visits", "have visited"],
    ["Shakespeare ___ (write) Hamlet.", "wrote", "writed", "written", "writes"],
    ["My parents ___ (meet) in 1998.", "met", "meeted", "meet", "have met"],
    ["We ___ (eat) pizza for dinner yesterday.", "ate", "eated", "eaten", "eat"],
    ["I ___ (lose) my wallet last week.", "lost", "losed", "lose", "have lost"],
    ["The train ___ (leave) ten minutes ago.", "left", "leaved", "leaves", "has left"],
    ["She ___ (study) biology from 2015 to 2019.", "studied", "studyed", "studies", "has studied"],
    ["It ___ (be) very cold yesterday.", "was", "were", "is", "been"],
    ["The children ___ (be) very tired last night.", "were", "was", "are", "been"],
    ["I ___ (take) a lot of photos in Rome last year.", "took", "taked", "taken", "take"],
    ["She ___ (drive) to work yesterday because it was raining.", "drove", "drived", "driven", "drives"],
    ["Yesterday we ___ (stop) at a café on the way home.", "stopped", "stoped", "stop", "stopping"],
    ["Columbus ___ (reach) America in 1492.", "reached", "reach", "reachs", "has reached"],
    ["At first I ___ (think) he was joking.", "thought", "thinked", "think", "thinks"],
    ["He ___ (fall) off his bike last summer.", "fell", "falled", "fallen", "falls"],
    ["They ___ (win) the match 3–1 last Saturday.", "won", "winned", "win", "wins"],
    ["The shop ___ (close) early yesterday.", "closed", "close", "closes", "has closed"],
    ["We ___ (have) a great time at the beach last weekend.", "had", "haved", "have", "has"],
    ["She ___ (come) home very late last night.", "came", "comed", "come", "comes"],
    ["He ___ (not / call) me yesterday.", "didn't call", "didn't called", "not called", "doesn't call"],
    ["He ___ (not / go) to work on Monday because he was ill.", "didn't go", "didn't went", "wasn't go", "not went"],
    ["Did she ___ (tell) you the news?", "tell", "told", "tells", "telling"],
    ["I didn't ___ (understand) the question.", "understand", "understood", "understands", "understanding"],
    ["___ you enjoy the party last night?", "Did", "Do", "Were", "Have"],
    ["What time ___ you get home last night?", "did", "do", "were", "have"],
    ["Where ___ you go on holiday last summer?", "did", "were", "do", "have"],
];

export const pastSimpleRule: GrammarRuleMeta = {
    key: "past-simple",
    level: "A2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
