"use client";

import React, { useRef } from "react";
import Link from "next/link";

function StartLearning() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }

        // вибрация (Android)
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
            navigator.vibrate(30);
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/computer-mouse-click.mp3"
                preload="auto"
            />

            <Link
                href="/auth"
                onClick={playSound}
                className="animate-[fadeInUp_0.6s_ease-out_forwards] justify-center items-center gap-1 bg-[rgb(37,177,95)] inline-flex py-2.5 px-8 rounded-xl text-white font-spaceGrotesk hover:bg-[rgba(37,177,95,0.9)] transition-colors duration-200"
            >
                Start Learning
            </Link>
        </>
    );
}

export default StartLearning;