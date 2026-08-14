import React from 'react';
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import ExamFlow from "@/presentation/components/features/exam/ExamFlow";
import { getShopStatusAction } from "@/presentation/actions/shop-actions";
import { getDictionariesAction } from "@/presentation/actions/dictionary-actions";

async function Page() {
    const t = await getTranslations("exam");
    const locale = await getLocale();

    const status = await getShopStatusAction();
    if (!status.isSuccess || !status.data.owned.includes("customExam")) {
        redirect({ href: "/shop", locale });
    }

    const dictionaries = await getDictionariesAction();

    return (
        <>
            <HeaderBackArrow title={t("title")} href="/dashboard"/>
            <main className="max-w-3xl px-6 py-4 mx-auto">
                <ExamFlow dictionaries={dictionaries.isSuccess ? dictionaries.data : []}/>
            </main>
        </>
    );
}

export default Page;
