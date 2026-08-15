import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SharedGrammarResult } from "@/domain/entities/grammar-shared-result";

interface SharedResultViewProps {
    result: SharedGrammarResult;
}

async function SharedResultView({ result }: SharedResultViewProps) {
    const t = await getTranslations("grammar");
    const accuracy = result.questionsCount === 0 ? 0 : Math.round((result.correctCount / result.questionsCount) * 100);
    const formattedDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(result.createdAt);

    return (
        <main className="flex flex-col items-center justify-center min-h-dvh px-4 py-10">
            <Link href="/" className="text-green-600 text-2xl mb-6 text-center font-bold font-spaceGrotesk">
                VocabFlow
            </Link>

            <article className="relative w-full max-w-md p-7 flex flex-col items-center bg-[rgb(255,255,255)] border border-[rgb(226,229,220)] drop-shadow-sm rounded-2xl">
                <span className="text-5xl mb-2">{accuracy === 100 ? "🏆" : "📘"}</span>

                <h1 className="text-center font-spaceGrotesk font-bold text-lg mb-1">
                    {t("share.resultTitle", { name: result.studentName })}
                </h1>
                <p className="text-center text-xs text-[rgb(103,126,119)] mb-5">{formattedDate}</p>

                <h2 className="text-center bg-gradient-to-br from-[rgb(37,177,95)] to-[rgb(21,132,68)] bg-clip-text text-transparent text-4xl font-spaceGrotesk font-extrabold mb-2 tabular-nums">
                    {result.correctCount} / {result.questionsCount}
                </h2>
                <p className="text-center text-sm text-[rgb(103,126,119)] mb-5 tabular-nums">
                    {t("stats.ruleAccuracy", { accuracy })}
                </p>

                {result.maxCombo >= 3 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 mb-5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">
                        🔥 {t("share.bestCombo", { count: result.maxCombo })}
                    </span>
                )}

                <div className="w-full">
                    <p className="text-center text-xs font-semibold text-[rgb(103,126,119)] uppercase tracking-wide mb-2">
                        {t("share.rulesPracticed")}
                    </p>
                    <ul className="flex flex-wrap justify-center gap-2">
                        {result.ruleKeys.map((ruleKey) => (
                            <li
                                key={ruleKey}
                                className="px-3 py-1 rounded-full text-xs font-medium text-[rgb(37,177,95)] bg-green-50 border border-green-100"
                            >
                                {t(`rules.${ruleKey}.title`)}
                            </li>
                        ))}
                    </ul>
                </div>
            </article>

            <Link
                href="/"
                className="mt-6 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-white bg-[rgba(37,177,95,0.95)] transition-transform duration-150 hover:scale-[1.03] active:scale-95"
            >
                {t("share.tryVocabFlow")}
            </Link>
        </main>
    );
}

export default SharedResultView;
