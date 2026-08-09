import React, { Suspense } from 'react';
import HeaderAuth from "@/presentation/components/layout/HeaderAuth";
import { Link } from "@/i18n/navigation";
import { SparklesText } from "@/presentation/components/ui/sparkles-text";
import LanguageSwitcher from "@/presentation/components/layout/LanguageSwitcher";

function Header() {
    return (
        <header className="flex justify-between items-center mx-auto max-w-5xl px-6 py-4">

            <h1>
                <Link href="/">
                    <SparklesText sparklesCount={5} className="animate-[fadeInUp_0.6s_ease-out_forwards] text-green-600 text-xl font-bold font-spaceGrotesk">VocabFlow</SparklesText>
                </Link>
            </h1>
            <div className="flex items-center gap-3">
                <LanguageSwitcher/>
                <Suspense fallback={null}>
                    <HeaderAuth />
                </Suspense>
            </div>
        </header>
    );
}

export default Header;
