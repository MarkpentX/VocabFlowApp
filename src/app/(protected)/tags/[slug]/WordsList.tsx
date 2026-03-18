'use client'

import React, {useState} from 'react';
import {DbWord} from "@/features/words/types";
import Quiz from "@/app/(protected)/tags/_components/Quiz";
// import {DeleteForm} from "@/app/(protected)/tags/_components/DeleteForm";
import Link from "next/link";

interface WordsListProps {
    words: DbWord[]
    slug: string
}

function WordsList({words, slug}: WordsListProps) {
    const [isQuiz, setIsQuiz] = useState(false);

    function showQuiz() {
        setIsQuiz(!isQuiz);
        console.log(isQuiz);
    }

    if (isQuiz) {
        return <Quiz words={words} />
    }

    return (
        <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
            <div className="flex items-center gap-5">
                <Link href={"/tags"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-arrow-left w-4 h-4">
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                </Link>

                <h1 className="text-xl text-[rgb(37,177,95)] font-bold font-spaceGrotesk">
                    {slug}
                </h1>
            </div>

            <div className="max-w-2xl mx-auto items-start justify-start">
                <nav>
                    <ul>
                        <li>
                            <Link href={"/practice"} className="flex items-center justify-center gap-2 bg-[rgba(37,177,95,0.9)] text-white text-sm border-1 border-[rgb(226,229,220)] py-2.5 px-8 w-full rounded-xl">
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

                        <li>
                            <Link href={"/add-word"} className="flex items-center text-black justify-center gap-2 text-sm border-1 border-[rgb(226,229,220)] py-2.5 px-8 w-full rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-plus w-4 h-4">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                Add Word
                            </Link>
                        </li>
                    </ul>
                </nav>

                {words.map((item) =>(
                    <article key={item.id}>
                        <h3>{item.infinitive}</h3>
                        <h4>{item.meaning}</h4>
                        {/*<DeleteForm id={item.id}/>*/}
                    </article>
                ))}
            </div>

            {/*<button onClick={showQuiz}>Start Quiz</button>*/}
        </main>
    )
}

export default WordsList;