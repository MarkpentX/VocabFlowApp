"use server";

import {CreateWord} from "@/features/words/types";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";
import {getOrCreateTag} from "@/features/tags/use-cases/getOrCreateTag";
import {createWord} from "@/features/words/use-cases/createWord";
import {ControllerResult} from "@/lib/types/controller-result";

export async function createWordAction(data: CreateWord): Promise<ControllerResult> {
    try{
        const tagResult = await getOrCreateTag(data.tag);
        await createWord(data, tagResult);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}
