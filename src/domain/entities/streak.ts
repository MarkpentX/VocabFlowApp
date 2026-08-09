export interface StreakInfo {
    currentStreak: number;
    longestStreak: number;
}

export interface StreakUpdateResult extends StreakInfo {
    previousStreak: number;
    streakIncreased: boolean;
}
