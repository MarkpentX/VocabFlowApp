import React from "react";
import BottomNav from "@/presentation/components/layout/BottomNav";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pb-24">
            {children}
            <BottomNav/>
        </div>
    );
}

export default ProtectedLayout;
