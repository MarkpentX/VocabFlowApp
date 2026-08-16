"use server";

import {
    getGrammarRules,
    getGrammarStats,
    generateGrammarSession,
    generateGrammarDiagnostic,
    recordGrammarAttempt,
    createSharedGrammarResult,
    getSharedGrammarResult,
} from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { GrammarStats } from "@/domain/entities/grammar";
import { GrammarRuleSummary } from "@/application/use-cases/grammar/get-grammar-rules";
import { GrammarSessionResult } from "@/domain/repositories/grammar-repository";
import { QuizQuestion } from "@/domain/entities/quiz";
import { CreateSharedResultInput, SharedGrammarResult } from "@/domain/entities/grammar-shared-result";
import { DiagnosticLevel, GrammarDiagnosticQuestion, RuleBreakdown } from "@/domain/entities/grammar-diagnostic";

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

export async function generateGrammarDiagnosticAction(
    level: DiagnosticLevel
): Promise<ControllerResult<GrammarDiagnosticQuestion[]>> {
    try {
        await getSessionUser();
        const questions = await generateGrammarDiagnostic(level);
        return handleActionSuccess(questions);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function recordGrammarDiagnosticResultAction(allRules: RuleBreakdown[]): Promise<ControllerResult> {
    try {
        const user = await getSessionUser();
        await Promise.all(
            allRules.map((rule) =>
                recordGrammarAttempt(user.id, {
                    ruleKey: rule.ruleKey,
                    attempts: rule.total,
                    correct: rule.correct,
                    bestStreak: 0,
                })
            )
        );
        return handleActionSuccess();
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

export async function createSharedGrammarResultAction(
    input: CreateSharedResultInput
): Promise<ControllerResult<SharedGrammarResult>> {
    try {
        const user = await getSessionUser();
        const studentName = user.name ?? user.username ?? "Student";
        const result = await createSharedGrammarResult(user.id, studentName, input);
        return handleActionSuccess(result);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function getSharedGrammarResultAction(id: string): Promise<ControllerResult<SharedGrammarResult>> {
    try {
        const result = await getSharedGrammarResult(id);
        return handleActionSuccess(result);
    } catch (error) {
        return handleActionError(error);
    }
}
