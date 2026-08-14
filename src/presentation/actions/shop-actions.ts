"use server";

import { getShopStatus, purchaseItem } from "@/infrastructure/container";
import { getSessionUser } from "@/infrastructure/auth/session";
import { ControllerResult } from "@/application/shared/controller-result";
import { handleActionError, handleActionSuccess } from "@/application/shared/action-result";
import { ShopItemKey, ShopStatus, PurchaseResult } from "@/domain/entities/shop";

export async function getShopStatusAction(): Promise<ControllerResult<ShopStatus>> {
    try {
        const user = await getSessionUser();
        const result = await getShopStatus(user.id);
        return handleActionSuccess(result);
    } catch (error) {
        return handleActionError(error);
    }
}

export async function purchaseItemAction(itemKey: ShopItemKey): Promise<ControllerResult<PurchaseResult>> {
    try {
        const user = await getSessionUser();
        const result = await purchaseItem(user.id, itemKey);
        return handleActionSuccess(result);
    } catch (error) {
        return handleActionError(error);
    }
}
