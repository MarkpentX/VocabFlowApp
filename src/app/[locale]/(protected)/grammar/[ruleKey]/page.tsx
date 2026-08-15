import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getSessionUser } from "@/infrastructure/auth/session";
import { getGrammarRulesAction, getGrammarStatsAction } from "@/presentation/actions/grammar-actions";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import GrammarLesson from "@/presentation/components/features/grammar/GrammarLesson";

interface PageProps {
    params: Promise<{ ruleKey: string }>;
}

async function Page({ params }: PageProps) {
    await getSessionUser();
    const { ruleKey } = await params;
    const t = await getTranslations("grammar");

    const [rulesResult, statsResult] = await Promise.all([getGrammarRulesAction(), getGrammarStatsAction()]);

    const rule = rulesResult.isSuccess ? rulesResult.data.find((r) => r.key === ruleKey) : undefined;
    if (!rule) {
        notFound();
    }

    const ruleStats = statsResult.isSuccess ? statsResult.data.rules.find((r) => r.ruleKey === ruleKey) : undefined;

    return (
        <>
            <HeaderBackArrow title={t(`rules.${ruleKey}.title`)} href="/grammar" />
            <GrammarLesson rule={rule} ruleStats={ruleStats} />
        </>
    );
}

export default Page;
