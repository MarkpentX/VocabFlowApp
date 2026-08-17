import { User } from "@/domain/entities/user";
import { StreakInfo, StreakUpdateResult } from "@/domain/entities/streak";
import { CoinsInfo, PracticeCoinsAward } from "@/domain/entities/coins";

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    createWithPassword(username: string, passwordHash: string): Promise<User>;
    findMany(limit: number): Promise<User[]>;
    getStreak(userId: string): Promise<StreakInfo>;
    recordPracticeCompletion(userId: string): Promise<StreakUpdateResult>;
    getCoins(userId: string): Promise<CoinsInfo>;
    awardCoins(userId: string, amount: number): Promise<PracticeCoinsAward>;
    isNewUser(userId: string): Promise<boolean>;
    markOnboardingComplete(userId: string): Promise<void>;
}
