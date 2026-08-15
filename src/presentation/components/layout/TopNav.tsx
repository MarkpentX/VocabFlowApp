"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { TABS, TabIcon, isTabActive } from "@/presentation/components/layout/nav-tabs";

function TopNav() {
    const t = useTranslations("nav");
    const pathname = usePathname();

    return (
        <nav
            aria-label={t("label")}
            className="hidden md:block sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[rgb(226,229,220)]"
        >
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2.5">
                <div className="flex items-center gap-1">
                    {TABS.map((tab) => {
                        const active = isTabActive(pathname, tab.href);
                        return (
                            <Link
                                key={tab.key}
                                href={tab.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                                    active
                                        ? "bg-[rgba(37,177,95,0.1)] text-[rgb(37,177,95)]"
                                        : "text-[rgb(103,126,119)] hover:bg-black/5 hover:text-[rgb(18,33,28)]"
                                )}
                            >
                                <TabIcon tab={tab.key} className="w-4.5 h-4.5"/>
                                {t(tab.key)}
                            </Link>
                        );
                    })}
                </div>

                <Link
                    href="/add-word"
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-[rgb(52,197,113)] to-[rgb(30,150,80)] px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                    {t("add")}
                </Link>
            </div>
        </nav>
    );
}

export default TopNav;
