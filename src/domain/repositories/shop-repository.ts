import { ShopItemKey, PurchaseResult } from "@/domain/entities/shop";

export interface ShopRepository {
    getOwnedItems(userId: string): Promise<ShopItemKey[]>;
    purchaseItem(userId: string, itemKey: ShopItemKey, price: number): Promise<PurchaseResult>;
}
