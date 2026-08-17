"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface CoinLottieProps {
    size?: number;
}

function CoinLottie({ size = 32 }: CoinLottieProps) {
    return (
        <span style={{ width: size, height: size }} className="inline-flex shrink-0">
            <DotLottieReact src="/coin.lottie" loop autoplay className="w-full h-full" />
        </span>
    );
}

export default CoinLottie;
