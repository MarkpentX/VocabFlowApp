import { LevelTestQuestion } from "@/domain/entities/level-test";

export function createGetLevelTestQuestionsUseCase(questions: LevelTestQuestion[]) {
    return async function getLevelTestQuestions(): Promise<LevelTestQuestion[]> {
        return questions;
    };
}
