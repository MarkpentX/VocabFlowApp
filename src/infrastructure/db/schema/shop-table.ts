import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "@/infrastructure/db/schema/users-table";

export const shopPurchasesTable = pgTable(
    "shop_purchases",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        userId: text("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        itemKey: text("item_key").notNull(),
        purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
    },
    (table) => [uniqueIndex("shop_purchases_user_item_idx").on(table.userId, table.itemKey)]
);
