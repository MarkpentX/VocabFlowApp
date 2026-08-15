import React from "react";
import { getTranslations } from "next-intl/server";
import { getSessionUser } from "@/infrastructure/auth/session";
import { getGrammarRulesAction } from "@/presentation/actions/grammar-actions";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import GrammarExamFlow from "@/presentation/components/features/grammar/GrammarExamFlow";

async function Page() {
    await getSessionUser();
    const t = await getTranslations("grammar");

    const rulesResult = await getGrammarRulesAction();
    const rules = rulesResult.isSuccess ? rulesResult.data : [];

    return (
        <>
            <HeaderBackArrow title={t("takeExam")} href="/grammar" />
            <main className="max-w-3xl px-6 py-4 mx-auto">
                <GrammarExamFlow rules={rules} />
            </main>
        </>
    );
}

export default Page;
