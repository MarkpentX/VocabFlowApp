"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CoinBadge from "@/presentation/components/features/dashboard/CoinBadge";
import ShopItemCard from "@/presentation/components/features/shop/ShopItemCard";
import { SHOP_CATALOG, ShopItemKey } from "@/domain/entities/shop";

interface ShopPageProps {
    initialCoins: number;
    initialOwned: ShopItemKey[];
}

const ITEM_IMAGES: Record<ShopItemKey, string> = {
    customExam: "/exam.svg",
    levelTest: "/brain.svg",
};

const ITEM_OPEN_HREFS: Record<ShopItemKey, string> = {
    customExam: "/exam",
    levelTest: "/level-test",
};

function ShopPage({ initialCoins, initialOwned }: ShopPageProps) {
    const t = useTranslations("shop");
    const [coins, setCoins] = useState(initialCoins);
    const [owned, setOwned] = useState<Set<ShopItemKey>>(
        new Set([
            ...initialOwned,
            ...Object.values(SHOP_CATALOG).filter((item) => item.price === 0).map((item) => item.key),
        ])
    );

    function handlePurchased(itemKey: ShopItemKey, newCoins: number) {
        setCoins(newCoins);
        setOwned((prev) => new Set(prev).add(itemKey));
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-100/70 px-5 py-5 mb-7">
                <motion.div
                    aria-hidden
                    className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-amber-200/40 blur-3xl"
                    animate={{ x: [0, 14, 0], y: [0, 10, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="absolute -bottom-14 -right-6 w-48 h-48 rounded-full bg-orange-200/40 blur-3xl"
                    animate={{ x: [0, -12, 0], y: [0, -8, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <div className="relative flex items-center justify-between gap-4">
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm max-w-sm">{t("subtitle")}</p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center bg-white/80 backdrop-blur border border-amber-200 shadow-sm shadow-amber-900/5 px-4 py-2.5 rounded-xl shrink-0"
                    >
                        <CoinBadge coins={coins} size={40} showLabel={false} />
                    </motion.div>
                </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(SHOP_CATALOG).map((item, index) => (
                    <motion.li
                        key={item.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                    >
                        <ShopItemCard
                            itemKey={item.key}
                            price={item.price}
                            coins={coins}
                            owned={owned.has(item.key)}
                            imageSrc={ITEM_IMAGES[item.key]}
                            openHref={ITEM_OPEN_HREFS[item.key]}
                            onPurchased={(newCoins) => handlePurchased(item.key, newCoins)}
                        />
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

export default ShopPage;
