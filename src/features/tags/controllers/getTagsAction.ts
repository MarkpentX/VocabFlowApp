'use server'

import {getTags} from "@/features/tags/use-cases/getTags";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {ControllerResult} from "@/lib/types/controller-result";
import {TagsWithWords} from "@/features/tags/types";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";

export async function getTagsAction(): Promise<ControllerResult<TagsWithWords[]>> {
    try {
        const user = await getSessionUser()
        const allTags = await getTags(user.id)
        return handleActionSuccess(allTags);
    } catch (error) {
        return handleActionError(error);
    }
}