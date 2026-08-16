"use server";

import { getUserStats } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { GetUserStatsResult } from "@/application/use-cases/users/get-user-stats";

export async function getUserStatsAction(): Promise<ControllerResult<GetUserStatsResult>> {
    try {
        const user = await getSessionUser();
        const userStats = await getUserStats(user.id);
        return handleActionSuccess(userStats);
    } catch (error) {
        return handleActionError(error);
    }
}
