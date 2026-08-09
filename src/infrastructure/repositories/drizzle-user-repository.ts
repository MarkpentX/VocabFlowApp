import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { usersTable } from "@/infrastructure/db/schema/users-table";
import { UserRepository } from "@/domain/repositories/user-repository";
import { User } from "@/domain/entities/user";
import { StreakInfo, StreakUpdateResult } from "@/domain/entities/streak";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function todayUtcString(): string {
    return new Date().toISOString().slice(0, 10);
}

function daysBetween(earlier: string, later: string): number {
    const diff = Date.parse(`${later}T00:00:00Z`) - Date.parse(`${earlier}T00:00:00Z`);
    return Math.round(diff / MS_PER_DAY);
}

function toDomain(row: typeof usersTable.$inferSelect): User {
    return {
        id: row.id,
        name: row.name,
        username: row.username,
        email: row.email,
        passwordHash: row.passwordHash,
        image: row.image,
    };
}

export const drizzleUserRepository: UserRepository = {
    async findByUsername(username: string) {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username));
        return user ? toDomain(user) : null;
    },

    async createWithPassword(username: string, passwordHash: string) {
        const [created] = await db
            .insert(usersTable)
            .values({ username, passwordHash })
            .returning();
        return toDomain(created);
    },

    async findMany(limit: number) {
        const rows = await db.select().from(usersTable).limit(limit);
        return rows.map(toDomain);
    },

    async getStreak(userId: string): Promise<StreakInfo> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
        return {
            currentStreak: user?.currentStreak ?? 0,
            longestStreak: user?.longestStreak ?? 0,
        };
    },

    async recordPracticeCompletion(userId: string): Promise<StreakUpdateResult> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
        if (!user) {
            throw new Error("User not found");
        }

        const today = todayUtcString();
        const previousStreak = user.currentStreak;
        let currentStreak: number;
        let streakIncreased: boolean;

        if (user.lastPracticeDate === today) {
            currentStreak = user.currentStreak;
            streakIncreased = false;
        } else if (user.lastPracticeDate && daysBetween(user.lastPracticeDate, today) === 1) {
            currentStreak = user.currentStreak + 1;
            streakIncreased = true;
        } else {
            currentStreak = 1;
            streakIncreased = true;
        }

        const longestStreak = Math.max(user.longestStreak, currentStreak);

        if (streakIncreased) {
            await db
                .update(usersTable)
                .set({ currentStreak, longestStreak, lastPracticeDate: today })
                .where(eq(usersTable.id, userId));
        }

        return { previousStreak, currentStreak, longestStreak, streakIncreased };
    },
};
