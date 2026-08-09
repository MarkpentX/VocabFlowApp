import WordsList from "@/presentation/components/features/dictionaries/WordsList";
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import React from "react";
import { slugDecode } from "@/lib/slug-utils";
import { getWordsByDictionaryAction } from "@/presentation/actions/word-actions";
import { getTranslations } from "next-intl/server";

export default async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const decodedSlug = slugDecode(slug);
    const actionResult = await getWordsByDictionaryAction(decodedSlug)
    const t = await getTranslations("dictionaries");

    if (!actionResult.isSuccess || !actionResult.data) {
        return <p className="text-center mt-10">{t("loadWordsError")}</p>;
    }

    if (actionResult.data.length === 0){
        return (
            <>
                <HeaderBackArrow title={decodedSlug} href="/dictionary"/>
                <p className="text-md text-[rgb(103,126,119)] text-center mt-10">{t("noWordsYet")}</p>
            </>
        )
    }

    return (
        <main>
            <HeaderBackArrow title={decodedSlug} href="/dictionary"/>
            <WordsList words={actionResult.data} />
        </main>
    )
}
