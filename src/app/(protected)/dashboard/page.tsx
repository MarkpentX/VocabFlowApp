import React from 'react';
import {auth} from "@/auth";
import bookIcon from "../../../../public/book.svg"
import tagIcon from "../../../../public/tag.svg"
import Image from "next/image";
import Link from "next/link";

async function Page() {
    const session = await auth();

    return (
        <section className="max-w-3xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-black mb-6">Hello, {session?.user?.name}</h1>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <article className="bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-5 rounded-xl">
                    <Image className="w-9 h-9 mb-3" src={bookIcon} alt="book-icon"/>
                    <span className="text-2xl font-spaceGrotesk font-bold" >0</span>
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm">Total Words</p>
                </article>

                <article className="bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-5 rounded-xl">
                    <Image className="w-9 h-9 mb-3" src={tagIcon} alt="tag-icon"/>
                    <span className="text-2xl font-spaceGrotesk font-bold" >0</span>
                    <p className="text-[rgb(103,126,119)] font-dMSans text-sm">Total tags</p>
                </article>
            </div>

            <nav className="mt-8">
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                    <li>
                        <Link href={"/add-word"} className="flex items-center justify-center gap-2 bg-[rgba(37,177,95,0.9)] text-white text-sm border-1 border-[rgb(226,229,220)] py-3 w-full px-8 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="lucide lucide-plus w-4 h-4">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                            Add Word
                        </Link>
                    </li>

                    <li>
                        <Link href={"/view-tags"} className="flex items-center justify-center gap-2 text-black text-sm border-1 border-[rgb(226,229,220)] py-3 w-full px-8 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="lucide lucide-tags w-4 h-4">
                                <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"></path>
                                <path
                                    d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                <circle cx="6.5" cy="9.5" r=".5" fill="currentColor"></circle>
                            </svg>
                            View Tags
                        </Link>
                    </li>

                    <li>
                        <Link href={"/practice"} className="flex items-center justify-center gap-2 bg-[rgba(236,239,231,0.8)] text-black text-sm border-1 border-[rgb(226,229,220)] py-3 w-full px-8 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="lucide lucide-brain w-4 h-4">
                                <path
                                    d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                                <path
                                    d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                                <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                                <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                                <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                                <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                            </svg>
                            Start Practice
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Page;