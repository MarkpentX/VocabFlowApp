"use client";

import React from "react";
import { usePathname } from "@/i18n/navigation";
import BottomNav from "@/presentation/components/layout/BottomNav";
import TopNav from "@/presentation/components/layout/TopNav";

function AppChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicHome = pathname === "/";

    if (isPublicHome) {
        return <>{children}</>;
    }

    return (
        <>
            <TopNav/>
            <div className="pb-24 md:pb-0">{children}</div>
            <BottomNav/>
        </>
    );
}

export default AppChrome;
