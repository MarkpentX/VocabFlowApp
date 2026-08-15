export const SHOP_ITEM_KEYS = ["customExam", "levelTest"] as const;

export type ShopItemKey = (typeof SHOP_ITEM_KEYS)[number];

export interface ShopCatalogItem {
    key: ShopItemKey;
    price: number;
}

export const SHOP_CATALOG: Record<ShopItemKey, ShopCatalogItem> = {
    customExam: { key: "customExam", price: 149 },
    levelTest: { key: "levelTest", price: 99 },
};

export interface Purchase {
    itemKey: ShopItemKey;
    purchasedAt: Date;
}

export interface PurchaseResult {
    success: boolean;
    coins: number;
}

export interface ShopStatus {
    coins: number;
    owned: ShopItemKey[];
}
