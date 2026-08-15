import React from 'react';
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import ShowDictionaries from "@/presentation/components/features/dictionaries/ShowDictionaries";
import { useTranslations } from "next-intl";

function Page() {
    const t = useTranslations("dictionaries");

    return (
        <>
            <HeaderBackArrow title={t("pageTitle")} href="/dashboard"/>
            <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl min-h-dvh mx-auto">
                <ShowDictionaries/>
            </main>
        </>
    );
}

export default Page;
