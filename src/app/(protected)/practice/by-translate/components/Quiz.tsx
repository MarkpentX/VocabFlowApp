'use client'
import React, {useState} from 'react';
import {DbWord} from "@/features/words/types";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import QuizItem from "@/app/(protected)/practice/by-translate/components/QuizItem";

interface QuizProps {
    words: DbWord[]
}

function Quiz({ words }: QuizProps) {
    const [index, setIndex] = useState(0)
    const router = useRouter();
    const progress = (index / words.length) * 100;
    async function onNextQuestion() {
        if (index === words.length - 1){
            toast.success("Quiz complete!")
            setIndex(0)
            setTimeout(() => {
                router.push('/practice')
            }, 300)
        } else {
            setIndex(index + 1)
        }
    }

    return (
        <>
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 my-8">
                <div
                    className="bg-green-500 h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${progress}%` }}                >
                </div>
            </div>
            <QuizItem word={words[index]} onNextQuestion={onNextQuestion} />
        </>
    );
}

export default Quiz;