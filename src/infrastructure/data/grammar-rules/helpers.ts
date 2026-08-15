import { QuizQuestion } from "@/domain/entities/quiz";

export function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function pickOne<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
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
 * Generates `count` exercises from a pool of item-producing thunks, deduping by
 * question text within the batch (retrying a bounded number of times) so a single
 * practice round rarely shows the same sentence twice, even for smaller rule pools.
 */
export function generateBatch(count: number, produce: () => QuizQuestion): QuizQuestion[] {
    const seen = new Set<string>();
    const result: QuizQuestion[] = [];
    let attempts = 0;
    const maxAttempts = count * 20;

    while (result.length < count && attempts < maxAttempts) {
        attempts++;
        const exercise = produce();
        if (seen.has(exercise.question)) {
            continue;
        }
        seen.add(exercise.question);
        result.push(exercise);
    }

    return result;
}
