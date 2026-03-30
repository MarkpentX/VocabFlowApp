'use client'

import React from 'react';
import {DbWord} from "@/features/words/types";
import Link from "next/link";
import SoundButton from "@/app/(protected)/tags/_components/SoundButton";
import {DeleteForm} from "@/app/(protected)/tags/_components/DeleteForm";
import {deleteWordAction} from "@/features/words/controllers/deleteWordAction";

interface WordsListProps {
    words: DbWord[]
}

function WordsList({words}: WordsListProps) {
    // const [isQuiz, setIsQuiz] = useState(false);
    //
    // function showQuiz() {
    //     setIsQuiz(!isQuiz);
    //     console.log(isQuiz);
    // }
    //
    // if (isQuiz) {
    //     return <Translate words={words} />
    // }

    return (
        <main className="flex flex-col gap-3 px-6 py-4 mt-1.5 max-w-5xl h-dvh mx-auto">
            <div className="items-start justify-start">
                <nav>
                    <ul className="w-full flex justify-start items-start flex-row gap-3 mt-10">
                        <li>
                            <Link href={"/practice"} className="flex items-center justify-center gap-2 bg-[rgba(37,177,95,0.9)] text-white text-sm border-1 border-[rgb(226,229,220)] py-2.5 px-5 w-full rounded-xl">
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
                            <Link href={"/add-word"} className="flex items-center text-black justify-center gap-2 text-sm border-1 border-[rgb(226,229,220)] py-2.5 px-4 w-full rounded-xl">
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

                <div className="mt-6 grid gap-x-3 gap-y-4 ">
                    {words.map((item) =>(
                        <article className="flex gap-1 bg-[rgb(255,255,255)] items-center border-[rgb(226,229,220)] drop-shadow-sm py-6 shadow-black p-4 rounded-xl justify-between" key={item.id}>
                            <div className="flex items-center gap-3">
                                <SoundButton word={item.infinitive}/>
                                <h3 className="font-dMSans text-[rgb(18,33,28)]">{item.infinitive}</h3>
                                <h4 className="font-dMSans text-[rgb(103,126,119)]">- {item.meaning}</h4>
                            </div>
                            <DeleteForm id={item.id} deleteAction={deleteWordAction}/>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default WordsList;