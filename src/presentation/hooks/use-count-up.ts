"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, durationMs = 900, initialValue?: number): number {
    const [value, setValue] = useState(initialValue ?? target);
    const fromRef = useRef(initialValue ?? target);

    useEffect(() => {
        const from = fromRef.current;
        if (from === target) {
            return;
        }

        const start = performance.now();
        let raf: number;

        function tick(now: number) {
            const progress = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(from + (target - from) * eased));
            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                fromRef.current = target;
            }
        }

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, durationMs]);

    return value;
}
