"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type TabKey = "home" | "dictionaries" | "practice" | "shop";

const TABS: { key: TabKey; href: string }[] = [
    { key: "home", href: "/dashboard" },
    { key: "dictionaries", href: "/dictionary" },
    { key: "practice", href: "/practice" },
    { key: "shop", href: "/shop" },
];

function isActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}

function TabIcon({ tab, className }: { tab: TabKey; className?: string }) {
    switch (tab) {
        case "home":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            );
        case "dictionaries":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"></path>
                    <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"></path>
                    <circle cx="6.5" cy="9.5" r=".5" fill="currentColor"></circle>
                </svg>
            );
        case "practice":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                    <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                    <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                    <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                </svg>
            );
        case "shop":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                    <path d="M2 7h20"></path>
                    <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path>
                </svg>
            );
    }
}

function BottomNav() {
    const t = useTranslations("nav");
    const pathname = usePathname();

    const [beforeAdd, afterAdd] = [TABS.slice(0, 2), TABS.slice(2)];

    return (
        <nav
            aria-label={t("label")}
            className="fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur-md border-t border-[rgb(226,229,220)] shadow-[0_-4px_16px_rgba(18,33,28,0.06)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div className="mx-auto flex max-w-lg items-stretch justify-between px-1">
                {beforeAdd.map((tab) => (
                    <NavTab key={tab.key} tab={tab.key} href={tab.href} label={t(tab.key)} active={isActive(pathname, tab.href)} />
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
                    <NavTab key={tab.key} tab={tab.key} href={tab.href} label={t(tab.key)} active={isActive(pathname, tab.href)} />
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
