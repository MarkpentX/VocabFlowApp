'use server'

import {ControllerResult} from "@/lib/types/controller-result";
import {deleteWord} from "@/features/words/use-cases/deleteWord";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";

export async function deleteWordAction(id: string): Promise<ControllerResult>{
    try {
        await deleteWord(id)
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}