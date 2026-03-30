import React from 'react';
import Link from "next/link";
import {slugEncode} from "@/lib/slug-utils";

interface PracticeResultProps {
    correctCount: number
    questionsCount: number
    onCloseResult: () => void
    onResetCorrectCount: () => void
    tagName: string
}

function PracticeResult({onResetCorrectCount, onCloseResult, correctCount, questionsCount, tagName}: PracticeResultProps) {
    const encodedTagName = slugEncode(tagName);

    function closeResult(){
        onCloseResult()
        onResetCorrectCount()
    }

    return (
        <article className="mt-6 p-6 flex flex-col animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-3 font-spaceGrotesk">Practice is over!</h2>
            <h3 className="text-center text-[rgb(37,177,95)] text-3xl font-spaceGrotesk font-bold mb-3">{correctCount} / {questionsCount}</h3>
            <p className="text-center text-[rgb(103,126,119)] mb-6">Keep learning with VocabFlow! 📚</p>

            <ul className="flex gap-3 justify-center flex-wrap mb-3">
                <li>
                    <Link onClick={closeResult} className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-[rgba(37,177,95,0.9)]" href={`/practice/${tagName}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-rotate-ccw w-4 h-4">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                        </svg>
                        Again
                    </Link>
                </li>

                <li>
                    <Link onClick={closeResult} className="flex items-center gap-2 px-4 py-2 rounded-md text-black border border-[rgb(226,229,220)] bg-[rgb(248,249,245)]" href={`/practice/${tagName}`}>Other mode</Link>
                </li>
            </ul>

            <Link onClick={closeResult} className="flex justify-center self-center items-center gap-2 px-4 py-2 rounded-md text-black bg-[rgb(236,239,231)]" href={`/tags/${encodedTagName}`}>To the words</Link>
        </article>
    );
}

export default PracticeResult;