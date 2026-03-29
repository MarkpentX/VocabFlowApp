"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                width: "2rem",           // размер с p-3 (~48px)
                height: "2rem",
                borderRadius: "50%",      // полностью круглый
                border: "2px solid rgb(37,177,95)",  // только рамка зеленая
                background: "transparent", // прозрачный фон
                pointerEvents: "none",    // чтобы не блокировал клики
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
            }}
        />
    );
}