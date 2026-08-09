"use server";

import { registerUser } from "@/infrastructure/container";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { NewUserInput } from "@/domain/entities/user";

export async function registerUserAction(data: NewUserInput): Promise<ControllerResult> {
    try {
        await registerUser(data);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}
