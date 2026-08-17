"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CoinIcon from "@/presentation/components/features/dashboard/CoinIcon";

export type OnboardingStepKind = "learn" | "words" | "grammar" | "aiTest" | "coins";

const GRADIENTS: Record<Exclude<OnboardingStepKind, "learn">, string> = {
    words: "from-sky-400 to-blue-500",
    grammar: "from-teal-400 to-emerald-500",
    aiTest: "from-fuchsia-500 to-purple-600",
    coins: "from-amber-300 to-yellow-500",
};

interface OnboardingStepIconProps {
    kind: OnboardingStepKind;
}

function OnboardingStepIcon({ kind }: OnboardingStepIconProps) {
    if (kind === "learn") {
        return (
            <div className="flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
                <DotLottieReact src="/studyingAnim.lottie" loop autoplay className="w-full h-full" />
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
            <motion.div
                aria-hidden
                className={`absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${GRADIENTS[kind]} blur-2xl opacity-40`}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className={`relative flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${GRADIENTS[kind]} shadow-lg`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
                {kind === "words" && <Image src="/book.svg" alt="" width={44} height={44} className="brightness-0 invert" />}

                {kind === "aiTest" && <Image src="/brain.svg" alt="" width={44} height={44} className="brightness-0 invert" />}

                {kind === "grammar" && (
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12.5 11.2 14.7 15 10" />
                    </svg>
                )}

                {kind === "coins" && <CoinIcon size={56} />}
            </motion.div>

            {kind === "coins" && (
                <>
                    <motion.span
                        aria-hidden
                        className="absolute top-2 right-8 text-xl"
                        animate={{ y: [0, -8, 0], opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    >
                        ✨
                    </motion.span>
                    <motion.span
                        aria-hidden
                        className="absolute bottom-8 left-6 text-lg"
                        animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}
                    >
                        ✨
                    </motion.span>
                </>
            )}
        </div>
    );
}

export default OnboardingStepIcon;
