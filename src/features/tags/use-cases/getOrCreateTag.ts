import {createTagDB, getTagDB} from "@/features/tags/queries";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {handleValidation} from "@/core/handleValidation";
import {TagSchema} from "@/features/words/schemas";
import {DbTag} from "@/features/tags/types";

export async function getOrCreateTag(tagName: string): Promise<DbTag> {
    const user = await getSessionUser();
    const trimmedData = tagName.trim().toLowerCase();

    handleValidation(TagSchema, { tag: trimmedData });

    const tag = await getTagDB(user.id, trimmedData);

    if (!tag) {
        const createdTag = await createTagDB(user.id, trimmedData);
        return createdTag;
    }
    return tag;
}