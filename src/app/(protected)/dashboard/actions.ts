'use server'

import {CreateWord} from "@/features/words/types";
import {CreateWordSchema} from "@/features/words/schemas";
import {ActionResult, handleActionError, handleActionSuccess} from "@/lib/actionResult";
import {createTagDB, getTagDB, isTagAvailableDB} from "@/features/tags/queries";
import {createWord} from "@/features/words/queries";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {updateTag} from "next/cache";

export async function createWordAction(data: CreateWord): Promise<ActionResult> {
    const user = await getSessionUser()

    const trimmedData: CreateWord = {
        infinitive: data.infinitive.trim(),
        meaning: data.meaning.trim(),
        tag: data.tag.trim(),
    };

    const userValidation = CreateWordSchema.safeParse(trimmedData);

    if (userValidation.success) {
        const isAvailable = await isTagAvailableDB(user.id, trimmedData.tag)
        console.log(isAvailable)
        let tagId: string;
        if (isAvailable) {
            await createTagDB(user.id, trimmedData.tag)
            const tag = await getTagDB(user.id, trimmedData.tag)

            if (!tag) {
                return handleActionError("Tag not found")
            }

            tagId = tag.id
        } else {
            const tag = await getTagDB(user.id, trimmedData.tag)

            if (!tag) {
                return handleActionError("Tag not found")
            }

            tagId = tag.id
        }
        await createWord(tagId, trimmedData)
        updateTag(`USER_TAGS-${user.id}`)
        return handleActionSuccess("Word created successfully")
    } else {
        return handleActionError(userValidation.error.issues[0]?.message ?? "Validation Error")
    }
}