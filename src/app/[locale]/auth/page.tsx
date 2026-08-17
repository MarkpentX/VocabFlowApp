import React from 'react';
import GoogleSignIn from "@/presentation/components/features/auth/GoogleSignIn";
import SignInForm from "@/presentation/components/features/auth/SignInForm";
import { useTranslations } from "next-intl";

function Page() {
    const t = useTranslations("auth");

    return (
        <main className="flex flex-col items-center justify-center min-h-dvh px-4 py-8">
            <h1 className="text-green-600 text-3xl mb-1 text-center font-bold font-spaceGrotesk md:text-4xl">VocabFlow</h1>
            <p className="mb-4 text-[rgb(103,126,119)]">{t("continuePrompt")}</p>
            <GoogleSignIn />
            <SignInForm/>
        </main>
    );
}

export default Page;
