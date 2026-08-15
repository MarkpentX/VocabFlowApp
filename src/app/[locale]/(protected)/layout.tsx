import React from "react";
import AppChrome from "@/presentation/components/layout/AppChrome";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <AppChrome>{children}</AppChrome>;
}

export default ProtectedLayout;
