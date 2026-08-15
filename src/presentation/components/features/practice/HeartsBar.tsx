"use client";

import React from "react";
import { motion } from "framer-motion";
import { MAX_HEARTS } from "@/presentation/hooks/use-practice-session";

interface HeartsBarProps {
    hearts: number;
    maxHearts?: number;
}

function HeartsBar({ hearts, maxHearts = MAX_HEARTS }: HeartsBarProps) {
    return (
        <div
            className="flex items-center justify-center gap-2.5 mx-auto w-fit px-4 py-2 mb-6 rounded-full bg-[rgb(248,249,245)] border border-[rgb(226,229,220)]"
            aria-label={`${hearts}/${maxHearts}`}
        >
            {Array.from({ length: maxHearts }, (_, i) => {
                const filled = i < hearts;
                return (
                    <motion.span
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: filled ? [0, 1.25, 1] : [1, 1.35, 0.85, 1],
                            opacity: 1,
                            rotate: filled ? 0 : [0, -14, 12, -6, 0],
                        }}
                        transition={{
                            duration: filled ? 0.4 : 0.5,
                            delay: filled ? i * 0.08 : 0,
                            ease: "easeOut",
                        }}
                        style={{
                            fontSize: 22,
                            lineHeight: 1,
                            filter: filled
                                ? "drop-shadow(0 2px 5px rgba(255,59,48,0.5))"
                                : "grayscale(1) opacity(0.45)",
                        }}
                        className="select-none"
                    >
                        ❤️
                    </motion.span>
                );
            })}
        </div>
    );
}

export default HeartsBar;
