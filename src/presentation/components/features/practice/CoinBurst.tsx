"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const PIECE_COUNT = 16;

interface Piece {
    id: number;
    angle: number;
    distance: number;
    delay: number;
    duration: number;
}

function generatePieces(): Piece[] {
    return Array.from({ length: PIECE_COUNT }, (_, id) => ({
        id,
        angle: (id / PIECE_COUNT) * Math.PI * 2 + Math.random() * 0.4,
        distance: 60 + Math.random() * 50,
        delay: Math.random() * 0.15,
        duration: 0.9 + Math.random() * 0.5,
    }));
}

interface CoinBurstProps {
    amount: number;
}

function CoinBurst({ amount }: CoinBurstProps) {
    const [pieces] = useState<Piece[]>(generatePieces);

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible" aria-hidden="true">
            {pieces.map((piece) => (
                <motion.span
                    key={piece.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                    animate={{
                        x: Math.cos(piece.angle) * piece.distance,
                        y: Math.sin(piece.angle) * piece.distance - 20,
                        opacity: [1, 1, 0],
                        scale: [0.6, 1, 0.8],
                        rotate: 180,
                    }}
                    transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
                    style={{ position: "absolute", fontSize: 18 }}
                >
                    🪙
                </motion.span>
            ))}

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
