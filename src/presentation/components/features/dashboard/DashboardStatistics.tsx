import React from 'react';
import { getSessionUser } from "@/infrastructure/auth/session";
import { getUserStatsAction } from "@/presentation/actions/user-actions";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import TextWriter from "@/presentation/components/features/dashboard/TextWriter";
import StreakBadge from "@/presentation/components/features/dashboard/StreakBadge";
import CoinBadge from "@/presentation/components/features/dashboard/CoinBadge";
import { getTranslations } from "next-intl/server";

async function DashboardStatistics() {
    const user = await getSessionUser();
    const actionResult = await getUserStatsAction();
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
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div
                        className={
                            actionResult.data.currentStreak > 0
                                ? "flex items-center min-w-0 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 drop-shadow-sm px-3 py-3 sm:px-5 sm:py-4 rounded-xl"
                                : "flex items-center min-w-0 bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black px-3 py-3 sm:px-5 sm:py-4 rounded-xl"
                        }
                    >
                        <StreakBadge currentStreak={actionResult.data.currentStreak} size={52}/>
                    </div>

                    <div className="flex items-center min-w-0 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 drop-shadow-sm px-3 py-3 sm:px-5 sm:py-4 rounded-xl">
                        <CoinBadge coins={actionResult.data.coins} size={52}/>
                    </div>
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

            <Link
                href="/grammar/diagnostic"
                className="relative mt-4 overflow-hidden flex items-center justify-between gap-3 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600 drop-shadow-sm px-5 py-4 rounded-xl transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
            >
                <div
                    aria-hidden
                    className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10 blur-2xl"
                ></div>
                <div className="relative flex items-center gap-3 min-w-0">
                    <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-xl">
                        ✨
                    </span>
                    <div className="min-w-0">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-violet-900 bg-white mb-1">
                            AI
                        </span>
                        <p className="font-spaceGrotesk font-bold text-white truncate">{t("aiWeakSpots.title")}</p>
                        <p className="text-white/80 font-dMSans text-sm truncate">{t("aiWeakSpots.subtitle")}</p>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="relative w-5 h-5 shrink-0 text-white">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            </Link>

            <Link
                href="/grammar"
                className="mt-4 flex items-center justify-between gap-3 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-100 drop-shadow-sm px-5 py-4 rounded-xl transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
            >
                <div>
                    <p className="font-spaceGrotesk font-bold text-[rgb(18,33,28)]">{t("grammarCard.title")}</p>
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm">{t("grammarCard.subtitle")}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="w-5 h-5 shrink-0 text-[rgb(37,177,95)]">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            </Link>
        </>
    );
}

export default DashboardStatistics;
