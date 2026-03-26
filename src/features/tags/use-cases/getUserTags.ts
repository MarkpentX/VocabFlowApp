import {getUserTagsDB} from "@/features/tags/queries";
import {DbTag} from "@/features/tags/types";
import {errors} from "@/lib/errors/factory";

export async function getUserTags(user_id: string): Promise<DbTag[]>{
    try {
        const allUserTags = await getUserTagsDB(user_id);
        return allUserTags;
    } catch (error) {
        throw errors.db();
    }
}