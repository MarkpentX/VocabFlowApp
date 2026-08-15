"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { TABS, TabIcon, isTabActive, type TabKey } from "@/presentation/components/layout/nav-tabs";

function BottomNav() {
    const t = useTranslations("nav");
    const pathname = usePathname();

    const [beforeAdd, afterAdd] = [TABS.slice(0, 2), TABS.slice(2)];

    return (
        <nav
            aria-label={t("label")}
            className="fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur-md border-t border-[rgb(226,229,220)] shadow-[0_-4px_16px_rgba(18,33,28,0.06)] md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div className="mx-auto flex max-w-lg items-stretch justify-between px-1">
                {beforeAdd.map((tab) => (
                    <NavTab key={tab.key} tab={tab.key} href={tab.href} label={t(tab.key)} active={isTabActive(pathname, tab.href)} />
                ))}

                <Link
                    href="/add-word"
                    aria-label={t("add")}
                    className="relative -top-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(52,197,113)] to-[rgb(30,150,80)] text-white shadow-lg shadow-green-900/25 transition-transform active:scale-90 hover:scale-105"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                </Link>

                {afterAdd.map((tab) => (
                    <NavTab key={tab.key} tab={tab.key} href={tab.href} label={t(tab.key)} active={isTabActive(pathname, tab.href)} />
                ))}
            </div>
        </nav>
    );
}

function NavTab({ tab, href, label, active }: { tab: TabKey; href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
                "flex min-w-[64px] flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors active:scale-95",
                active ? "text-[rgb(37,177,95)]" : "text-[rgb(103,126,119)] hover:text-[rgb(18,33,28)]"
            )}
        >
            <TabIcon tab={tab} className={cn("w-6 h-6", active && "drop-shadow-sm")} />
            <span className={cn("text-[11px] leading-none", active ? "font-semibold" : "font-medium")}>{label}</span>
        </Link>
    );
}

export default BottomNav;
