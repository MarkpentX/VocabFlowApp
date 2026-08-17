"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface FireLottieProps {
    size?: number;
    active?: boolean;
}

function FireLottie({ size = 40, active = true }: FireLottieProps) {
    return (
        <span
            style={{
                width: size,
                height: size,
                filter: active ? "none" : "grayscale(1) brightness(0.85)",
                opacity: active ? 1 : 0.5,
                transition: "filter 0.4s ease-out, opacity 0.4s ease-out",
            }}
            className="inline-flex shrink-0"
        >
            <DotLottieReact src="/fier.lottie" loop autoplay={active} className="w-full h-full" />
        </span>
    );
}

export default FireLottie;
