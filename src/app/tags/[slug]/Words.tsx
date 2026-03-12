'use client'

import React, {useState} from 'react';
import {DbWord} from "@/features/words/types";
import Quiz from "@/app/tags/_components/Quiz";
import DeleteForm from "@/app/tags/_components/DeleteForm";

interface WordsProps {
    words: DbWord[]
    slug: string
}

function Words({words, slug}: WordsProps) {
    const [isQuiz, setIsQuiz] = useState(false);

    function showQuiz() {
        setIsQuiz(!isQuiz);
        console.log(isQuiz);
    }

    if (isQuiz) {
        return <Quiz words={words} />
    }

    async function deleteWord(id: string) {

    }

    return (
        <>
            <h1>Words by tag: {slug}</h1>

            <div>
                {words.map((item) =>(
                    <article key={item.id}>
                        <h3>{item.infinitive}</h3>
                        <h4>{item.meaning}</h4>
                        <DeleteForm id={item.id}/>
                    </article>
                ))}
            </div>

            <button onClick={showQuiz}>Start Quiz</button>
        </>
    )
}

export default Words;