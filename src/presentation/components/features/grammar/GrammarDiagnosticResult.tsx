"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GrammarDiagnosticResult as GrammarDiagnosticResultType } from "@/domain/entities/grammar-diagnostic";
import { recordGrammarDiagnosticResultAction } from "@/presentation/actions/grammar-actions";
import ShareResultButton from "@/presentation/components/features/grammar/ShareResultButton";

interface GrammarDiagnosticResultProps {
    result: GrammarDiagnosticResultType;
    onRetake: () => void;
}

function GrammarDiagnosticResult({ result, onRetake }: GrammarDiagnosticResultProps) {
    const t = useTranslations("grammar");
    const recordedRef = useRef(false);

    useEffect(() => {
        if (recordedRef.current) {
            return;
        }
        recordedRef.current = true;
        recordGrammarDiagnosticResultAction(result.allRules);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isPerfect = result.weakRules.length === 0;

    return (
        <article className="relative mt-6 p-7 flex flex-col items-center animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-2xl">
            <span className="text-5xl mb-2">{isPerfect ? "🏆" : "🔍"}</span>

            <h2 className="text-xl font-bold text-center mb-1 font-spaceGrotesk">{t("diagnostic.resultTitle", { level: result.level })}</h2>

            <h3 className="text-center bg-gradient-to-br from-violet-500 to-fuchsia-600 bg-clip-text text-transparent text-4xl font-spaceGrotesk font-extrabold mb-2 tabular-nums">
                {result.correctCount} / {result.total}
            </h3>

            <p className="text-center text-sm text-[rgb(103,126,119)] mb-6 tabular-nums">
                {t("stats.ruleAccuracy", { accuracy: result.overallAccuracy })}
            </p>

            {isPerfect ? (
                <p className="text-center text-[rgb(103,126,119)] mb-6 max-w-sm">{t("diagnostic.noWeakSpots")}</p>
            ) : (
                <div className="w-full mb-6">
                    <p className="text-center text-xs font-semibold text-amber-700 uppercase tracking-wide mb-3">
                        {t("diagnostic.weakSpotsTitle")}
                    </p>
                    <ul className="flex flex-col gap-2">
                        {result.weakRules.map((rule, index) => (
                            <motion.li
                                key={rule.ruleKey}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.06 }}
                            >
                                <Link
                                    href={`/grammar/${rule.ruleKey}/practice`}
                                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors"
                                >
                                    <span className="text-left">
                                        <span className="block text-sm font-semibold text-[rgb(18,33,28)]">
                                            {t(`rules.${rule.ruleKey}.title`)}
                                        </span>
                                        <span className="block text-xs text-amber-700">
                                            {t("diagnostic.needsPractice", { accuracy: rule.accuracy })}
                                        </span>
                                    </span>
                                    <span className="shrink-0 text-xs font-semibold text-amber-700">{t("diagnostic.practiceNow")} →</span>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="w-full mb-6">
                <p className="text-center text-xs font-semibold text-[rgb(103,126,119)] uppercase tracking-wide mb-2">
                    {t("diagnostic.fullBreakdown")}
                </p>
                <div className="flex flex-col gap-1.5">
                    {result.allRules.map((rule) => (
                        <div key={rule.ruleKey} className="flex items-center gap-2">
                            <span className="flex-1 text-xs text-[rgb(18,33,28)] truncate">{t(`rules.${rule.ruleKey}.title`)}</span>
                            <div className="flex-1 h-2 rounded-full bg-[rgb(236,239,231)] overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${rule.isWeak ? "bg-amber-400" : "bg-gradient-to-r from-emerald-400 to-green-500"}`}
                                    style={{ width: `${rule.accuracy}%` }}
                                ></div>
                            </div>
                            <span className="w-16 shrink-0 text-right text-xs tabular-nums text-[rgb(103,126,119)]">
                                {rule.correct}/{rule.total}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
                <button
                    type="button"
                    onClick={onRetake}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-white bg-gradient-to-br from-violet-500 to-fuchsia-600 cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-95"
                >
                    {t("diagnostic.retake")}
                </button>
                <ShareResultButton
                    ruleKeys={result.allRules.map((rule) => rule.ruleKey)}
                    questionsCount={result.total}
                    correctCount={result.correctCount}
                    maxCombo={0}
                />
            </div>
        </article>
    );
}

export default GrammarDiagnosticResult;
