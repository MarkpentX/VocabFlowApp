"use client";

import React, { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import OnboardingStepIcon, { OnboardingStepKind } from "@/presentation/components/features/onboarding/OnboardingStepIcon";
import { completeOnboardingAction } from "@/presentation/actions/onboarding-actions";

const STEPS: OnboardingStepKind[] = ["learn", "words", "grammar", "aiTest", "coins"];

const LOCALE_META: Record<string, { label: string; flag: string }> = {
    en: { label: "English", flag: "🇬🇧" },
    ru: { label: "Русский", flag: "🇷🇺" },
    uk: { label: "Українська", flag: "🇺🇦" },
};

// Survives the locale-switch navigation (which remounts this component) so we
// don't ask for a language a second time once the user has already picked one.
const LANG_PICKED_KEY = "onboarding-language-picked";

type Phase = "language" | "steps";

function subscribeToNothing() {
    return () => {};
}

function getLanguagePickedSnapshot(): boolean {
    return localStorage.getItem(LANG_PICKED_KEY) === "1";
}

function getLanguagePickedServerSnapshot(): boolean {
    return false;
}

function OnboardingFlow() {
    const t = useTranslations("onboarding");
    const router = useRouter();
    const pathname = usePathname();

    // useSyncExternalStore (not a plain effect) so the server-rendered "language"
    // phase and the client's first hydration pass agree, then it syncs to the
    // real localStorage value right after — no manual setState-in-effect needed.
    const languageAlreadyPicked = useSyncExternalStore(
        subscribeToNothing,
        getLanguagePickedSnapshot,
        getLanguagePickedServerSnapshot
    );
    const [manuallyAdvanced, setManuallyAdvanced] = useState(false);
    const phase: Phase = languageAlreadyPicked || manuallyAdvanced ? "steps" : "language";

    const [visible, setVisible] = useState(true);
    const [step, setStep] = useState(0);

    const isLast = step === STEPS.length - 1;

    function finish() {
        setVisible(false);
        localStorage.removeItem(LANG_PICKED_KEY);
        void completeOnboardingAction();
    }

    function handleNext() {
        if (isLast) {
            finish();
            return;
        }
        setStep((current) => current + 1);
    }

    function pickLanguage(locale: string) {
        localStorage.setItem(LANG_PICKED_KEY, "1");
        // Handles both outcomes of the navigation below: if the locale actually
        // changes, this component remounts and useSyncExternalStore re-derives
        // "steps" from localStorage; if the user re-picks the current locale (no
        // real navigation happens), this direct state flip is what advances it.
        setManuallyAdvanced(true);
        router.replace(pathname, { locale });
    }

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[rgb(255,255,255)]">
            {phase === "language" ? (
                <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-8">
                    <div>
                        <p className="font-spaceGrotesk font-bold text-2xl text-[rgb(18,33,28)] mb-1">Choose your language</p>
                        <p className="font-spaceGrotesk font-semibold text-base text-[rgb(103,126,119)]">Выберите язык · Оберіть мову</p>
                    </div>

                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        {routing.locales.map((locale) => (
                            <button
                                key={locale}
                                type="button"
                                onClick={() => pickLanguage(locale)}
                                className="flex items-center gap-3 px-5 py-4 rounded-xl border border-[rgb(226,229,220)] bg-white text-left font-dMSans font-semibold text-[rgb(18,33,28)] cursor-pointer transition-all duration-150 hover:border-[rgb(37,177,95)] hover:bg-[rgba(37,177,95,0.05)] active:scale-[0.98]"
                            >
                                <span className="text-2xl">{LOCALE_META[locale].flag}</span>
                                {LOCALE_META[locale].label}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-end px-6 pt-6">
                        <button
                            type="button"
                            onClick={finish}
                            className="text-sm text-[rgb(103,126,119)] font-dMSans cursor-pointer hover:text-[rgb(18,33,28)] transition-colors"
                        >
                            {t("skip")}
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 28 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -28 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="flex flex-col items-center"
                            >
                                <OnboardingStepIcon kind={STEPS[step]} />
                                <p className="mt-8 max-w-xs font-spaceGrotesk font-bold text-xl text-[rgb(18,33,28)] leading-snug">
                                    {t(`steps.${STEPS[step]}`)}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="px-8 pb-10 max-w-md w-full mx-auto">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-dMSans text-[rgb(103,126,119)] tabular-nums">
                                {t("stepOf", { current: step + 1, total: STEPS.length })}
                            </span>
                        </div>

                        <div className="h-1.5 w-full rounded-full bg-[rgb(236,239,231)] overflow-hidden mb-6">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
                                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-white font-dMSans font-semibold bg-[rgba(37,177,95,0.95)] cursor-pointer transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]"
                        >
                            {isLast ? t("getStarted") : t("next")}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default OnboardingFlow;
