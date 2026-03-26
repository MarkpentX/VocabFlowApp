import {getSessionUser} from "@/lib/utils/auth-utils";
import {updateTag} from "next/cache";
import {deleteTagDB} from "@/features/tags/queries";
import {errors} from "@/lib/errors/factory";

export async function deleteTag(id: string): Promise<void> {
    try {
        const user = await getSessionUser()
        updateTag(`USER_TAGS-${user.id}`)
        await deleteTagDB(id)
    } catch {
        throw errors.db;
    }
}