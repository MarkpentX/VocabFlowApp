"use server";

import { getUsers } from "@/infrastructure/container";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { User } from "@/domain/entities/user";

export async function getUsersAction(count: number = 50): Promise<ControllerResult<User[]>> {
    try {
        const users = await getUsers(count);
        return handleActionSuccess(users);
    } catch (error) {
        return handleActionError(error);
    }
}
