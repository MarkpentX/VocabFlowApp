import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

const BANK: BankItem[] = [
    ["My sister ___ (work) in a hospital.", "works", "work", "working", "is work"],
    ["I ___ (drink) coffee every morning.", "drink", "drinks", "drinking", "am drink"],
    ["Tom ___ (play) football every Saturday.", "plays", "play", "playing", "is play"],
    ["Water ___ (boil) at 100 degrees Celsius.", "boils", "boil", "boiling", "is boil"],
    ["We ___ (live) in a small flat near the park.", "live", "lives", "living", "are live"],
    ["She ___ (watch) TV every evening.", "watches", "watchs", "watch", "watching"],
    ["My dad ___ (fix) cars for a living.", "fixes", "fixs", "fix", "fixing"],
    ["He ___ (study) English twice a week.", "studies", "studys", "study", "studying"],
    ["The Earth ___ (go) around the Sun.", "goes", "go", "gos", "going"],
    ["My parents usually ___ (go) to bed at eleven.", "go", "goes", "going", "are go"],
    ["She ___ (have) two cats and a dog.", "has", "have", "haves", "having"],
    ["It often ___ (rain) here in November.", "rains", "rain", "raining", "is rain"],
    ["The children ___ (walk) to school every day.", "walk", "walks", "walking", "are walk"],
    ["Anna ___ (teach) maths at a primary school.", "teaches", "teachs", "teach", "teaching"],
    ["Our lessons ___ (start) at half past eight.", "start", "starts", "starting", "are start"],
    ["He always ___ (brush) his teeth before bed.", "brushes", "brushs", "brush", "brushing"],
    ["Bees ___ (make) honey.", "make", "makes", "making", "are make"],
    ["Mark ___ (try) to go running every morning.", "tries", "trys", "try", "trying"],
    ["My grandparents ___ (visit) us every summer.", "visit", "visits", "visiting", "are visit"],
    ["They ___ (not / like) spicy food.", "don't like", "doesn't like", "not like", "aren't like"],
    ["He ___ (not / eat) meat.", "doesn't eat", "don't eat", "doesn't eats", "not eats"],
    ["I ___ (not / know) his phone number.", "don't know", "doesn't know", "not know", "am not know"],
    ["She ___ (not / have) a car.", "doesn't have", "don't have", "doesn't has", "not has"],
    ["___ you speak French?", "Do", "Does", "Are", "Is"],
    ["___ your brother live in Kyiv?", "Does", "Do", "Is", "Are"],
    ["What time ___ the train leave?", "does", "do", "is", "are"],
    ["Where ___ you work?", "do", "does", "are", "is"],
    ["How often ___ she go to the gym?", "does", "do", "is", "goes"],
    ["___ they have lunch at school?", "Do", "Does", "Are", "Is"],
    ["My cat ___ (sleep) on the sofa every afternoon.", "sleeps", "sleep", "sleeping", "is sleep"],
];

export const presentSimpleRule: GrammarRuleMeta = {
    key: "present-simple",
    level: "A1",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
