"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface FeatureDuckProps {
    src: string;
    size?: number;
    className?: string;
}

// Generic wrapper for the app's mascot-duck Lottie files, reused across the
// handful of real features they represent (not just the one-time onboarding).
// `size` sets fixed pixel dimensions; omit it and size purely via `className`
// (e.g. responsive w-*/h-* utilities) instead.
function FeatureDuck({ src, size, className = "" }: FeatureDuckProps) {
    return (
        <span
            style={size ? { width: size, height: size } : undefined}
            className={`inline-flex shrink-0 ${className}`}
            aria-hidden
        >
            <DotLottieReact src={src} loop autoplay className="w-full h-full" />
        </span>
    );
}

export default FeatureDuck;
