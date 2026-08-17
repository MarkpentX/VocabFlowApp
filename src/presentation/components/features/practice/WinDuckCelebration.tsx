"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Shown whenever a test/practice round ends with a majority of correct
// answers — the app's one shared "you did well" celebration, used sparingly
// (a handful of result screens, not every interaction).
function WinDuckCelebration() {
    return (
        <motion.div
            aria-hidden
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="flex justify-center w-32 h-32 -mt-4 mb-1"
        >
            <DotLottieReact src="/duck_win.lottie" autoplay loop={false} className="w-full h-full" />
        </motion.div>
    );
}

export default WinDuckCelebration;
