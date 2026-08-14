"use server";

import { getExamWords } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { Word } from "@/domain/entities/word";

export async function getExamWordsAction(dictionaryIds: string[]): Promise<ControllerResult<Word[]>> {
    try {
        const user = await getSessionUser();
        const words = await getExamWords(user.id, dictionaryIds);
        return handleActionSuccess(words);
    } catch (error) {
        return handleActionError(error);
    }
}
