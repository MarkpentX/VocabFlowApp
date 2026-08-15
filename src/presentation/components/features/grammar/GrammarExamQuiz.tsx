"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { QuizQuestion } from "@/domain/entities/quiz";
import PracticeResult from "@/presentation/components/features/practice/PracticeResult";
import QuizItem from "@/presentation/components/features/practice/QuizItem";
import HeartsBar from "@/presentation/components/features/practice/HeartsBar";
import { useGrammarPracticeSession } from "@/presentation/hooks/use-grammar-practice-session";

interface GrammarExamQuizProps {
    questions: QuizQuestion[];
    onChangeRules: () => void;
}

function GrammarExamQuiz({ questions, onChangeRules }: GrammarExamQuizProps) {
    const t = useTranslations("grammar");
    const session = useGrammarPracticeSession(questions, { awardsCoins: false, maxHearts: 5 });

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
                backHref="/grammar/exam"
                backLabel={t("exam.changeRules")}
            />
        );
    }

    return (
        <>
            <button
                type="button"
                onClick={onChangeRules}
                className="mx-auto mb-4 block text-xs text-[rgb(103,126,119)] hover:text-black transition-colors"
            >
                {t("exam.changeRules")}
            </button>
            <HeartsBar hearts={session.hearts} maxHearts={session.maxHearts} />
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 my-8">
                <div
                    className="bg-green-500 h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${session.progress}%` }}
                ></div>
            </div>
            <QuizItem quizData={questions[session.index]} onAnswer={session.onAnswer} />
        </>
    );
}

export default GrammarExamQuiz;
