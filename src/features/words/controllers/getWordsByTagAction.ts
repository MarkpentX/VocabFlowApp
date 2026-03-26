import {ControllerResult} from "@/lib/types/controller-result";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {getWordsByTag} from "@/features/words/use-cases/getWordsByTag";
import {DbWord} from "@/features/words/types";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";

export async function getWordsByTagAction(tag: string): Promise<ControllerResult<DbWord[]>> {
    try {
        const user = await getSessionUser()
        const words = await getWordsByTag(tag, user.id)
        return handleActionSuccess(words);
    } catch (error) {
        return handleActionError(error);
    }
}