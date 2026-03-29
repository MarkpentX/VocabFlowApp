import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(req: NextRequest) {
    const session = await auth();
    const pathname = req.nextUrl.pathname;

    // not logged in -> dashboard
    if (!session?.user?.id && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // logged in -> home
    if (session?.user?.id && pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // admin route protection
    if (pathname.startsWith("/admin") && session?.user?.email !== "krejzimark29@gmail.com") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};