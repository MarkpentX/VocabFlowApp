import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GrammarRuleSummary } from "@/application/use-cases/grammar/get-grammar-rules";
import { GrammarRuleStats } from "@/domain/entities/grammar";

interface GrammarLessonProps {
    rule: GrammarRuleSummary;
    ruleStats: GrammarRuleStats | undefined;
}

async function GrammarLesson({ rule, ruleStats }: GrammarLessonProps) {
    const t = await getTranslations("grammar");
    const examples = t.raw(`lessons.${rule.key}.examples`) as string[];

    return (
        <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="bg-white border border-[rgb(226,229,220)] drop-shadow-sm rounded-2xl p-6 mb-5">
                <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-[rgb(37,177,95)] bg-green-50 border border-green-100 mb-3">
                    {rule.level}
                </span>

                <h1 className="font-spaceGrotesk font-bold text-2xl mb-3">{t(`rules.${rule.key}.title`)}</h1>

                <p className="text-[rgb(18,33,28)] font-dMSans leading-relaxed mb-5">
                    {t(`lessons.${rule.key}.explanation`)}
                </p>

                <p className="text-xs font-semibold text-[rgb(103,126,119)] uppercase tracking-wide mb-2">
                    {t("lesson.examplesTitle")}
                </p>
                <ul className="flex flex-col gap-2 mb-2">
                    {examples.map((example) => (
                        <li
                            key={example}
                            className="text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] border border-[rgb(226,229,220)] rounded-lg px-4 py-2.5"
                        >
                            {example}
                        </li>
                    ))}
                </ul>
            </div>

            {ruleStats && ruleStats.attempts > 0 && (
                <div className="flex gap-3 mb-5">
                    <div className="flex-1 bg-white border border-[rgb(226,229,220)] rounded-xl px-4 py-3 text-center">
                        <span className="block font-spaceGrotesk font-bold text-lg tabular-nums">{ruleStats.attempts}</span>
                        <span className="text-[11px] text-[rgb(103,126,119)]">{t("lesson.attempts", { count: ruleStats.attempts })}</span>
                    </div>
                    <div className="flex-1 bg-white border border-[rgb(226,229,220)] rounded-xl px-4 py-3 text-center">
                        <span className="block font-spaceGrotesk font-bold text-lg tabular-nums">{ruleStats.accuracy}%</span>
                        <span className="text-[11px] text-[rgb(103,126,119)]">{t("lesson.accuracy", { accuracy: ruleStats.accuracy })}</span>
                    </div>
                </div>
            )}

            <Link
                href={`/grammar/${rule.key}/practice`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white bg-[rgba(37,177,95,0.95)] cursor-pointer w-full transition-transform duration-150 hover:scale-[1.02] hover:bg-[rgb(30,150,80)] active:scale-95"
            >
                {t("lesson.startPractice")}
            </Link>
        </div>
    );
}

export default GrammarLesson;
