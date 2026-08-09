"use server";

import { recordPracticeCompletion } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { StreakUpdateResult } from "@/domain/entities/streak";

export async function recordPracticeCompletionAction(): Promise<ControllerResult<StreakUpdateResult>> {
    try {
        const user = await getSessionUser();
        const result = await recordPracticeCompletion(user.id);
        return handleActionSuccess(result);
    } catch (error) {
        return handleActionError(error);
    }
}
