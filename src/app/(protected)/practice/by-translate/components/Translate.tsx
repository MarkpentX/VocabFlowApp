'use client'
import React, {useState} from 'react';
import {DbWord} from "@/features/words/types";
import TranslateItem from "@/app/(protected)/practice/by-translate/components/TranslateItem";
import PracticeResult from "@/app/(protected)/practice/components/practiceResult";

interface QuizProps {
    words: DbWord[]
    tagName: string
}

function Translate({ words, tagName }: QuizProps) {
    const [index, setIndex] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const progress = (index / words.length) * 100;
    async function onNextQuestion() {
        if (index === words.length - 1){
            setIndex(0)
            setIsFinished(true)
        } else {
            setIndex(index + 1)
        }
    }

    function addCorrect() {
        setCorrectCount(prev => prev + 1)
    }

    function closeWindow() {
        setIsFinished(false)
    }

    function resetCorrectCount() {
        setCorrectCount(0)
    }

    if (isFinished) {
        return (
            <PracticeResult
                onCloseResult={closeWindow}
                onResetCorrectCount={resetCorrectCount}
                correctCount={correctCount}
                questionsCount={words.length}
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
            <TranslateItem word={words[index]} onNextQuestion={onNextQuestion} addCorrect={addCorrect}/>
        </>
    );
}

export default Translate;