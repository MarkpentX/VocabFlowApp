'use client'
import React from 'react';
import { Word } from "@/domain/entities/word";
import TranslateItem from "@/presentation/components/features/practice/TranslateItem";
import PracticeResult from "@/presentation/components/features/practice/PracticeResult";
import HeartsBar from "@/presentation/components/features/practice/HeartsBar";
import { usePracticeSession } from "@/presentation/hooks/use-practice-session";

interface TranslateProps {
    words: Word[]
    tagName: string
}

function Translate({ words, tagName }: TranslateProps) {
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
                tagName={tagName}
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
            <TranslateItem word={words[session.index]} onAnswer={session.onAnswer}/>
        </>
    );
}

export default Translate;
