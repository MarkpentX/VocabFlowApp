"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Word } from "@/domain/entities/word";
import { QuizQuestion } from "@/domain/entities/quiz";
import PracticeResult from "@/presentation/components/features/practice/PracticeResult";
import QuizItem from "@/presentation/components/features/practice/QuizItem";
import HeartsBar from "@/presentation/components/features/practice/HeartsBar";
import { usePracticeSession } from "@/presentation/hooks/use-practice-session";

interface ExamQuizProps {
    words: Word[];
    onChangeDictionaries: () => void;
}

function ExamQuiz({ words, onChangeDictionaries }: ExamQuizProps) {
    const t = useTranslations("exam");
    const session = usePracticeSession(words, { awardsCoins: false, maxHearts: 5 });

    const quizData: QuizQuestion[] = words.map((word) => {
        const otherMeanings = words
            .filter((w) => w.id !== word.id)
            .map((w) => w.infinitive)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        return {
            question: word.meaning,
            correct: word.infinitive,
            answers: [word.infinitive, ...otherMeanings].sort(() => Math.random() - 0.5),
        };
    });

    if (session.isFinished) {
        return (
            <PracticeResult
                onPlayAgain={session.resetSession}
                correctCount={session.correctCount}
                questionsCount={session.questionsCount}
                failed={session.failed}
                maxCombo={session.maxCombo}
                streakResult={session.streakResult}
                coinsAward={session.coinsAward}
                backHref="/exam"
                backLabel={t("changeDictionaries")}
            />
        );
    }

    return (
        <>
            <button
                type="button"
                onClick={onChangeDictionaries}
                className="mx-auto mb-4 block text-xs text-[rgb(103,126,119)] hover:text-black transition-colors"
            >
                {t("changeDictionaries")}
            </button>
            <HeartsBar hearts={session.hearts} maxHearts={session.maxHearts}/>
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 my-8">
                <div
                    className="bg-green-500 h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${session.progress}%` }}
                >
                </div>
            </div>
            <QuizItem quizData={quizData[session.index]} onAnswer={session.onAnswer}/>
        </>
    );
}

export default ExamQuiz;
