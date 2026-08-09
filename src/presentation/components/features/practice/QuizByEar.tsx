'use client'
import React from 'react';
import { Word } from "@/domain/entities/word";
import PracticeResult from "@/presentation/components/features/practice/PracticeResult";
import QuizItemEar from "@/presentation/components/features/practice/QuizItemEar";
import HeartsBar from "@/presentation/components/features/practice/HeartsBar";
import { usePracticeSession } from "@/presentation/hooks/use-practice-session";

interface QuizByEarProps {
    words: Word[]
    dictionaryName: string
}

function QuizByEar({ words, dictionaryName }: QuizByEarProps) {
    const session = usePracticeSession(words);

    if (session.isFinished) {
        return (
            <PracticeResult
                onPlayAgain={session.resetSession}
                correctCount={session.correctCount}
                questionsCount={session.questionsCount}
                failed={session.failed}
                maxCombo={session.maxCombo}
                streakResult={session.streakResult}
                dictionaryName={dictionaryName}
            />
        )
    }

    return (
        <>
            <HeartsBar hearts={session.hearts}/>
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 my-8">
                <div
                    className="bg-green-500 h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${session.progress}%` }}>
                </div>
            </div>
            <QuizItemEar word={words[session.index]} onAnswer={session.onAnswer}/>
        </>
    );
}

export default QuizByEar;
