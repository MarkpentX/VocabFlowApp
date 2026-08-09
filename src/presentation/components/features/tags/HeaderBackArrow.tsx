import React from 'react';
import { Link } from "@/i18n/navigation";

type HeaderBackArrowProps = {
    title: string;
    href: string;
}

function HeaderBackArrow({title, href}: HeaderBackArrowProps) {
    return (
        <header className="flex items-center gap-4 px-4 sm:px-6 lg:px-10 py-6 max-w-5xl mx-auto">
            <Link href={href} className="shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-arrow-left w-4 h-4">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>
            </Link>

            <h1 className="text-xl text-[rgb(37,177,95)] font-bold font-spaceGrotesk truncate">
                {title}
            </h1>
        </header>
    );
}

export default HeaderBackArrow;
