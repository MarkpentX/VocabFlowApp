import { CEFR_LEVELS, LevelTestQuestion } from "@/domain/entities/level-test";

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function createGetLevelTestQuestionsUseCase(questions: LevelTestQuestion[]) {
    return async function getLevelTestQuestions(): Promise<LevelTestQuestion[]> {
        return CEFR_LEVELS.flatMap((level) => {
            const levelQuestions = questions.filter((question) => question.level === level);
            return shuffle(levelQuestions).map((question) => ({ ...question, answers: shuffle(question.answers) }));
        });
    };
}
