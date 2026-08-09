"use server";

import { getTags, deleteTag } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { TagWithWordsCount } from "@/domain/entities/tag";

export async function getTagsAction(): Promise<ControllerResult<TagWithWordsCount[]>> {
    try {
        const user = await getSessionUser();
        const allTags = await getTags(user.id);
        return handleActionSuccess(allTags);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function deleteTagAction(id: string): Promise<ControllerResult> {
    try {
        await getSessionUser();
        await deleteTag(id);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}
