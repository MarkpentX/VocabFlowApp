import React, {Suspense} from 'react';
import HeaderAuth from "@/components/HeaderAuth";
import Link from "next/link";
import {SparklesText} from "@/components/ui/sparkles-text";

function Header() {
    return (
        <header className="flex justify-between mx-auto max-w-5xl px-6 py-4">

            <h1>
                <Link href="/">
                    <SparklesText sparklesCount={5} className="animate-[fadeInUp_0.6s_ease-out_forwards] text-green-600 text-xl font-bold font-spaceGrotesk">VocabFlow</SparklesText>
                </Link>
            </h1>
            <Suspense fallback={null}>
                <HeaderAuth />
            </Suspense>
        </header>
    );
}

export default Header;