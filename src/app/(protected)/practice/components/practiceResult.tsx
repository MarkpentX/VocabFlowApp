import React from 'react';
import Link from "next/link";

interface PracticeResultProps {
    correctCount: number
    questionsCount: number
    modeName: string
    tagName: string
}

function PracticeResult({correctCount, questionsCount, modeName, tagName}: PracticeResultProps) {
    return (
        <article>
            <h2>Practice is over!</h2>
            <h3>{correctCount} / {questionsCount}</h3>
            <p>Keep learning with VocabFlow! 📚</p>

            <Link href={`Link`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-rotate-ccw w-4 h-4">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                </svg>
                Again
            </Link>

            <Link href={`j`}>Other mode</Link>
            <Link href={`j`}>To the words</Link>
        </article>
    );
}

export default PracticeResult;