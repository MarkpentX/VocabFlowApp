import {DbWord} from "@/features/words/types";
import {getAllWordsDB} from "@/features/words/queries";
import {errors} from "@/lib/errors/factory";

export async function getUserWords(tags_id: string[]): Promise<DbWord[]>{
    try {
        const allUserWords = await getAllWordsDB(tags_id);
        return allUserWords;
    } catch (error) {
        throw errors.db();
    }
}
