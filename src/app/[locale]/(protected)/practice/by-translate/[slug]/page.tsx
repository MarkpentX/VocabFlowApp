import React from 'react';
import Translate from "@/presentation/components/features/practice/Translate";
import { slugDecode } from "@/lib/slug-utils";
import { getWordsByTagAction } from "@/presentation/actions/word-actions";
import HeaderBackArrow from "@/presentation/components/features/tags/HeaderBackArrow";
import { getTranslations } from "next-intl/server";

async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const decodedSlug = slugDecode(slug);
    const words = await getWordsByTagAction(decodedSlug)
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
                <Translate words={words.data} tagName={decodedSlug}/>
            </main>
        </>
    );
}

export default Page;
