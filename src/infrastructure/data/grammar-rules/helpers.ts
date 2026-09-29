import { QuizQuestion } from "@/domain/entities/quiz";

export function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function pickMany<T>(items: T[], count: number): T[] {
    return shuffle(items).slice(0, count);
}

export function buildQuestion(question: string, correct: string, distractors: string[]): QuizQuestion {
    const uniqueDistractors = Array.from(new Set(distractors)).filter((d) => d !== correct);
    return {
        question,
        correct,
        answers: shuffle([correct, ...pickMany(uniqueDistractors, 3)]),
    };
}

/**
 * A hand-written exercise: [sentence with "___", correct answer, ...wrong answers].
 *
 * Every item is a complete, natural sentence whose context allows exactly one
 * answer. Wrong answers are typical learner mistakes that are clearly incorrect
 * in that context — any form a native speaker would also accept (e.g. "must"
 * next to "have to", unshifted tenses in reported speech) is deliberately left
 * out of the options so no question has two defensible answers.
 */
export type BankItem = [question: string, correct: string, ...wrong: string[]];

export function generateFromBank(bank: BankItem[], count: number): QuizQuestion[] {
    return pickMany(bank, count).map(([question, correct, ...wrong]) => buildQuestion(question, correct, wrong));
}
