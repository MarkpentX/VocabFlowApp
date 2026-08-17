"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DIAGNOSTIC_LEVELS, DiagnosticLevel } from "@/domain/entities/grammar-diagnostic";
import FeatureDuck from "@/presentation/components/features/practice/FeatureDuck";

interface GrammarDiagnosticStartProps {
    onStart: (level: DiagnosticLevel) => void;
    pending: boolean;
}

function GrammarDiagnosticStart({ onStart, pending }: GrammarDiagnosticStartProps) {
    const t = useTranslations("grammar");
    const [level, setLevel] = useState<DiagnosticLevel | null>(null);

    return (
        <div className="max-w-md mx-auto w-full">
            <div className="flex justify-center mb-2">
                <FeatureDuck src="/ai_duck.lottie" size={128} />
            </div>

            <p className="text-center text-[rgb(103,126,119)] font-dMSans text-sm mb-1">
                {t("diagnostic.dontKnowLevel")}
            </p>
            <Link
                href="/level-test"
                className="block text-center text-sm font-semibold text-[rgb(37,177,95)] hover:text-[rgb(21,132,68)] transition-colors mb-6"
            >
                {t("diagnostic.findOutLevel")} →
            </Link>

            <h2 className="text-center font-spaceGrotesk font-bold text-lg mb-1">{t("diagnostic.pickLevel")}</h2>
            <p className="text-center text-xs text-[rgb(103,126,119)] mb-5">{t("diagnostic.pickLevelHint")}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
                {DIAGNOSTIC_LEVELS.map((option) => {
                    const isSelected = level === option;
                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setLevel(option)}
                            className={
                                isSelected
                                    ? "flex items-center justify-center py-4 rounded-xl border-2 border-violet-500 bg-violet-50 font-spaceGrotesk font-bold text-lg text-violet-700 transition"
                                    : "flex items-center justify-center py-4 rounded-xl border border-[rgb(226,229,220)] bg-white font-spaceGrotesk font-bold text-lg text-[rgb(18,33,28)] hover:bg-gray-50 transition"
                            }
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                disabled={!level || pending}
                onClick={() => level && onStart(level)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white bg-gradient-to-br from-violet-500 to-fuchsia-600 cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
                {t("diagnostic.start")}
            </button>
        </div>
    );
}

export default GrammarDiagnosticStart;
