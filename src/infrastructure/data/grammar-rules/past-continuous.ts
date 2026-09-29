import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// The Past Simple is grammatical in many "when/while" sentences (with a
// different meaning), so it is only offered as a wrong option where it clearly
// doesn't fit — e.g. for the short action that interrupts a longer one.
const BANK: BankItem[] = [
    ["I ___ (have) a shower when the phone rang.", "was having", "were having", "am having", "was have"],
    ["While we ___ (walk) in the park, it started to rain.", "were walking", "was walking", "are walking", "were walk"],
    ["She ___ (not / listen) when the teacher explained the rule.", "wasn't listening", "weren't listening", "didn't listening", "isn't listening"],
    ["At this time yesterday, I ___ (sit) on a plane.", "was sitting", "were sitting", "am sitting", "was sit"],
    ["The sun ___ (shine) and the birds were singing.", "was shining", "were shining", "is shining", "shined"],
    ["When I arrived, they ___ (have) dinner.", "were having", "was having", "are having", "have"],
    ["He broke his leg while he ___ (ski).", "was skiing", "were skiing", "is skiing", "was ski"],
    ["It ___ (rain) when we left the house.", "was raining", "were raining", "is raining", "rains"],
    ["They ___ (watch) TV when the lights went out.", "were watching", "was watching", "are watching", "were watch"],
    ["Sorry, I didn't hear you. I ___ (not / pay) attention.", "wasn't paying", "weren't paying", "didn't paying", "am not paying"],
    ["We met while we ___ (study) at university.", "were studying", "was studying", "are studying", "were study"],
    ["I saw an accident while I ___ (drive) to work.", "was driving", "were driving", "am driving", "drive"],
    ["When the teacher came in, the students ___ (talk).", "were talking", "was talking", "are talking", "were talk"],
    ["My dad ___ (cook) when I got home.", "was cooking", "were cooking", "is cooking", "cooks"],
    ["I ___ (wait) for the bus when I saw Tom.", "was waiting", "were waiting", "am waiting", "was wait"],
    ["While Anna was cooking, her husband ___ (set) the table.", "was setting", "were setting", "is setting", "sets"],
    ["The phone rang while I ___ (take) a bath.", "was taking", "were taking", "am taking", "was take"],
    ["At 10 p.m. last night, the kids ___ (sleep).", "were sleeping", "was sleeping", "are sleeping", "were sleep"],
    // the short, interrupting action is in the Past Simple
    ["I was reading a book when my brother ___ (come) in.", "came", "comes", "come", "was come"],
    ["What was she doing when you ___ (call) her?", "called", "calls", "call", "was calling"],
    ["We were having lunch when the fire alarm ___ (go) off.", "went", "was going", "goes", "go"],
    // questions and short answers
    ["What ___ you doing at 8 o'clock last night?", "were", "was", "did", "are"],
    ["Why ___ you laughing a minute ago?", "were", "was", "did", "are"],
    ["Was it snowing when you woke up? — Yes, it ___.", "was", "did", "is", "were"],
    ["___ Tom working when you visited him?", "Was", "Were", "Did", "Is"],
];

export const pastContinuousRule: GrammarRuleMeta = {
    key: "past-continuous",
    level: "B1",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
