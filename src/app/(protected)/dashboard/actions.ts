'use server'

import {CreateWord} from "@/features/words/types";
import {CreateWordSchema} from "@/features/words/schemas";
import {ActionResult} from "@/lib/actionResult";
import {db} from "@/index";
import {words} from "@/db/wordsTable";
import {auth} from "@/auth";

export async function createWordAction(data: CreateWord): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user?.id){
        return {
            error: true,
            message: "Word created failed please login",
        }
    }

    const userValidation = CreateWordSchema.safeParse(data);

    if (!userValidation.success){
        return {
            error: true,
            message: userValidation.error.issues[0]?.message ?? "Validation Error"
        }
    }

    console.log(session.user.id)

    try {
        const word: typeof words.$inferInsert = {
            infinitive: data.infinitive,
            meaning: data.meaning.trim(),
            tag: data.tag,
            user_id: session.user.id,
        };

        await db.insert(words).values(word);

        return {
            error: false,
            message: "Word Created Successfully",
        }
    }
    catch (error) {
        console.log(error);
        return {
            error: true,
            message: "Word created failed",
        }
    }
}