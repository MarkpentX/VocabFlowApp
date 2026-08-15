import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getSessionUser } from "@/infrastructure/auth/session";
import { getGrammarRulesAction } from "@/presentation/actions/grammar-actions";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import GrammarPractice from "@/presentation/components/features/grammar/GrammarPractice";

interface PageProps {
    params: Promise<{ ruleKey: string }>;
}

async function Page({ params }: PageProps) {
    await getSessionUser();
    const { ruleKey } = await params;
    const t = await getTranslations("grammar");

    const rulesResult = await getGrammarRulesAction();
    const rule = rulesResult.isSuccess ? rulesResult.data.find((r) => r.key === ruleKey) : undefined;
    if (!rule) {
        notFound();
    }

    const ruleTitle = t(`rules.${ruleKey}.title`);

    return (
        <>
            <HeaderBackArrow title={ruleTitle} href={`/grammar/${ruleKey}`} />
            <main className="max-w-md px-6 mx-auto flex flex-col">
                <GrammarPractice ruleKey={ruleKey} ruleTitle={ruleTitle} />
            </main>
        </>
    );
}

export default Page;
