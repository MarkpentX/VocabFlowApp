import React from 'react';
import { getTranslations } from "next-intl/server";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import LevelTestQuiz from "@/presentation/components/features/level-test/LevelTestQuiz";
import { getLevelTestQuestionsAction } from "@/presentation/actions/level-test-actions";
import { getSessionUser } from "@/infrastructure/auth/session";

async function Page() {
    await getSessionUser();
    const t = await getTranslations("levelTest");

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
