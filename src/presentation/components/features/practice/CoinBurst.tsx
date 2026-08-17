"use client";

import React from "react";
import { motion } from "framer-motion";

interface CoinBurstProps {
    amount: number;
}

function CoinBurst({ amount }: CoinBurstProps) {
    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible" aria-hidden="true">
            <motion.span
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{ y: -46, opacity: [0, 1, 1, 0], scale: [0.5, 1.15, 1, 1] }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                className="absolute font-spaceGrotesk font-extrabold text-2xl bg-gradient-to-br from-[#FFC93D] to-[#E8991A] bg-clip-text text-transparent"
            >
                +{amount}
            </motion.span>
        </div>
    );
}

export default CoinBurst;
