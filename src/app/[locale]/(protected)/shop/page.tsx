import React from 'react';
import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import ShopPage from "@/presentation/components/features/shop/ShopPage";
import { getShopStatusAction } from "@/presentation/actions/shop-actions";
import { getTranslations } from "next-intl/server";

async function Page() {
    const t = await getTranslations("shop");
    const status = await getShopStatusAction();

    return (
        <>
            <HeaderBackArrow title={t("title")} href="/dashboard"/>
            <main className="pb-10">
                <ShopPage
                    initialCoins={status.isSuccess ? status.data.coins : 0}
                    initialOwned={status.isSuccess ? status.data.owned : []}
                />
            </main>
        </>
    );
}

export default Page;
