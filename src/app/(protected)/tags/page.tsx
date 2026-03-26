'use server'

import React from 'react';
import HeaderBackArrow from "@/app/(protected)/tags/_components/HeaderBackArrow";
import ShowTags from "@/app/(protected)/components/ShowTags";

async function Page() {

    return (
        <>
            <HeaderBackArrow title="Tags" href="/dashboard"/>
            <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
                <ShowTags/>
            </main>
        </>
    );
}

export default Page;