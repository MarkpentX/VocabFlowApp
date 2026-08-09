"use server";

import { getDictionaries, deleteDictionary } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { DictionaryWithWordsCount } from "@/domain/entities/dictionary";

export async function getDictionariesAction(): Promise<ControllerResult<DictionaryWithWordsCount[]>> {
    try {
        const user = await getSessionUser();
        const allDictionaries = await getDictionaries(user.id);
        return handleActionSuccess(allDictionaries);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function deleteDictionaryAction(id: string): Promise<ControllerResult> {
    try {
        await getSessionUser();
        await deleteDictionary(id);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}
