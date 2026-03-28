import React from 'react';
import Quiz from "@/app/(protected)/practice/by-translate/components/Quiz";
import {slugDecode} from "@/lib/slug-utils";
import {getWordsByTagAction} from "@/features/words/controllers/getWordsByTagAction";
import HeaderBackArrow from "@/app/(protected)/tags/_components/HeaderBackArrow";

async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const decodedSlug = slugDecode(slug);
    const words = await getWordsByTagAction(decodedSlug)

    if (!words.isSuccess){
        return (
            <div>
                Fail to gat words by tag.
            </div>
        )
    }

    return (
        <>
            <HeaderBackArrow title="Practice" href="/practice"  />
            <main className="max-w-md px-6 mx-auto flex flex-col ">
                <Quiz words={words.data} />
            </main>
        </>
    );
}

export default Page;