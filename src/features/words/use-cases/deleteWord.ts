

import {deleteWordDB} from "@/features/words/queries";
import {errors} from "@/lib/errors/factory";

export async function deleteWord(id: string): Promise<void> {
    try {
        await deleteWordDB(id)
    } catch {
        throw errors.db()
    }
}