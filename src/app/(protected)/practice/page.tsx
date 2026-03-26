import React from 'react';
import HeaderBackArrow from "@/app/(protected)/tags/_components/HeaderBackArrow";
import ShowTagsPractice from "@/app/(protected)/components/ShowTagsPractice";

function Page() {
    return (
        <>
            <HeaderBackArrow title="Practice" href="/dashboard"/>
            <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
                <ShowTagsPractice/>
            </main>
        </>
    );
}

export default Page;