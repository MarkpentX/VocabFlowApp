import React from 'react';
import Link from "next/link";

function Header() {
    const navItems = [
        {name: "home", href: '/' },
        {name: "profile", href: '/profile' },
        {name: "login", href: '/auth' },
        {name: "Tags", href: '/tags' },
    ]
    return (
        <header className="flex justify-between mx-auto max-w-5xl px-6 py-4">
            <h1 className="animate-[fadeInUp_0.6s_ease-out_forwards] text-green-600 text-xl font-bold font-spaceGrotesk">VocabFlow</h1>
            <Link href={"/auth"} className="font-dMSans font-medium border-1 border-gray-200 px-3 rounded-md py-1.5 text-sm hover:bg-green-200 transition-colors duration-200 animate-[fadeInUp_0.6s_ease-out_forwards]">Login</Link>
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        {navItems.map((navItem) => (*/}
            {/*            <li key={navItem.href}>*/}
            {/*                <Link href={navItem.href}>{navItem.name}</Link>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</nav>*/}
        </header>
    );
}

export default Header;