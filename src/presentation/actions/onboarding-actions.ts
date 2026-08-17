"use server";

import { getOnboardingStatus, completeOnboarding } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";

export async function getOnboardingStatusAction(): Promise<ControllerResult<boolean>> {
    try {
        const user = await getSessionUser();
        const isNew = await getOnboardingStatus(user.id);
        return handleActionSuccess(isNew);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function completeOnboardingAction(): Promise<ControllerResult> {
    try {
        const user = await getSessionUser();
        await completeOnboarding(user.id);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}
