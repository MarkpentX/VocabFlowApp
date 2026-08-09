import React from 'react';
import HeaderBackArrow from "@/presentation/components/features/tags/HeaderBackArrow";
import ShowTags from "@/presentation/components/features/tags/ShowTags";
import { useTranslations } from "next-intl";

function Page() {
    const t = useTranslations("tags");

    return (
        <>
            <HeaderBackArrow title={t("pageTitle")} href="/dashboard"/>
            <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
                <ShowTags/>
            </main>
        </>
    );
}

export default Page;
