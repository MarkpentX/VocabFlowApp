import React from 'react';
import { slugDecode } from "@/lib/slug-utils";
import { getWordsByDictionaryAction } from "@/presentation/actions/word-actions";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import QuizByEar from "@/presentation/components/features/practice/QuizByEar";
import { getTranslations } from "next-intl/server";

async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const decodedSlug = slugDecode(slug);
    const words = await getWordsByDictionaryAction(decodedSlug)
    const t = await getTranslations("practice");

    if (!words.isSuccess){
        return (
            <div>{t("loadWordsError")}</div>
        )
    }

    return (
        <>
            <HeaderBackArrow title={t("practiceTitle")} href="/practice"  />
            <main className="max-w-md px-6 mx-auto flex flex-col ">
                <QuizByEar words={words.data} dictionaryName={decodedSlug}/>
            </main>
        </>
    );
}

export default Page;
