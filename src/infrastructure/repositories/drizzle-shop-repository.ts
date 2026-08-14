import { and, eq, sql } from "drizzle-orm";
import { db } from "@/infrastructure/db/client";
import { usersTable } from "@/infrastructure/db/schema/users-table";
import { shopPurchasesTable } from "@/infrastructure/db/schema/shop-table";
import { ShopRepository } from "@/domain/repositories/shop-repository";
import { ShopItemKey, PurchaseResult } from "@/domain/entities/shop";

export const drizzleShopRepository: ShopRepository = {
    async getOwnedItems(userId: string): Promise<ShopItemKey[]> {
        const rows = await db
            .select({ itemKey: shopPurchasesTable.itemKey })
            .from(shopPurchasesTable)
            .where(eq(shopPurchasesTable.userId, userId));
        return rows.map((row) => row.itemKey as ShopItemKey);
    },

    async purchaseItem(userId: string, itemKey: ShopItemKey, price: number): Promise<PurchaseResult> {
        const [existing] = await db
            .select({ itemKey: shopPurchasesTable.itemKey })
            .from(shopPurchasesTable)
            .where(and(eq(shopPurchasesTable.userId, userId), eq(shopPurchasesTable.itemKey, itemKey)));

        if (existing) {
            const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
            return { success: true, coins: user?.coins ?? 0 };
        }

        const [charged] = await db
            .update(usersTable)
            .set({ coins: sql`${usersTable.coins} - ${price}` })
            .where(and(eq(usersTable.id, userId), sql`${usersTable.coins} >= ${price}`))
            .returning({ coins: usersTable.coins });

        if (!charged) {
            const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
            return { success: false, coins: user?.coins ?? 0 };
        }

        await db.insert(shopPurchasesTable).values({ userId, itemKey }).onConflictDoNothing();

        return { success: true, coins: charged.coins };
    },
};
