import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface ZeroConditionalItem {
    condition: string;
    subject: string;
    base: string;
    third: string;
    past: string;
    isThirdPerson: boolean;
}

const ZERO_CONDITIONALS: ZeroConditionalItem[] = [
    { condition: "If you heat water to 100°C", subject: "it", base: "boil", third: "boils", past: "boiled", isThirdPerson: true },
    { condition: "If you freeze water", subject: "it", base: "turn", third: "turns", past: "turned", isThirdPerson: true },
    { condition: "If you touch fire", subject: "it", base: "burn", third: "burns", past: "burned", isThirdPerson: true },
    { condition: "If you don't eat", subject: "you", base: "feel", third: "feels", past: "felt", isThirdPerson: false },
    { condition: "If you mix red and blue", subject: "you", base: "get", third: "gets", past: "got", isThirdPerson: false },
    { condition: "If plants don't get water", subject: "they", base: "die", third: "dies", past: "died", isThirdPerson: false },
    { condition: "If you drop a glass", subject: "it", base: "break", third: "breaks", past: "broke", isThirdPerson: true },
    { condition: "If metal gets cold", subject: "it", base: "contract", third: "contracts", past: "contracted", isThirdPerson: true },
    { condition: "If you don't sleep enough", subject: "you", base: "feel", third: "feels", past: "felt", isThirdPerson: false },
    { condition: "If ice gets warm", subject: "it", base: "melt", third: "melts", past: "melted", isThirdPerson: true },
    { condition: "If you press this button", subject: "the machine", base: "start", third: "starts", past: "started", isThirdPerson: true },
    { condition: "If children eat too much sugar", subject: "they", base: "get", third: "gets", past: "got", isThirdPerson: false },
    { condition: "If you don't water a plant", subject: "it", base: "die", third: "dies", past: "died", isThirdPerson: true },
];

interface FirstConditionalItem {
    condition: string;
    subject: string;
    base: string;
}

const FIRST_CONDITIONALS: FirstConditionalItem[] = [
    { condition: "If it rains tomorrow", subject: "I", base: "stay" },
    { condition: "If she calls me", subject: "I", base: "answer" },
    { condition: "If you study hard", subject: "you", base: "pass" },
    { condition: "If we arrive early", subject: "we", base: "wait" },
    { condition: "If he finishes on time", subject: "he", base: "call" },
    { condition: "If they invite us", subject: "we", base: "visit" },
    { condition: "If I have time tonight", subject: "I", base: "cook" },
    { condition: "If you don't hurry", subject: "you", base: "miss" },
    { condition: "If the weather improves", subject: "we", base: "walk" },
    { condition: "If she asks for help", subject: "I", base: "help" },
    { condition: "If we win the match", subject: "we", base: "celebrate" },
    { condition: "If it gets dark", subject: "we", base: "return" },
];

// Larger templated pools (fixed "If you ___" / result-subject slots) push total
// combinations well past the hand-written set above, while staying just as
// grammatically safe since every form (past/3rd-person) is hand-verified, not derived.
const TEMPLATED_ZERO_CONDITIONS = ["heat", "mix", "press", "drop", "touch", "water", "feed", "plant", "freeze", "shake"];

interface ResultSubject {
    text: string;
    isThirdPerson: boolean;
}

const RESULT_SUBJECTS: ResultSubject[] = [
    { text: "it", isThirdPerson: true },
    { text: "they", isThirdPerson: false },
    { text: "he", isThirdPerson: true },
    { text: "she", isThirdPerson: true },
    { text: "the plant", isThirdPerson: true },
    { text: "the machine", isThirdPerson: true },
    { text: "people", isThirdPerson: false },
    { text: "children", isThirdPerson: false },
];

const RESULT_VERBS: { base: string; third: string; past: string }[] = [
    { base: "boil", third: "boils", past: "boiled" },
    { base: "melt", third: "melts", past: "melted" },
    { base: "start", third: "starts", past: "started" },
    { base: "stop", third: "stops", past: "stopped" },
    { base: "change", third: "changes", past: "changed" },
    { base: "arrive", third: "arrives", past: "arrived" },
    { base: "appear", third: "appears", past: "appeared" },
    { base: "disappear", third: "disappears", past: "disappeared" },
    { base: "open", third: "opens", past: "opened" },
    { base: "close", third: "closes", past: "closed" },
];

const TEMPLATED_FIRST_CONDITIONS = [
    "finish the work",
    "call me",
    "arrive late",
    "forget your keys",
    "miss the bus",
    "lose your phone",
    "break the rule",
    "pass the exam",
    "win the game",
    "need help",
];

const FIRST_RESULT_SUBJECTS = ["I", "you", "we", "they", "he", "she", "it", "my friend"];

const FIRST_RESULT_VERBS = ["call", "help", "visit", "wait", "stay", "cook", "answer", "arrive", "return", "celebrate"];

function zeroConditionalExercise() {
    if (Math.random() < 0.5) {
        const item = pickOne(ZERO_CONDITIONALS);
        const correct = item.isThirdPerson ? item.third : item.base;
        const wrongForm = item.isThirdPerson ? item.base : item.third;
        const distractors = [wrongForm, `will ${item.base}`, item.past];
        return buildQuestion(`${item.condition}, ${item.subject} ___.`, correct, distractors);
    }

    const conditionVerb = pickOne(TEMPLATED_ZERO_CONDITIONS);
    const subject = pickOne(RESULT_SUBJECTS);
    const resultVerb = pickOne(RESULT_VERBS);
    const correct = subject.isThirdPerson ? resultVerb.third : resultVerb.base;
    const wrongForm = subject.isThirdPerson ? resultVerb.base : resultVerb.third;
    const distractors = [wrongForm, `will ${resultVerb.base}`, resultVerb.past];

    return buildQuestion(`If you ${conditionVerb} it, ${subject.text} ___ (${resultVerb.base}).`, correct, distractors);
}

function firstConditionalExercise() {
    if (Math.random() < 0.5) {
        const item = pickOne(FIRST_CONDITIONALS);
        const correct = `will ${item.base}`;
        const distractors = [item.base, `${item.base}s`, `would ${item.base}`];
        return buildQuestion(`${item.condition}, ${item.subject} ___.`, correct, distractors);
    }

    const condition = pickOne(TEMPLATED_FIRST_CONDITIONS);
    const subject = pickOne(FIRST_RESULT_SUBJECTS);
    const verb = pickOne(FIRST_RESULT_VERBS);
    const correct = `will ${verb}`;
    const distractors = [verb, `${verb}s`, `would ${verb}`];

    return buildQuestion(`If you ${condition}, ${subject} ___ (${verb}).`, correct, distractors);
}

export const conditionalsRule: GrammarRuleMeta = {
    key: "conditionals-zero-first",
    level: "B1",
    generateExercises(count) {
        return generateBatch(count, () => (Math.random() < 0.5 ? zeroConditionalExercise() : firstConditionalExercise()));
    },
};
