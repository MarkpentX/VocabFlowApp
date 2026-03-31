import React from 'react';
import {getSessionUser} from "@/lib/utils/auth-utils";
import {getUserStatsAction} from "@/features/users/controllers/getUserStatsAction";
import Image from "next/image";
import bookIcon from "../../../../public/book.svg";
import tagIcon from "../../../../public/tag.svg";
import TextWriter from "@/app/(protected)/components/TextWriter";

async function DashboardStatistics() {
    const user = await getSessionUser();
    const actionResult = await getUserStatsAction(user.id);

    return (
        <>
            <h1 className="text-3xl font-bold text-black mb-6">
                <TextWriter text={user.name ? `Hello, ${user.name}` : "Hello, user"}/>
            </h1>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <article className="bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-5 rounded-xl">
                    <Image className="w-9 h-9 mb-3" src={bookIcon} alt="book-icon"/>
                    <span className="text-2xl font-spaceGrotesk font-bold" >{actionResult.isSuccess ? actionResult.data.userWordsCount : "..."}</span>
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm">Total Words</p>
                </article>

                <article className="bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-5 rounded-xl">
                    <Image className="w-9 h-9 mb-3" src={tagIcon} alt="tag-icon"/>
                    <span className="text-2xl font-spaceGrotesk font-bold" >{actionResult.isSuccess ? actionResult.data.userTagsCount : "..."}</span>
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm">Total tags</p>
                </article>
            </div>
        </>
    );
}

export default DashboardStatistics;