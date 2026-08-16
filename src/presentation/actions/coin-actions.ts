"use server";

import { getCoins } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { CoinsInfo } from "@/domain/entities/coins";

export async function getCoinsAction(): Promise<ControllerResult<CoinsInfo>> {
    try {
        const user = await getSessionUser();
        const result = await getCoins(user.id);
        return handleActionSuccess(result);
    } catch (error) {
        return handleActionError(error);
    }
}
