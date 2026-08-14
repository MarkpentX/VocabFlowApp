"use client";

import React, { useState } from "react";
import { LevelTestQuestion, scoreLevelTest } from "@/domain/entities/level-test";
import QuizItem from "@/presentation/components/features/practice/QuizItem";
import LevelResult from "@/presentation/components/features/level-test/LevelResult";

interface LevelTestQuizProps {
    questions: LevelTestQuestion[];
}

function LevelTestQuiz({ questions }: LevelTestQuizProps) {
    const [index, setIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    function handleAnswer(isCorrect: boolean) {
        if (isCorrect) {
            setCorrectCount((c) => c + 1);
        }

        if (index === questions.length - 1) {
            setIsFinished(true);
        } else {
            setIndex(index + 1);
        }
    }

    function handleRetake() {
        setIndex(0);
        setCorrectCount(0);
        setIsFinished(false);
    }

    if (isFinished) {
        return <LevelResult score={scoreLevelTest(correctCount, questions.length)} onRetake={handleRetake}/>;
    }

    const progress = (index / questions.length) * 100;

    return (
        <>
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 my-8">
                <div
                    className="bg-green-500 h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${progress}%` }}
                >
                </div>
            </div>
            <QuizItem quizData={questions[index]} onAnswer={handleAnswer}/>
        </>
    );
}

export default LevelTestQuiz;
