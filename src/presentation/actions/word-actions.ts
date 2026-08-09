"use server";

import { createWord, deleteWord, getWordsByDictionary } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { NewWordInput, Word } from "@/domain/entities/word";

export async function createWordAction(data: NewWordInput): Promise<ControllerResult> {
    try {
        const user = await getSessionUser();
        await createWord(data, user.id);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}

export async function deleteWordAction(id: string): Promise<ControllerResult> {
    try {
        await getSessionUser();
        await deleteWord(id);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}

export async function getWordsByDictionaryAction(dictionary: string): Promise<ControllerResult<Word[]>> {
    try {
        const user = await getSessionUser();
        const words = await getWordsByDictionary(dictionary, user.id);
        return handleActionSuccess(words);
    } catch (error) {
        console.error(error);
        return handleActionError(error);
    }
}
