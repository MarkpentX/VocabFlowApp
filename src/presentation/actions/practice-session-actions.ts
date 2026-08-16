"use server";

import { startPracticeSession, completePracticeSession } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { PracticeSessionInfo } from "@/domain/entities/practice-session";
import { PracticeCoinsAward } from "@/domain/entities/coins";

export async function startPracticeSessionAction(questionsCount: number): Promise<ControllerResult<PracticeSessionInfo>> {
    try {
        const user = await getSessionUser();
        const session = await startPracticeSession(user.id, questionsCount);
        return handleActionSuccess(session);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function completePracticeSessionAction(
    sessionId: string,
    currentStreak: number
): Promise<ControllerResult<PracticeCoinsAward>> {
    try {
        const user = await getSessionUser();
        const award = await completePracticeSession(user.id, sessionId, currentStreak);
        return handleActionSuccess(award);
    } catch (error) {
        return handleActionError(error);
    }
}
