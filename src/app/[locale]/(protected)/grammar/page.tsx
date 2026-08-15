import React from "react";
import { getSessionUser } from "@/infrastructure/auth/session";
import { getGrammarRulesAction, getGrammarStatsAction } from "@/presentation/actions/grammar-actions";
import GrammarCatalog from "@/presentation/components/features/grammar/GrammarCatalog";

async function Page() {
    await getSessionUser();

    const [rulesResult, statsResult] = await Promise.all([getGrammarRulesAction(), getGrammarStatsAction()]);

    const rules = rulesResult.isSuccess ? rulesResult.data : [];
    const stats = statsResult.isSuccess
        ? statsResult.data
        : { rules: [], totalAttempts: 0, totalCorrect: 0, overallAccuracy: 0, rulesMastered: 0, rulesStarted: 0, totalRules: rules.length };

    return <GrammarCatalog rules={rules} stats={stats} />;
}

export default Page;
