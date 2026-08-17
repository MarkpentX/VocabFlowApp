"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export type OnboardingStepKind = "learn" | "words" | "grammar" | "aiTest" | "coins";

const LOTTIE_SRC: Record<OnboardingStepKind, string> = {
    learn: "/duck_looking_for.lottie",
    words: "/duck_with_kids.lottie",
    grammar: "/duck_inside.lottie",
    aiTest: "/ai_duck.lottie",
    coins: "/money_duck.lottie",
};

interface OnboardingStepIconProps {
    kind: OnboardingStepKind;
}

function OnboardingStepIcon({ kind }: OnboardingStepIconProps) {
    return (
        <div className="flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
            <DotLottieReact src={LOTTIE_SRC[kind]} loop autoplay className="w-full h-full" />
        </div>
    );
}

export default OnboardingStepIcon;
