"use server";

import {handleActionError, handleActionSuccess} from "@/lib/actionResult";
import {getSessionUser} from "@/lib/utils/auth-utils";
import {getUserStats} from "@/features/users/use-cases/getUserStats";
import {ControllerResult} from "@/lib/types/controller-result";
import {GetUserStatsResp} from "@/features/users/types";

export async function getUserStatsAction(): Promise<ControllerResult<GetUserStatsResp>>{
    try {
        const user = await getSessionUser();
        const userStats = await getUserStats(user.id);
        return handleActionSuccess(userStats);
    } catch (error) {
        return handleActionError(error);
    }
}