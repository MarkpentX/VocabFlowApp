import React from 'react';
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import LevelTestQuiz from "@/presentation/components/features/level-test/LevelTestQuiz";
import { getShopStatusAction } from "@/presentation/actions/shop-actions";
import { getLevelTestQuestionsAction } from "@/presentation/actions/level-test-actions";

async function Page() {
    const t = await getTranslations("levelTest");
    const locale = await getLocale();

    const status = await getShopStatusAction();
    if (!status.isSuccess || !status.data.owned.includes("levelTest")) {
        redirect({ href: "/shop", locale });
    }

    const questions = await getLevelTestQuestionsAction();

    return (
        <>
            <HeaderBackArrow title={t("title")} href="/dashboard"/>
            <main className="max-w-md px-6 mx-auto flex flex-col">
                <LevelTestQuiz questions={questions.isSuccess ? questions.data : []}/>
            </main>
        </>
    );
}

export default Page;
