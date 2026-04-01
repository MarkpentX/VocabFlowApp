import {CreateUserData, DbUser} from "@/features/auth/types";
import {usersTable} from "@/db/usersTable";
import {db} from "@/index";
import {saltAndHashPassword} from "@/lib/utils/hashPassword";
import {eq} from "drizzle-orm";

export async function createUserDB(data: CreateUserData): Promise<DbUser> {
    const password = await saltAndHashPassword(data.password)
    const user: typeof usersTable.$inferInsert = {
        username: data.username,
        passwordHash: password
    };

    const [createdUser] =  await db.insert(usersTable).values(user).returning();
    return createdUser;
}

export async function getUserByUsernameDB(username: string): Promise<DbUser> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username));
    return user
}