import React from 'react';
import Link from "next/link";
import {DeleteForm} from "@/app/(protected)/tags/_components/DeleteForm";
import {slugEncode} from "@/lib/slug-utils";
import {getTagsAction} from "@/features/tags/controllers/getTagsAction";
import {deleteTagAction} from "@/features/tags/controllers/deleteTagAction";


async function ShowTagsPractice() {
    const actionResult = await getTagsAction()

    if (!actionResult.isSuccess){
        return (
            <div>An error occurred</div>
        )
    }

    if (actionResult.data.length === 0){
        return (
            <>
                <div className="flex flex-col gap-4 py-16 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-folder-open text-[rgb(103,126,119)] w-12 h-12 text-muted-foreground mx-auto">
                        <path
                            d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path>
                    </svg>

                    <p className="text-md text-[rgb(103,126,119)]">No tags yet. Add a word to create your first tag.</p>

                    <Link href="/add-word" className="bg-[rgba(37,177,95,0.9)] text-white text-sm border-1 border-[rgb(226,229,220)] py-2.5 px-4 rounded-xl">Add word</Link>
                </div>
            </>
        )
    }

    return (
        <>
            <h2 className="text-[rgb(103,126,119)] font-dMSans text-sm text-center">Select the tag you want to practice</h2>
            <ul className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full">
                {actionResult.data.map((tag, index) => (
                    <li className="grid grid-cols-2 animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-6 rounded-xl" key={index}>
                        <Link className="flex flex-col text-black text-lg" href={`/practice/${slugEncode(tag.title)}`}>
                            {tag.title}
                            <span className="text-sm text-[rgb(103,126,119)]">{tag.wordsCount} word</span>
                        </Link>
                        <DeleteForm id={tag.id} deleteAction={deleteTagAction} />
                    </li>
                ))}
            </ul>

        </>
    );
}

export default ShowTagsPractice;