import React from 'react';
import CreateWordForm from "@/presentation/components/features/words/CreateWordForm";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import { useTranslations } from "next-intl";

function Page() {
    const t = useTranslations("words");

    return (
        <>
            <HeaderBackArrow title={t("addWordTitle")} href="/dashboard"/>
            <main className="flex flex-col gap-3 px-6 py-4 max-w-5xl min-h-dvh mx-auto">
                <CreateWordForm/>
            </main>
        </>
    );
}

export default Page;
