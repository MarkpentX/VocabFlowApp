import HeaderBackArrow from "@/presentation/components/features/dictionaries/HeaderBackArrow";
import ModeItem from "@/presentation/components/features/practice/ModeItem";
import React from "react";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const t = await getTranslations("practice");

    const modes = [
        { img: "/translate.svg", url: "by-translate", key: "byTranslate" },
        { img: "/earphone.svg", url: "by-ear", key: "byEar" },
        { img: "/exam.svg", url: "quiz", key: "quiz" },
    ] as const;

    return (
        <>
            <HeaderBackArrow title={t("pageTitle")} href="/dashboard"  />

            <main className="max-w-md mx-auto px-6 mt-6">
                <h1 className="text-center text-black text-2xl font-bold mb-6">
                    {t("selectMode")}
                </h1>

                <nav className="grid gap-4">
                    {modes.map(item => (
                        <ModeItem
                            key={item.key}
                            url={item.url}
                            slug={slug}
                            img={item.img}
                            title={t(`modes.${item.key}.title`)}
                            description={t(`modes.${item.key}.description`)}
                        />
                    ))}
                </nav>
            </main>
        </>
    );
}
