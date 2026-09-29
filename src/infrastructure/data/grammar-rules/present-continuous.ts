import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

const BANK: BankItem[] = [
    ["Look! It ___ (snow).", "is snowing", "snows", "are snowing", "snowing"],
    ["Please be quiet — the baby ___ (sleep).", "is sleeping", "sleeps", "are sleeping", "sleep"],
    ["I can't talk now. I ___ (drive).", "am driving", "drive", "is driving", "driving"],
    ["Listen! Someone ___ (knock) at the door.", "is knocking", "knocks", "are knocking", "knocking"],
    ["They ___ (have) dinner at the moment, so call them later.", "are having", "have", "is having", "having"],
    ["Where's Tom? — He ___ (take) a shower.", "is taking", "takes", "are taking", "taking"],
    ["We ___ (wait) for the bus right now.", "are waiting", "wait", "is waiting", "waiting"],
    ["Sorry, I can't come to the phone — I ___ (cook) dinner.", "am cooking", "cook", "is cooking", "cooking"],
    ["Look at those kids! They ___ (play) in the rain.", "are playing", "play", "is playing", "playing"],
    ["Hurry up! Everyone ___ (wait) for you.", "is waiting", "are waiting", "waits", "waiting"],
    ["Be careful! The water ___ (boil).", "is boiling", "boils", "are boiling", "boiling"],
    ["I ___ (write) an email at the moment.", "am writing", "write", "is writing", "writing"],
    ["Shh! The teacher ___ (speak).", "is speaking", "speaks", "are speaking", "speaking"],
    ["Your phone ___ (ring)! Answer it.", "is ringing", "rings", "are ringing", "ringing"],
    ["Can you turn the music down? I ___ (try) to sleep.", "am trying", "try", "is trying", "trying"],
    ["The students ___ (take) a test now, so don't go in.", "are taking", "take", "is taking", "taking"],
    ["Tom isn't at home. He ___ (walk) the dog.", "is walking", "walks", "are walking", "walk"],
    ["Look! Those birds ___ (fly) south.", "are flying", "fly", "is flying", "flying"],
    ["I ___ (look) for my keys. Have you seen them?", "am looking", "look", "is looking", "looking"],
    ["Mum ___ (not / sleep) — her light is still on.", "isn't sleeping", "doesn't sleep", "aren't sleeping", "not sleeping"],
    ["You can turn the TV off — we ___ (not / watch) it right now.", "aren't watching", "don't watch", "isn't watching", "not watching"],
    ["___ it raining outside?", "Is", "Does", "Are", "Do"],
    ["What ___ you doing right now?", "are", "do", "is", "does"],
    ["Why ___ she crying?", "is", "does", "are", "do"],
    ["___ your parents working today?", "Are", "Do", "Is", "Does"],
    ["Look, the sun ___ (shine)! Let's go outside.", "is shining", "shines", "are shining", "shining"],
    ["My brother ___ (study) in his room at the moment.", "is studying", "studies", "are studying", "study"],
    ["Listen! The birds ___ (sing).", "are singing", "sing", "is singing", "singing"],
];

export const presentContinuousRule: GrammarRuleMeta = {
    key: "present-continuous",
    level: "A1",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
