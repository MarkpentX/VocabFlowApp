import React from "react";
import { getTranslations } from "next-intl/server";
import { getSessionUser } from "@/infrastructure/auth/session";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import GrammarDiagnosticFlow from "@/presentation/components/features/grammar/GrammarDiagnosticFlow";

async function Page() {
    await getSessionUser();
    const t = await getTranslations("grammar");

    return (
        <>
            <HeaderBackArrow title={t("diagnostic.title")} href="/dashboard" />
            <main className="max-w-3xl px-6 py-4 mx-auto">
                <GrammarDiagnosticFlow />
            </main>
        </>
    );
}

export default Page;
