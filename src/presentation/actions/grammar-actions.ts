"use server";

import { getGrammarRules, getGrammarStats, generateGrammarSession, recordGrammarAttempt } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { GrammarStats } from "@/domain/entities/grammar";
import { GrammarRuleSummary } from "@/application/use-cases/grammar/get-grammar-rules";
import { GrammarSessionResult } from "@/domain/repositories/grammar-repository";
import { QuizQuestion } from "@/domain/entities/quiz";

export async function getGrammarRulesAction(): Promise<ControllerResult<GrammarRuleSummary[]>> {
    try {
        const rules = await getGrammarRules();
        return handleActionSuccess(rules);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function getGrammarStatsAction(): Promise<ControllerResult<GrammarStats>> {
    try {
        const user = await getSessionUser();
        const stats = await getGrammarStats(user.id);
        return handleActionSuccess(stats);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function generateGrammarSessionAction(
    ruleKeys: string[],
    countPerRule: number
): Promise<ControllerResult<QuizQuestion[]>> {
    try {
        const exercises = await generateGrammarSession(ruleKeys, countPerRule);
        return handleActionSuccess(exercises);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function recordGrammarAttemptAction(result: GrammarSessionResult): Promise<ControllerResult> {
    try {
        const user = await getSessionUser();
        await recordGrammarAttempt(user.id, result);
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}
