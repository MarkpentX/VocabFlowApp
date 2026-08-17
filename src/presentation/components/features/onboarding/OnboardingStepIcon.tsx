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
        <div className="flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
            <DotLottieReact src={LOTTIE_SRC[kind]} loop autoplay className="w-full h-full" />
        </div>
    );
}

export default OnboardingStepIcon;
