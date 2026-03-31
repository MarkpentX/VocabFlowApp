import WordsList from "@/app/(protected)/tags/[slug]/WordsList";
import HeaderBackArrow from "@/app/(protected)/tags/_components/HeaderBackArrow";
import React from "react";
import {slugDecode} from "@/lib/slug-utils";
import {getWordsByTagAction} from "@/features/words/controllers/getWordsByTagAction";

export default async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const decodedSlug = slugDecode(slug);
    const actionResult = await getWordsByTagAction(decodedSlug)

    if (!actionResult.isSuccess || !actionResult.data) {
        return <p className="text-center mt-10">Failed to load words.</p>;
    }

    if (actionResult.data.length === 0){
        return (
            <>
                <HeaderBackArrow title={decodedSlug} href="/tags"/>
                <p className="text-md text-[rgb(103,126,119)] text-center mt-10">No words in this tag yet.</p>
            </>
        )
    }

    return (
        <main>
            <HeaderBackArrow title={decodedSlug} href="/tags"/>
            <WordsList words={actionResult.data} />
        </main>
    )
}