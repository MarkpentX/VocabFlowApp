import { UserRepository } from "@/domain/repositories/user-repository";
import { ShopRepository } from "@/domain/repositories/shop-repository";
import { errors } from "@/domain/errors/factory";
import { ShopStatus } from "@/domain/entities/shop";

export interface GetShopStatusDeps {
    userRepository: UserRepository;
    shopRepository: ShopRepository;
}

export function createGetShopStatusUseCase({ userRepository, shopRepository }: GetShopStatusDeps) {
    return async function getShopStatus(userId: string): Promise<ShopStatus> {
        try {
            const [{ coins }, owned] = await Promise.all([
                userRepository.getCoins(userId),
                shopRepository.getOwnedItems(userId),
            ]);
            return { coins, owned };
        } catch {
            throw errors.db();
        }
    };
}
