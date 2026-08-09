import React from 'react';
import { auth } from "@/infrastructure/auth/auth";
import SignOut from "@/presentation/components/layout/SignOut";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

async function HeaderAuth() {
    const session = await auth();
    const t = await getTranslations("common");

    return (
        <>
            {session?.user ? <SignOut/> : <Link href={"/auth"}
                                                className="font-dMSans font-medium border-1
                                                border-gray-200 px-3 rounded-md py-1.5 text-sm
                                                hover:bg-green-200 transition-colors
                                                duration-200 animate-[fadeInUp_0.6s_ease-out_forwards]">{t("login")}</Link>}
        </>
    );
}

export default HeaderAuth;
