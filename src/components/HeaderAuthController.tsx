import React from 'react';
import Link from "next/link";
import {auth} from "@/auth";
import SignOut from "@/components/SignOut";

async function HeaderAuthController() {
    const session = await auth();

    if (!session) {
        return (
            <header className="flex justify-between mx-auto max-w-5xl px-6 py-4">
                <h1 className="animate-[fadeInUp_0.6s_ease-out_forwards] text-green-600 text-xl font-bold font-spaceGrotesk">VocabFlow</h1>
                <Link href={"/auth"} className="font-dMSans font-medium border-1 border-gray-200 px-3 rounded-md py-1.5 text-sm hover:bg-green-200 transition-colors duration-200 animate-[fadeInUp_0.6s_ease-out_forwards]">Login</Link>
            </header>
        );
    }

    return (
        <header className="flex justify-between mx-auto max-w-5xl px-6 py-4">
            <h1 className="animate-[fadeInUp_0.6s_ease-out_forwards] text-green-600 text-xl font-bold font-spaceGrotesk">VocabFlow</h1>
            <SignOut/>
        </header>
    );
}

export default HeaderAuthController;