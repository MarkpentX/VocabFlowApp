import {usersTable} from "@/db/schema";
import {db} from "@/index";
import {DbUser} from "@/features/admin/types";

export async function getUsersDB(count: number): Promise<DbUser[]>{
    const users = await db.select().from(usersTable).limit(count);
    return users;
}