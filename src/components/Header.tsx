import React, {Suspense} from 'react';
import HeaderAuth from "@/components/HeaderAuth";

function Header() {
    return (
        <header className="flex justify-between mx-auto max-w-5xl px-6 py-4">
            <h1 className="animate-[fadeInUp_0.6s_ease-out_forwards] text-green-600 text-xl font-bold font-spaceGrotesk">VocabFlow</h1>
            <Suspense fallback={null}>
                <HeaderAuth />
            </Suspense>
        </header>
    );
}

export default Header;