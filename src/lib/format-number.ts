// Keeps large counters (coins, streaks, etc.) short and overflow-safe on narrow
// screens — e.g. 2000 -> "2K", 12345 -> "12.3K" — instead of letting a growing
// digit count push past its fixed-width badge on mobile.
export function formatCompactCount(value: number): string {
    if (Math.abs(value) < 1000) {
        return String(value);
    }
    return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}
