'use server'

import React from 'react';
import Link from "next/link";
import {getAllTags} from "@/app/(protected)/tags/actions";

async function Page() {
    const tags = await getAllTags()

    if (tags.length === 0){
        return (
            <h1>You dont have any tags</h1>
        )
    }

    return (
        <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
                <div className="flex items-center gap-5">
                    <Link href={"/dashboard"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-arrow-left w-4 h-4">
                            <path d="m12 19-7-7 7-7"></path>
                            <path d="M19 12H5"></path>
                        </svg>
                    </Link>

                    <h1 className="text-xl text-[rgb(37,177,95)] font-bold font-spaceGrotesk">
                        Tags
                    </h1>
                </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto">
                {tags.map((tag, index) => (
                    <li className="animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-6 rounded-xl" key={index}>
                        <Link className="text-black text-lg" href={`/tags/${tag}`}>{tag}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Page;