"use server";

import { getLevelTestQuestions, getLevelTestWritingPrompt, scoreLevelTestWriting } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { LevelTestQuestion, WritingPrompt, WritingScore } from "@/domain/entities/level-test";

export async function getLevelTestQuestionsAction(): Promise<ControllerResult<LevelTestQuestion[]>> {
    try {
        const questions = await getLevelTestQuestions();
        return handleActionSuccess(questions);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function getLevelTestWritingPromptAction(): Promise<ControllerResult<WritingPrompt>> {
    try {
        const prompt = await getLevelTestWritingPrompt();
        return handleActionSuccess(prompt);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function scoreLevelTestWritingAction(text: string, minWords: number): Promise<ControllerResult<WritingScore>> {
    try {
        await getSessionUser();
        const score = await scoreLevelTestWriting(text, minWords);
        return handleActionSuccess(score);
    } catch (error) {
        return handleActionError(error);
    }
}
