"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import CoinLottie from "@/presentation/components/features/dashboard/CoinLottie";
import { ShopItemKey } from "@/domain/entities/shop";
import { purchaseItemAction } from "@/presentation/actions/shop-actions";

interface ShopItemCardProps {
    itemKey: ShopItemKey;
    imageSrc: string;
    price: number;
    coins: number;
    owned: boolean;
    openHref: string;
    onPurchased: (coins: number) => void;
}

function ShopItemCard({ itemKey, imageSrc, price, coins, owned, openHref, onPurchased }: ShopItemCardProps) {
    const t = useTranslations("shop");
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [shake, setShake] = useState(false);
    const [justPurchased, setJustPurchased] = useState(false);

    const canAfford = coins >= price;

    async function handleBuy() {
        if (!canAfford) {
            setShake(true);
            toast.error(t("insufficientFunds"));
            setTimeout(() => setShake(false), 500);
            return;
        }

        setPending(true);
        const result = await purchaseItemAction(itemKey);
        setPending(false);

        if (!result.isSuccess || !result.data.success) {
            toast.error(result.isSuccess ? t("insufficientFunds") : (result.message ?? t("insufficientFunds")));
            return;
        }

        onPurchased(result.data.coins);
        setJustPurchased(true);
        toast.success(t("purchaseSuccess"));
        setTimeout(() => setJustPurchased(false), 900);
    }

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative rounded-[1.4rem] p-[1.5px] bg-gradient-to-br from-[rgb(226,229,220)] to-[rgb(226,229,220)] hover:from-amber-300 hover:via-orange-300 hover:to-amber-400 transition-colors duration-300"
        >
            <motion.article
                animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                transition={{ duration: 0.45 }}
                className="relative flex flex-col items-center text-center p-6 bg-white rounded-[1.35rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300"
            >
                {owned && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white bg-gradient-to-br from-emerald-400 to-green-600 shadow-sm shadow-emerald-900/20">
                        {price === 0 ? t("free") : t("owned")}
                    </span>
                )}

                {justPurchased && (
                    <>
                        <motion.div
                            aria-hidden
                            initial={{ opacity: 0.9, scale: 0.6 }}
                            animate={{ opacity: 0, scale: 2.4 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-emerald-200 to-green-100"
                        />
                        {[...Array(10)].map((_, i) => (
                            <motion.span
                                key={i}
                                aria-hidden
                                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
                                style={{ background: ["#FFC93D", "#FF7A1F", "#25B15F", "#4FA8FF"][i % 4] }}
                                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                animate={{
                                    opacity: 0,
                                    x: Math.cos((i / 10) * Math.PI * 2) * 70,
                                    y: Math.sin((i / 10) * Math.PI * 2) * 70,
                                    scale: 0.4,
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        ))}
                    </>
                )}

                <motion.div
                    className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-[rgba(236,239,231,0.8)] mb-4 shadow-inner"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div
                        aria-hidden
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "radial-gradient(circle, rgba(255,201,61,0.35) 0%, transparent 70%)" }}
                    />
                    <Image src={imageSrc} alt="" width={32} height={32} className="w-8 h-8 relative" />
                </motion.div>

                <h3 className="font-spaceGrotesk font-bold text-lg mb-1">{t(`items.${itemKey}.title`)}</h3>
                <p className="text-sm text-[rgb(103,126,119)] font-dMSans mb-5">{t(`items.${itemKey}.description`)}</p>

                {owned ? (
                    <button
                        type="button"
                        onClick={() => router.push(openHref)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-br from-emerald-400 to-green-600 shadow-sm shadow-emerald-900/20 cursor-pointer transition-transform duration-150 hover:scale-[1.03] hover:shadow-md active:scale-95"
                    >
                        {t("open")}
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={pending}
                        onClick={handleBuy}
                        className="relative w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-[rgb(120,74,10)] bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-100 border border-amber-200 shadow-sm cursor-pointer transition-all duration-150 hover:scale-[1.03] hover:shadow-md hover:border-amber-300 active:scale-95 disabled:opacity-60 overflow-hidden"
                    >
                        <CoinLottie size={18} />
                        {price} · {t("buy")}
                    </button>
                )}
            </motion.article>
        </motion.div>
    );
}

export default ShopItemCard;
