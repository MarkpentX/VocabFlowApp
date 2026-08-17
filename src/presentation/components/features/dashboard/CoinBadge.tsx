"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCountUp } from "@/presentation/hooks/use-count-up";
import CoinLottie from "@/presentation/components/features/dashboard/CoinLottie";
import { formatCompactCount } from "@/lib/format-number";

interface CoinBadgeProps {
    coins: number;
    size?: number;
    showLabel?: boolean;
}

function CoinBadge({ coins, size = 64, showLabel = true }: CoinBadgeProps) {
    const t = useTranslations("dashboard.coins");
    const [prevCoins, setPrevCoins] = useState(coins);
    const [bump, setBump] = useState(false);
    const displayedCoins = useCountUp(coins, 900);

    if (coins !== prevCoins) {
        setPrevCoins(coins);
        setBump(coins > prevCoins);
    }

    useEffect(() => {
        if (!bump) {
            return;
        }
        const timeout = setTimeout(() => setBump(false), 650);
        return () => clearTimeout(timeout);
    }, [bump]);

    return (
        <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
                <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(255,201,61,0.55) 0%, rgba(255,180,20,0.2) 50%, transparent 75%)",
                        filter: "blur(8px)",
                    }}
                    animate={
                        bump
                            ? { opacity: [0.4, 1, 0.5], scale: [0.9, 1.35, 1] }
                            : { opacity: [0.35, 0.6, 0.35], scale: [0.92, 1.02, 0.92] }
                    }
                    transition={bump ? { duration: 0.65, ease: "easeOut" } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    animate={
                        bump
                            ? { scale: [1, 1.35, 0.9, 1.1, 1], rotate: [0, -12, 10, -4, 0], y: 0 }
                            : { scale: 1, rotate: 0, y: [0, -2, 0] }
                    }
                    transition={
                        bump
                            ? { duration: 0.65, ease: "easeOut" }
                            : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="relative flex items-center justify-center"
                >
                    <CoinLottie size={size * 0.72} />
                </motion.div>
            </div>

            <div className="flex flex-col leading-tight min-w-0">
                <span
                    className="block truncate font-spaceGrotesk font-extrabold tabular-nums bg-gradient-to-br from-[#FFD75E] via-[#FFC220] to-[#E8901A] bg-clip-text text-transparent drop-shadow-sm"
                    style={{ fontSize: size * 0.4 }}
                >
                    {formatCompactCount(displayedCoins)}
                </span>
                {showLabel && <span className="text-xs text-[rgb(103,126,119)] font-medium truncate">{t("label")}</span>}
            </div>
        </div>
    );
}

export default CoinBadge;
