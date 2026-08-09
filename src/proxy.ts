import { auth } from "@/infrastructure/auth/auth"
import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"

const handleI18nRouting = createMiddleware(routing)

const LOCALE_PREFIX_PATTERN = new RegExp(`^/(${routing.locales.join("|")})(/.*)?$`)

export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const localeMatch = pathname.match(LOCALE_PREFIX_PATTERN)

    // No locale prefix yet — let next-intl detect and redirect first.
    if (!localeMatch) {
        return handleI18nRouting(req)
    }

    const locale = localeMatch[1]
    const pathWithoutLocale = localeMatch[2] ?? "/"
    const session = await auth()

    // not logged in -> home
    if (!session?.user?.id && pathWithoutLocale.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }

    // logged in -> dashboard
    if (session?.user?.id && pathWithoutLocale === "/") {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
    }

    // admin route protection
    const adminEmail = process.env.ADMIN_EMAIL
    if (pathWithoutLocale.startsWith("/admin") && session?.user?.email !== adminEmail) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }

    return handleI18nRouting(req)
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
