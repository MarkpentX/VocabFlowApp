import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

// Every complement below is a person-only action (win the lottery, get the job...),
// so both subject pools stay human — "it" doesn't win lotteries or get jobs.
const CONDITION_SUBJECTS = ["I", "you", "we", "they", "he", "she", "my friend", "my sister"];
const RESULT_SUBJECTS = ["I", "you", "we", "they", "he", "she", "my friend", "my sister"];

const CONDITION_PAIRS: { verbPast: string; complement: string }[] = [
    { verbPast: "had", complement: "more time" },
    { verbPast: "knew", complement: "the answer" },
    { verbPast: "lived", complement: "nearby" },
    { verbPast: "won", complement: "the lottery" },
    { verbPast: "saw", complement: "the problem" },
    { verbPast: "got", complement: "the job" },
    { verbPast: "worked", complement: "harder" },
    { verbPast: "studied", complement: "more" },
    { verbPast: "owned", complement: "a car" },
    { verbPast: "needed", complement: "help" },
];

const RESULT_VERBS = ["call", "help", "buy", "travel", "move", "quit", "study", "invest", "relax", "celebrate"];

export const secondConditionalRule: GrammarRuleMeta = {
    key: "second-conditional",
    level: "B2",
    generateExercises(count) {
        return generateBatch(count, () => {
            const conditionSubject = pickOne(CONDITION_SUBJECTS);
            const pair = pickOne(CONDITION_PAIRS);
            const resultSubject = pickOne(RESULT_SUBJECTS);
            const verb = pickOne(RESULT_VERBS);

            const correct = `would ${verb}`;
            const distractors = [verb, `will ${verb}`, `${verb}s`];

            return buildQuestion(
                `If ${conditionSubject} ${pair.verbPast} ${pair.complement}, ${resultSubject} ___ (${verb}).`,
                correct,
                distractors
            );
        });
    },
};
