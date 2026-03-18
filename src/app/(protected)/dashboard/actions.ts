'use server'

import {CreateWord} from "@/features/words/types";
import {CreateWordSchema} from "@/features/words/schemas";
import {ActionResult} from "@/lib/actionResult";
import {auth} from "@/auth";
import {createTagDB, getTagDB, isTagAvailableDB} from "@/features/tags/queries";
import {createWord} from "@/features/words/queries";

export async function createWordAction(data: CreateWord): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user?.id){
        return {
            error: true,
            message: "Word created failed please login",
        }
    }

    const trimmedData: CreateWord = {
        infinitive: data.infinitive.trim(),
        meaning: data.meaning.trim(),
        tag: data.tag.trim(),
    };

    const userValidation = CreateWordSchema.safeParse(trimmedData);

    if (!userValidation.success){
        return {
            error: true,
            message: userValidation.error.issues[0]?.message ?? "Validation Error"
        }
    }



    const isAvailable = await isTagAvailableDB(session.user.id, trimmedData.tag)

    console.log(isAvailable)

    let tagId: string;

    if(isAvailable){
        // Tag doesn't exist, create it first
        await createTagDB(session.user.id, trimmedData.tag)
        const tag = await getTagDB(session.user.id, trimmedData.tag)

        if (!tag) {
            return {
                error: true,
                message: "Failed to create tag",
            }
        }

        tagId = tag.id
    } else {
        // Tag exists, get it
        const tag = await getTagDB(session.user.id, trimmedData.tag)

        if (!tag) {
            return {
                error: true,
                message: "Tag not found",
            }
        }

        tagId = tag.id
    }

    // Create the word with the tagId
    await createWord(tagId, trimmedData)

    return {
        error: false,
        message: "Word created successfully",
    }
}