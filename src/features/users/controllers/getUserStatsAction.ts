"use server";

import {handleActionError, handleActionSuccess} from "@/lib/actionResult";
import {getUserStats} from "@/features/users/use-cases/getUserStats";
import {ControllerResult} from "@/lib/types/controller-result";
import {GetUserStatsResp} from "@/features/users/types";
import {cacheLife, cacheTag} from "next/cache";

export async function getUserStatsAction(userId: string): Promise<ControllerResult<GetUserStatsResp>>{
    "use cache";
    cacheLife("max")
    cacheTag(`USER-STATS-${userId}`)
    try {
        const userStats = await getUserStats(userId);
        return handleActionSuccess(userStats);
    } catch (error) {
        return handleActionError(error);
    }
}