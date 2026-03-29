'use client'
import React, {useState} from 'react';
import {DbWord} from "@/features/words/types";
import toast from "react-hot-toast";
import QuizItem from "@/app/(protected)/practice/by-translate/components/QuizItem";
import PracticeResult from "@/app/(protected)/practice/components/practiceResult";

interface QuizProps {
    words: DbWord[]
    tagName: string
}

function Quiz({ words, tagName }: QuizProps) {
    const [index, setIndex] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const progress = (index / words.length) * 100;
    async function onNextQuestion() {
        if (index === words.length - 1){
            toast.success("Quiz complete!")
            setIndex(0)
            setIsFinished(true)
        } else {
            setIndex(index + 1)
        }
    }

    function addCorrect() {
        setCorrectCount(prev => prev + 1)
    }

    if (isFinished) {
        return (
            <PracticeResult
                correctCount={correctCount}
                questionsCount={words.length}
                modeName="by-translate"
                tagName={tagName}
            />
        )
    }

    return (
        <>
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 my-8">
                <div
                    className="bg-green-500 h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${progress}%` }}>
                </div>
            </div>
            <QuizItem word={words[index]} onNextQuestion={onNextQuestion} addCorrect={addCorrect}/>
        </>
    );
}

export default Quiz;