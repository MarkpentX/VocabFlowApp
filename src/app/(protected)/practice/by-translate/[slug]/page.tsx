import React from 'react';
import {getSessionUser} from "@/lib/utils/auth-utils";
import {getWordsByTagDB} from "@/features/words/queries";
import Quiz from "@/app/(protected)/practice/by-translate/components/Quiz";
import {slugDecode} from "@/lib/slug-utils";

async function Page({params,}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const decodedSlug = slugDecode(slug);
    const user = await getSessionUser()
    const words = await getWordsByTagDB(user.id, decodedSlug)

    return (
        <>
            <Quiz words={words} />
        </>
    );
}

export default Page;