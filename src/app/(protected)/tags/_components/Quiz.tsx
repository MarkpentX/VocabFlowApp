'use client'
import React, {useState} from 'react';
import {DbWord} from "@/features/words/types";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import QuizItem from "@/app/(protected)/tags/_components/QuizItem";

interface QuizProps {
    words: DbWord[]
}

function Quiz({ words }: QuizProps) {
    const [index, setIndex] = useState(0)
    const router = useRouter();

    async function onNextQuestion() {
        if (index === words.length - 1){
            toast.success("Quiz complete!")
            setTimeout(() => {
                router.push('/tags')
            }, 500)
        } else {
            setIndex(index + 1)
        }
    }

    return (
        <>
            <h1>Quiz</h1>

            <QuizItem word={words[index]} onNextQuestion={onNextQuestion} />
        </>
    );
}

export default Quiz;