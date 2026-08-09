"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#FF5B1F", "#FFD23F", "#25B15F", "#4C9AFF", "#FF6FA8"];
const PIECE_COUNT = 28;

interface Piece {
    id: number;
    left: number;
    color: string;
    delay: number;
    duration: number;
    rotate: number;
    drift: number;
}

function generatePieces(): Piece[] {
    return Array.from({ length: PIECE_COUNT }, (_, id) => ({
        id,
        left: Math.random() * 100,
        color: COLORS[id % COLORS.length],
        delay: Math.random() * 0.3,
        duration: 1.6 + Math.random() * 0.9,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 80,
    }));
}

function ConfettiEffect() {
    // useState's lazy initializer is the sanctioned spot for one-time impure setup:
    // it runs exactly once per mount, never again on re-render.
    const [pieces] = useState<Piece[]>(generatePieces);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
            {pieces.map((piece) => (
                <motion.span
                    key={piece.id}
                    initial={{ y: "-10vh", x: 0, opacity: 1, rotate: 0 }}
                    animate={{ y: "110vh", x: piece.drift, opacity: [1, 1, 0], rotate: piece.rotate }}
                    transition={{ duration: piece.duration, delay: piece.delay, ease: "easeIn" }}
                    style={{
                        position: "absolute",
                        left: `${piece.left}%`,
                        width: 8,
                        height: 12,
                        backgroundColor: piece.color,
                        borderRadius: 2,
                    }}
                />
            ))}
        </div>
    );
}

export default ConfettiEffect;
