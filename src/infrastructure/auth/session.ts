import { auth } from "@/infrastructure/auth/auth";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { SessionUser } from "@/domain/entities/user";

export async function getSessionUser(): Promise<SessionUser> {
    const session = await auth();
    if (!session?.user?.id) {
        const locale = await getLocale();
        redirect({ href: "/auth", locale });
    }
    return session!.user as SessionUser;
}
