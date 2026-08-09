import React from 'react';
import HeaderBackArrow from "@/presentation/components/features/tags/HeaderBackArrow";
import ShowTagsPractice from "@/presentation/components/features/tags/ShowTagsPractice";
import { getTranslations } from "next-intl/server";

async function Page() {
    const t = await getTranslations("practice");

    return (
        <>
            <HeaderBackArrow title={t("practiceTitle")} href="/dashboard"/>
            <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
                <ShowTagsPractice/>
            </main>
        </>
    );
}

export default Page;
