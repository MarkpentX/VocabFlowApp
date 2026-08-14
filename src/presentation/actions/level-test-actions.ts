"use server";

import { getLevelTestQuestions } from "@/infrastructure/container";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { LevelTestQuestion } from "@/domain/entities/level-test";

export async function getLevelTestQuestionsAction(): Promise<ControllerResult<LevelTestQuestion[]>> {
    try {
        const questions = await getLevelTestQuestions();
        return handleActionSuccess(questions);
    } catch (error) {
        return handleActionError(error);
    }
}
