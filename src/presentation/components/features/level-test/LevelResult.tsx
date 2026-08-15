"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ConfettiEffect from "@/presentation/components/features/practice/ConfettiEffect";
import { LevelTestScore } from "@/domain/entities/level-test";

interface LevelResultProps {
    score: LevelTestScore;
    onRetake: () => void;
}

const LEVEL_COLORS: Record<string, string> = {
    A1: "from-slate-400 to-slate-500",
    A2: "from-sky-400 to-sky-500",
    B1: "from-emerald-400 to-green-500",
    B2: "from-amber-400 to-orange-500",
    C1: "from-fuchsia-500 to-purple-600",
    C2: "from-rose-500 to-red-600",
};

function LevelResult({ score, onRetake }: LevelResultProps) {
    const t = useTranslations("levelTest");

    return (
        <article className="relative mt-6 p-7 flex flex-col items-center animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-2xl">
            <ConfettiEffect/>

            <p className="text-center text-[rgb(103,126,119)] mb-3">{t("resultIntro")}</p>

            <motion.div
                initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
                className={`flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br ${LEVEL_COLORS[score.level]} text-white font-spaceGrotesk font-extrabold text-4xl mb-4 shadow-lg`}
            >
                {score.level}
            </motion.div>

            <h3 className="text-center font-spaceGrotesk font-bold text-lg mb-1">{t(`levels.${score.level}.title`)}</h3>
            <p className="text-center text-sm text-[rgb(103,126,119)] mb-5 max-w-sm">{t(`levels.${score.level}.description`)}</p>

            <span className="text-center text-sm text-[rgb(103,126,119)] mb-6 tabular-nums">
                {t("scoreLabel", { correct: score.correctCount, total: score.total })}
            </span>

            <div className="w-full max-w-xs mb-6">
                <p className="text-center text-xs font-semibold text-[rgb(103,126,119)] uppercase tracking-wide mb-2">
                    {t("breakdownTitle")}
                </p>
                <div className="flex flex-col gap-1.5">
                    {score.breakdown.map((entry) => (
                        <div key={entry.level} className="flex items-center gap-2">
                            <span className="w-7 shrink-0 text-xs font-bold text-[rgb(18,33,28)]">{entry.level}</span>
                            <div className="flex-1 h-2 rounded-full bg-[rgb(236,239,231)] overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${LEVEL_COLORS[entry.level]}`}
                                    style={{ width: `${entry.accuracy}%` }}
                                >
                                </div>
                            </div>
                            <span className="w-9 shrink-0 text-right text-xs tabular-nums text-[rgb(103,126,119)]">{entry.correct}/{entry.total}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={onRetake}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-white bg-[rgba(37,177,95,0.95)] cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-95"
            >
                {t("retake")}
            </button>
        </article>
    );
}

export default LevelResult;
