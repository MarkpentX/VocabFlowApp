'use client'
import React, {useState} from 'react';
import {DbWord} from "@/features/words/types";
import PracticeResult from "@/app/(protected)/practice/components/practiceResult";
import {quizDataItem} from "@/features/quiz/types";
import QuizItem from "@/app/(protected)/practice/quiz/_components/QuizItem";

interface QuizProps {
    words: DbWord[]
    tagName: string
}

function Quiz({ words, tagName }: QuizProps) {
    const [index, setIndex] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const progress = (index / words.length) * 100;

    const quizData: quizDataItem[] = words
        .map((word) => {
            const otherMeanings = words
                .filter((w) => w.id !== word.id)
                .map((w) => w.infinitive)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            return {
                question: word.meaning,
                correct: word.infinitive,
                answers: [word.infinitive, ...otherMeanings].sort(() => Math.random() - 0.5)
            };
        });
   function onNextQuestion() {
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
            <QuizItem quizData={quizData[index]} onNextQuestion={onNextQuestion} addCorrect={addCorrect}/>
        </>
    );
}

export default Quiz;