import React, {Suspense} from 'react';
import CreateWordForm from "@/app/(protected)/add-word/CreateWordForm";
import Link from "next/link";
import {HashLoader} from "react-spinners";

function Page() {
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
                        Add Word
                    </h1>
                </div>

                <CreateWordForm/>
            </main>
    );
}

export default Page;