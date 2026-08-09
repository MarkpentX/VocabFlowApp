import { User } from "@/domain/entities/user";
import { StreakInfo, StreakUpdateResult } from "@/domain/entities/streak";

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    createWithPassword(username: string, passwordHash: string): Promise<User>;
    findMany(limit: number): Promise<User[]>;
    getStreak(userId: string): Promise<StreakInfo>;
    recordPracticeCompletion(userId: string): Promise<StreakUpdateResult>;
}
