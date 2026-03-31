'use server'

import {ControllerResult} from "@/lib/types/controller-result";
import {deleteWord} from "@/features/words/use-cases/deleteWord";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {updateTag} from "next/cache";

export async function deleteWordAction(id: string): Promise<ControllerResult>{
    try {
        const user = await getSessionUser();
        await deleteWord(id)
        updateTag(`USER-STATS-${user.id}`);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}