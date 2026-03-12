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
        <header>
            <nav>
                <ul>
                    {navItems.map((navItem) => (
                        <li key={navItem.href}>
                            <Link href={navItem.href}>{navItem.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;