import React from 'react';
import {auth} from "@/auth";
import SignOut from "@/components/SignOut";
import Link from "next/link";

async function HeaderAuth() {
    const session = await auth();

    return (
        <>
            {session?.user ? <SignOut/> : <Link href={"/auth"}
                                                className="font-dMSans font-medium border-1
                                                border-gray-200 px-3 rounded-md py-1.5 text-sm
                                                hover:bg-green-200 transition-colors
                                                duration-200 animate-[fadeInUp_0.6s_ease-out_forwards]">Login</Link>}
        </>
    );
}

export default HeaderAuth;