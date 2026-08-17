"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import OnboardingStepIcon, { OnboardingStepKind } from "@/presentation/components/features/onboarding/OnboardingStepIcon";
import { completeOnboardingAction } from "@/presentation/actions/onboarding-actions";

const STEPS: OnboardingStepKind[] = ["learn", "words", "grammar", "aiTest", "coins"];

function OnboardingFlow() {
    const t = useTranslations("onboarding");
    const [visible, setVisible] = useState(true);
    const [step, setStep] = useState(0);

    const isLast = step === STEPS.length - 1;

    function finish() {
        setVisible(false);
        void completeOnboardingAction();
    }

    function handleNext() {
        if (isLast) {
            finish();
            return;
        }
        setStep((current) => current + 1);
    }

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[rgb(255,255,255)]">
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
        </div>
    );
}

export default OnboardingFlow;
