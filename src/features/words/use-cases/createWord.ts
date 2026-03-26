'use server'

import {CreateWord} from "@/features/words/types";
import {CreateWordSchema} from "@/features/words/schemas";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {updateTag} from "next/cache";
import {createWordDB} from "@/features/words/queries";
import {trimObject} from "@/lib/string-utils";
import {handleValidation} from "@/core/handleValidation";
import {DbTag} from "@/features/tags/types";
import {errors} from "@/lib/errors/factory";


export async function createWord(data: CreateWord, tag: DbTag): Promise<void> {
    const user = await getSessionUser()
    const trimmedData: CreateWord = trimObject(data);

    handleValidation(CreateWordSchema, trimmedData);

    try {
        await createWordDB(tag.id, trimmedData);
        updateTag(`USER_TAGS-${user.id}`);
    } catch (err){
        console.error(err);
        throw errors.db()
    }
}