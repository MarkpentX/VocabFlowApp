'use server'

import {ControllerResult} from "@/lib/types/controller-result";
import {deleteTag} from "@/features/tags/use-cases/deleteTag";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";

export async function deleteTagAction(id: string): Promise<ControllerResult> {
    try {
        await deleteTag(id)
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}