"use server";

import { getUserStats } from "@/infrastructure/container";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { GetUserStatsResult } from "@/application/use-cases/users/get-user-stats";

export async function getUserStatsAction(userId: string): Promise<ControllerResult<GetUserStatsResult>> {
    try {
        const userStats = await getUserStats(userId);
        return handleActionSuccess(userStats);
    } catch (error) {
        return handleActionError(error);
    }
}
