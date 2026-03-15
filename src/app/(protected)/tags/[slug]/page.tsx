'use server'

import {getWordsByTag} from "@/app/(protected)/tags/actions";
import Words from "@/app/(protected)/tags/[slug]/Words";

export default async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const userWords = await getWordsByTag(slug)

    if (userWords.length === 0){
        return (
            <h1>You dont have any words on this tags: {slug}</h1>
        )
    }

    return (
        <main>
            <Words words={userWords} slug={slug} />
        </main>
    )
}