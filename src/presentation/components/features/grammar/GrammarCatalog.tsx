"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GrammarRuleSummary } from "@/application/use-cases/grammar/get-grammar-rules";
import { GrammarStats } from "@/domain/entities/grammar";
import FeatureDuck from "@/presentation/components/features/practice/FeatureDuck";

interface GrammarCatalogProps {
    rules: GrammarRuleSummary[];
    stats: GrammarStats;
}

function GrammarCatalog({ rules, stats }: GrammarCatalogProps) {
    const t = useTranslations("grammar");
    const statsByKey = new Map(stats.rules.map((rule) => [rule.ruleKey, rule]));

    return (
        <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-100/70 px-5 py-5 mb-7">
                <motion.div
                    aria-hidden
                    className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-200/40 blur-3xl"
                    animate={{ x: [0, 14, 0], y: [0, 10, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="absolute -bottom-14 -right-6 w-48 h-48 rounded-full bg-teal-200/40 blur-3xl"
                    animate={{ x: [0, -12, 0], y: [0, -8, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <div className="pointer-events-none absolute top-1 right-2 w-16 h-16 sm:w-20 sm:h-20">
                    <FeatureDuck src="/duck_inside.lottie" className="w-full h-full" />
                </div>

                <p className="relative text-[rgb(103,126,119)] font-dMSans text-sm mb-4 max-w-sm">{t("subtitle")}</p>

                <div className="relative grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center justify-center bg-white/80 backdrop-blur border border-emerald-100 rounded-xl py-3 px-2">
                        <span className="font-spaceGrotesk font-extrabold text-xl tabular-nums text-[rgb(18,33,28)]">
                            {stats.rulesMastered}/{stats.totalRules}
                        </span>
                        <span className="text-[11px] text-[rgb(103,126,119)] text-center leading-tight mt-0.5">
                            {t("stats.mastered")}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white/80 backdrop-blur border border-emerald-100 rounded-xl py-3 px-2">
                        <span className="font-spaceGrotesk font-extrabold text-xl tabular-nums text-[rgb(18,33,28)]">
                            {stats.overallAccuracy}%
                        </span>
                        <span className="text-[11px] text-[rgb(103,126,119)] text-center leading-tight mt-0.5">
                            {t("stats.accuracy")}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white/80 backdrop-blur border border-emerald-100 rounded-xl py-3 px-2">
                        <span className="font-spaceGrotesk font-extrabold text-xl tabular-nums text-[rgb(18,33,28)]">
                            {stats.totalAttempts}
                        </span>
                        <span className="text-[11px] text-[rgb(103,126,119)] text-center leading-tight mt-0.5">
                            {t("stats.exercisesDone")}
                        </span>
                    </div>
                </div>

                <div className="relative mt-4">
                    <div className="flex justify-end mb-1">
                        <Link
                            href="/grammar/exam"
                            className="text-xs font-semibold text-[rgb(37,177,95)] hover:text-[rgb(21,132,68)] transition-colors"
                        >
                            {t("takeExam")} →
                        </Link>
                    </div>
                </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rules.map((rule, index) => {
                    const ruleStats = statsByKey.get(rule.key);
                    const accuracy = ruleStats?.accuracy ?? 0;
                    const attempts = ruleStats?.attempts ?? 0;
                    const mastered = ruleStats?.mastered ?? false;

                    return (
                        <motion.li
                            key={rule.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                        >
                            <Link
                                href={`/grammar/${rule.key}`}
                                className="group relative block rounded-[1.4rem] p-[1.5px] bg-gradient-to-br from-[rgb(226,229,220)] to-[rgb(226,229,220)] hover:from-emerald-300 hover:via-green-300 hover:to-emerald-400 transition-colors duration-300"
                            >
                                <div className="relative flex flex-col p-5 bg-white rounded-[1.35rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                                    {mastered && (
                                        <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white bg-gradient-to-br from-emerald-400 to-green-600 shadow-sm shadow-emerald-900/20">
                                            {t("mastered")}
                                        </span>
                                    )}

                                    <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-[rgb(37,177,95)] bg-green-50 border border-green-100 mb-2">
                                        {rule.level}
                                    </span>

                                    <h3 className="font-spaceGrotesk font-bold text-base mb-1 pr-16">
                                        {t(`rules.${rule.key}.title`)}
                                    </h3>
                                    <p className="text-xs text-[rgb(103,126,119)] font-dMSans mb-4 line-clamp-2">
                                        {t(`rules.${rule.key}.description`)}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="h-1.5 rounded-full bg-[rgb(236,239,231)] overflow-hidden mb-1.5">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all"
                                                style={{ width: `${accuracy}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-[11px] text-[rgb(103,126,119)] tabular-nums">
                                            {attempts > 0 ? t("stats.ruleAccuracy", { accuracy }) : t("notStarted")}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
}

export default GrammarCatalog;
