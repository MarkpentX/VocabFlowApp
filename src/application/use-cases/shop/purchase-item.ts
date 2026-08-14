import { ShopRepository } from "@/domain/repositories/shop-repository";
import { errors } from "@/domain/errors/factory";
import { PurchaseResult, SHOP_CATALOG, ShopItemKey } from "@/domain/entities/shop";

export function createPurchaseItemUseCase(shopRepository: ShopRepository) {
    return async function purchaseItem(userId: string, itemKey: ShopItemKey): Promise<PurchaseResult> {
        const item = SHOP_CATALOG[itemKey];
        if (!item) {
            throw errors.notFound("Unknown shop item");
        }

        try {
            return await shopRepository.purchaseItem(userId, itemKey, item.price);
        } catch {
            throw errors.db();
        }
    };
}
