"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FireIconProps {
    size?: number;
    active?: boolean;
}

const OUTER_FLAME = [
    "M32 4C24 16 14 24 14 38C14 51.25 21.85 60 32 60C42.15 60 50 51.25 50 38C50 30 46 24 42 18C41.5 26 38 30 35 31C36 22 34 12 32 4Z",
    "M32 6C22 17 13 26 13 39C13 51.8 22.4 60 32 60C41.9 60 51 51.8 51 39C51 29 45 22 40 17C42 25 37 31 34 32C36 21 35 13 32 6Z",
];

const MID_FLAME = [
    "M32 16C26 25 20 30 20 40C20 48.8 25.6 55 32 55C38.4 55 44 48.8 44 40C44 34 41 30 38 26C37.6 32 35 34 33 35C34 28 33 21 32 16Z",
    "M32 18C25 24 19 31 19 41C19 49.4 25 55 32 55C39.3 55 45 49.4 45 41C45 33.6 40.8 29 37 25C38 31.5 34.7 34 32.7 35C34 27.5 34.6 22 32 18Z",
];

const CORE_FLAME = [
    "M32 27C28.5 32.5 26 35.5 26 41.5C26 46.7 28.7 50 32 50C35.3 50 38 46.7 38 41.5C38 37.5 36 34.5 34 31.5C33.8 35 32.5 36.5 31.5 37C32.3 33.5 33 30 32 27Z",
    "M32 28.5C29 33 26.5 36 26.5 41.5C26.5 46.4 29 50 32 50C35.2 50 37.5 46.4 37.5 41.5C37.5 38 35.7 35 33.7 32C33.9 34.8 32.9 36 32.2 36.6C32.7 33.4 32.9 31 32 28.5Z",
];

function Ember({ delay, left }: { delay: number; left: number }) {
    return (
        <motion.circle
            cx={left}
            cy={48}
            r={1.7}
            fill="#FFE066"
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0], y: -38, x: [0, (left - 32) * 0.7], scale: [0.6, 1.1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 2px #FFB23D)" }}
        />
    );
}

function FireIcon({ size = 40, active = true }: FireIconProps) {
    const [emberSeed] = useState(() => [
        { left: 24, delay: 0 },
        { left: 32, delay: 0.6 },
        { left: 40, delay: 1.1 },
    ]);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <defs>
                <linearGradient id="fireOuterGradient" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF2E2E" />
                    <stop offset="50%" stopColor="#FF7A1F" />
                    <stop offset="100%" stopColor="#FFAE42" />
                </linearGradient>
                <linearGradient id="fireMidGradient" x1="32" y1="16" x2="32" y2="55" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFA724" />
                    <stop offset="100%" stopColor="#FFDE59" />
                </linearGradient>
                <linearGradient id="fireCoreGradient" x1="32" y1="27" x2="32" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFDF0" />
                    <stop offset="100%" stopColor="#FFEB8A" />
                </linearGradient>
                <radialGradient id="fireGlow" cx="50%" cy="60%" r="55%">
                    <stop offset="0%" stopColor="#FF8A1F" stopOpacity="0.65" />
                    <stop offset="60%" stopColor="#FF5B1F" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FF5B1F" stopOpacity="0" />
                </radialGradient>
            </defs>

            {active && (
                <motion.circle
                    cx="32"
                    cy="34"
                    r="26"
                    fill="url(#fireGlow)"
                    animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.08, 0.95] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: "blur(2px)" }}
                />
            )}

            {active && (
                <g>
                    <Ember delay={emberSeed[0].delay} left={emberSeed[0].left} />
                    <Ember delay={emberSeed[1].delay} left={emberSeed[1].left} />
                    <Ember delay={emberSeed[2].delay} left={emberSeed[2].left} />
                </g>
            )}

            <motion.path
                fill="url(#fireOuterGradient)"
                initial={false}
                animate={{ d: active ? OUTER_FLAME : OUTER_FLAME[0] }}
                transition={{ duration: 1.15, repeat: active ? Infinity : 0, repeatType: "mirror", ease: "easeInOut" }}
            />
            <motion.path
                fill="url(#fireMidGradient)"
                initial={false}
                animate={{ d: active ? MID_FLAME : MID_FLAME[0] }}
                transition={{ duration: 0.9, repeat: active ? Infinity : 0, repeatType: "mirror", ease: "easeInOut" }}
            />
            <motion.path
                fill="url(#fireCoreGradient)"
                initial={false}
                animate={{ d: active ? CORE_FLAME : CORE_FLAME[0] }}
                transition={{ duration: 0.7, repeat: active ? Infinity : 0, repeatType: "mirror", ease: "easeInOut" }}
            />
        </svg>
    );
}

export default FireIcon;
