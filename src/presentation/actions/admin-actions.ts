"use server";

import { getUsers } from "@/infrastructure/container";
import { requireAdminUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { User } from "@/domain/entities/user";

export async function getUsersAction(count: number = 50): Promise<ControllerResult<Omit<User, "passwordHash">[]>> {
    try {
        await requireAdminUser();
        const users = await getUsers(count);
        // never send password hashes to the client, even for an authorized admin
        const sanitized = users.map(({ passwordHash: _passwordHash, ...rest }) => rest);
        return handleActionSuccess(sanitized);
    } catch (error) {
        return handleActionError(error);
    }
}
