import React from "react";
import AppChrome from "@/presentation/components/layout/AppChrome";
import { auth } from "@/infrastructure/auth/auth";
import PostHogIdentify from "@/presentation/providers/PostHogIdentify";

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <AppChrome>
            {session?.user?.id && (
                <PostHogIdentify
                    userId={session.user.id}
                    email={session.user.email}
                    username={session.user.username}
                />
            )}
            {children}
        </AppChrome>
    );
}

export default ProtectedLayout;
