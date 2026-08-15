"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/presentation/hooks/use-count-up";
import FireIcon from "@/presentation/components/features/dashboard/FireIcon";

interface StreakBadgeProps {
    currentStreak: number;
    previousStreak?: number;
    streakIncreased?: boolean;
    size?: number;
}

type Phase = "idle" | "igniting" | "lit";

const flameVariants: Variants = {
    idle: {
        scale: 1,
        rotate: 0,
        opacity: 0.5,
        filter: "grayscale(1) brightness(0.85)",
        transition: { duration: 0.4 },
    },
    igniting: {
        scale: [0.55, 1.32, 0.88, 1.1, 1],
        rotate: [0, -12, 9, -4, 0],
        opacity: 1,
        filter: [
            "grayscale(1) brightness(0.85)",
            "grayscale(0) brightness(1.2)",
            "grayscale(0) brightness(1.1)",
            "grayscale(0) brightness(1)",
            "grayscale(0) brightness(1)",
        ],
        transition: { duration: 0.9, times: [0, 0.35, 0.6, 0.82, 1], ease: "easeOut" },
    },
    lit: {
        scale: [1, 1.07, 1, 1.04, 1],
        rotate: [0, -3, 2, -2, 0],
        opacity: 1,
        filter: "grayscale(0) brightness(1)",
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
};

const glowVariants: Variants = {
    idle: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
    igniting: { opacity: [0, 1, 0.85], scale: [0.7, 1.2, 1], transition: { duration: 0.9, ease: "easeOut" } },
    lit: { opacity: [0.65, 1, 0.65], scale: [0.95, 1.15, 0.95], transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } },
};

function StreakBadge({ currentStreak, previousStreak, streakIncreased = false, size = 64 }: StreakBadgeProps) {
    const t = useTranslations("dashboard.streak");
    // StreakBadge is always freshly mounted (either a new page load, or a fresh render branch
    // once a practice session finishes), so the initial phase never needs to react to prop changes.
    const [phase, setPhase] = useState<Phase>(currentStreak === 0 ? "idle" : streakIncreased ? "igniting" : "lit");

    const displayedStreak = useCountUp(
        currentStreak,
        900,
        streakIncreased && previousStreak !== undefined ? previousStreak : currentStreak
    );

    return (
        <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
                <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,160,40,0.7) 0%, rgba(255,80,30,0.35) 45%, transparent 75%)",
                        filter: "blur(9px)",
                    }}
                    variants={glowVariants}
                    animate={phase}
                />

                {phase === "igniting" && (
                    <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: "rgba(255,140,40,0.8)" }}
                        initial={{ scale: 0.4, opacity: 0.9 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                )}

                <motion.span
                    variants={flameVariants}
                    animate={phase}
                    onAnimationComplete={() => {
                        if (phase === "igniting") {
                            setPhase("lit");
                        }
                    }}
                    style={{ display: "flex" }}
                    className="select-none"
                >
                    <FireIcon size={size * 0.72} active={phase !== "idle"} />
                </motion.span>
            </div>

            <div className="flex flex-col leading-tight min-w-0">
                <span
                    className={cn(
                        "font-spaceGrotesk font-extrabold tabular-nums",
                        phase === "idle"
                            ? "text-[rgb(180,186,180)]"
                            : "bg-gradient-to-br from-[#FFB23D] via-[#FF7A1F] to-[#FF3D3D] bg-clip-text text-transparent drop-shadow-sm"
                    )}
                    style={{ fontSize: size * 0.4 }}
                >
                    {displayedStreak}
                </span>
                <span className="text-xs text-[rgb(103,126,119)] font-medium truncate">
                    {t("daysLabel", { count: displayedStreak })}
                </span>
            </div>
        </div>
    );
}

export default StreakBadge;
