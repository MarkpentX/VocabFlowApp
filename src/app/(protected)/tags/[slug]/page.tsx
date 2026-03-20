'use server'

import WordsList from "@/app/(protected)/tags/[slug]/WordsList";
import {getWordsByTag} from "@/app/(protected)/tags/actions";
import HeaderBackArrow from "@/app/(protected)/tags/_components/HeaderBackArrow";
import React from "react";

export default async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug);  // <-- декодируем сразу
    const userWords = await getWordsByTag(decodedSlug)

    if (userWords.length === 0){
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
            <WordsList words={userWords} slug={decodedSlug} />
        </main>
    )
}