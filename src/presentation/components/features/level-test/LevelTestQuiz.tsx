"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { LevelTestAnswer, LevelTestQuestion, WritingPrompt, WritingScore, computeIeltsResult } from "@/domain/entities/level-test";
import QuizItem from "@/presentation/components/features/practice/QuizItem";
import SoundButton from "@/presentation/components/features/words/SoundButton";
import WritingTask from "@/presentation/components/features/level-test/WritingTask";
import LevelResult from "@/presentation/components/features/level-test/LevelResult";

interface LevelTestQuizProps {
    questions: LevelTestQuestion[];
    writingPrompt: WritingPrompt | null;
}

function LevelTestQuiz({ questions, writingPrompt }: LevelTestQuizProps) {
    const t = useTranslations("levelTest");
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<LevelTestAnswer[]>([]);
    const [showWriting, setShowWriting] = useState(false);
    const [writingScore, setWritingScore] = useState<WritingScore | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    function handleAnswer(isCorrect: boolean) {
        const nextAnswers = [...answers, { section: questions[index].section, isCorrect }];
        setAnswers(nextAnswers);

        if (index < questions.length - 1) {
            setIndex(index + 1);
            return;
        }

        if (writingPrompt) {
            setShowWriting(true);
        } else {
            setIsFinished(true);
        }
    }

    function handleWritingSubmit(score: WritingScore | null) {
        setWritingScore(score);
        setShowWriting(false);
        setIsFinished(true);
    }

    function handleRetake() {
        setIndex(0);
        setAnswers([]);
        setShowWriting(false);
        setWritingScore(null);
        setIsFinished(false);
    }

    if (isFinished) {
        return <LevelResult result={computeIeltsResult(answers, writingScore)} onRetake={handleRetake} />;
    }

    if (showWriting && writingPrompt) {
        return <WritingTask prompt={writingPrompt} onSubmit={handleWritingSubmit} />;
    }

    if (questions.length === 0) {
        return null;
    }

    const question = questions[index];
    const progress = (index / questions.length) * 100;

    return (
        <>
            <p className="text-center text-xs font-semibold text-[rgb(103,126,119)] uppercase tracking-wide mb-2">
                {t(`sections.${question.section}`)}
            </p>
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 mb-6">
                <div className="bg-green-500 h-2 rounded-xl transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            {question.passage && (
                <div className="mb-5 p-5 bg-[rgb(248,249,245)] border border-[rgb(226,229,220)] rounded-xl">
                    <p className="text-sm leading-relaxed whitespace-pre-line text-[rgb(18,33,28)]">{question.passage}</p>
                </div>
            )}

            {question.audioText && (
                <div className="mb-5 flex items-center justify-center gap-2 p-4 bg-[rgb(248,249,245)] border border-[rgb(226,229,220)] rounded-xl">
                    <SoundButton word={question.audioText} lang="en" />
                    <span className="text-sm text-[rgb(103,126,119)]">{t("listenPrompt")}</span>
                </div>
            )}

            <QuizItem quizData={question} onAnswer={handleAnswer} />
        </>
    );
}

export default LevelTestQuiz;
