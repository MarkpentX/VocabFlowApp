import {getUsersDB} from "@/features/admin/queries";
import {DbUser} from "@/features/admin/types";
import {errors} from "@/lib/errors/factory";

export async function getUsers(count: number): Promise<DbUser[]> {
    try{
        const users = await getUsersDB(count)
        return users;
    } catch (error) {
        throw errors.db()
    }
}