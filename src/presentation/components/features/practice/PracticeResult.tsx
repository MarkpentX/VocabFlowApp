import React from 'react';
import { Link } from "@/i18n/navigation";
import { slugEncode } from "@/lib/slug-utils";
import { useTranslations } from "next-intl";
import ConfettiEffect from "@/presentation/components/features/practice/ConfettiEffect";
import StreakBadge from "@/presentation/components/features/dashboard/StreakBadge";
import { StreakUpdateResult } from "@/domain/entities/streak";

interface PracticeResultProps {
    correctCount: number
    questionsCount: number
    failed: boolean
    maxCombo: number
    streakResult: StreakUpdateResult | null
    tagName: string
    onPlayAgain: () => void
}

function PracticeResult({ onPlayAgain, correctCount, questionsCount, failed, maxCombo, streakResult, tagName }: PracticeResultProps) {
    const t = useTranslations("practice");
    const encodedTagName = slugEncode(tagName);
    const isPerfect = !failed && questionsCount > 0 && correctCount === questionsCount;
    const resultIcon = failed ? "💔" : isPerfect ? "🏆" : "✨";

    return (
        <article className="mt-6 p-7 flex flex-col items-center animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-2xl">
            {isPerfect && <ConfettiEffect/>}

            <span className="text-5xl mb-2">{resultIcon}</span>

            <h2 className="text-xl font-bold text-center mb-1 font-spaceGrotesk">
                {failed ? t("outOfHearts") : t("practiceOver")}
            </h2>

            <h3 className="text-center bg-gradient-to-br from-[rgb(37,177,95)] to-[rgb(21,132,68)] bg-clip-text text-transparent text-4xl font-spaceGrotesk font-extrabold mb-2 tabular-nums">
                {correctCount} / {questionsCount}
            </h3>

            {maxCombo >= 3 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 mb-3 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">
                    🔥 {t("bestCombo", { count: maxCombo })}
                </span>
            )}

            <p className="text-center text-[rgb(103,126,119)] mb-5">
                {isPerfect ? t("perfectScore") : t("keepLearning")}
            </p>

            {streakResult && streakResult.currentStreak > 0 && (
                <div className="flex justify-center items-center w-full mb-6 px-5 py-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
                    <StreakBadge
                        currentStreak={streakResult.currentStreak}
                        previousStreak={streakResult.previousStreak}
                        streakIncreased={streakResult.streakIncreased}
                        size={56}
                    />
                </div>
            )}

            <ul className="flex gap-3 justify-center flex-wrap mb-3 w-full">
                <li className="flex-1 min-w-[140px]">
                    <button
                        type="button"
                        onClick={onPlayAgain}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-white bg-[rgba(37,177,95,0.95)] cursor-pointer w-full transition-transform duration-150 hover:scale-[1.03] hover:bg-[rgb(30,150,80)] active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-rotate-ccw w-4 h-4">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                        </svg>
                        {t("again")}
                    </button>
                </li>

                <li className="flex-1 min-w-[140px]">
                    <Link
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-black border border-[rgb(226,229,220)] bg-[rgb(248,249,245)] w-full transition-transform duration-150 hover:scale-[1.03] hover:bg-gray-100 active:scale-95"
                        href={`/practice/${encodedTagName}`}
                    >
                        {t("otherMode")}
                    </Link>
                </li>
            </ul>

            <Link
                className="flex justify-center self-center items-center gap-2 px-4 py-2 rounded-md text-[rgb(103,126,119)] hover:text-black transition-colors"
                href={`/tags/${encodedTagName}`}
            >
                {t("toWords")}
            </Link>
        </article>
    );
}

export default PracticeResult;
