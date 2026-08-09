import React from 'react';
import { getSessionUser } from "@/infrastructure/auth/session";
import { getUserStatsAction } from "@/presentation/actions/user-actions";
import Image from "next/image";
import TextWriter from "@/presentation/components/features/dashboard/TextWriter";
import StreakBadge from "@/presentation/components/features/dashboard/StreakBadge";
import { getTranslations } from "next-intl/server";

async function DashboardStatistics() {
    const user = await getSessionUser();
    const actionResult = await getUserStatsAction(user.id);
    const t = await getTranslations("dashboard");
    const helloText = user.name
        ? t("helloNamed", { name: user.name })
        : user.username
            ? t("helloNamed", { name: user.username })
            : t("helloUser");

    return (
        <>
            <h1 className="text-3xl font-bold text-black mb-6">
                <TextWriter text={helloText}/>
            </h1>

            {actionResult.isSuccess && (
                <div
                    className={
                        actionResult.data.currentStreak > 0
                            ? "flex items-center bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 drop-shadow-sm px-5 py-4 rounded-xl w-fit"
                            : "flex items-center bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black px-5 py-4 rounded-xl w-fit"
                    }
                >
                    <StreakBadge currentStreak={actionResult.data.currentStreak}/>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-4">
                <article className="bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-5 rounded-xl">
                    <Image className="w-9 h-9 mb-3" src="/book.svg" alt="book-icon" width={36} height={36}/>
                    <span className="text-2xl font-spaceGrotesk font-bold" >{actionResult.isSuccess ? actionResult.data.userWordsCount : "..."}</span>
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm">{t("totalWords")}</p>
                </article>

                <article className="bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-5 rounded-xl">
                    <Image className="w-9 h-9 mb-3" src="/tag.svg" alt="dictionary-icon" width={36} height={36}/>
                    <span className="text-2xl font-spaceGrotesk font-bold" >{actionResult.isSuccess ? actionResult.data.userDictionariesCount : "..."}</span>
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm">{t("totalDictionaries")}</p>
                </article>
            </div>
        </>
    );
}

export default DashboardStatistics;
