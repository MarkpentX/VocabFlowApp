import { auth } from "@/infrastructure/auth/auth";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { SessionUser } from "@/domain/entities/user";
import { errors } from "@/domain/errors/factory";

export async function getSessionUser(): Promise<SessionUser> {
    const session = await auth();
    if (!session?.user?.id) {
        const locale = await getLocale();
        redirect({ href: "/auth", locale });
    }
    return session!.user as SessionUser;
}

// For use inside server actions (not page components) — actions are independently
// invokable regardless of which page they were imported into, so route-level
// middleware protection (e.g. the /admin check in proxy.ts) does not protect them.
// Every action that touches admin-only data must call this itself.
export async function requireAdminUser(): Promise<SessionUser> {
    const session = await auth();
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session?.user?.id || !adminEmail || session.user.email !== adminEmail) {
        throw errors.auth("Admin access required");
    }

    return session.user as SessionUser;
}
