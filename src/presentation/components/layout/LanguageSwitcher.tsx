"use client";

import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
    en: "EN",
    ru: "RU",
    uk: "UK",
};

function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("common");
    const [isPending, startTransition] = useTransition();

    function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <label className="flex items-center text-sm font-dMSans animate-[fadeInUp_0.6s_ease-out_forwards]">
            <span className="sr-only">{t("language")}</span>
            <select
                aria-label={t("language")}
                value={locale}
                disabled={isPending}
                onChange={onChange}
                className="h-8 rounded-md border border-gray-200 bg-transparent px-2 text-sm font-dMSans cursor-pointer disabled:opacity-60"
            >
                {routing.locales.map((loc) => (
                    <option key={loc} value={loc}>
                        {LOCALE_LABELS[loc]}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default LanguageSwitcher;
