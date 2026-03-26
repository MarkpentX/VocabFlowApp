import React from 'react';
import HeaderBackArrow from "@/app/(protected)/tags/_components/HeaderBackArrow";
import ShowTagsPractice from "@/app/(protected)/components/ShowTagsPractice";

function Page() {
    return (
        <>
            <HeaderBackArrow title="Practice" href="/dashboard"/>
            <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
                <h2 className="text-[rgb(103,126,119)] font-dMSans text-sm text-center">Select the tag you want to practice</h2>
                <ShowTagsPractice/>
            </main>
        </>
    );
}

export default Page;