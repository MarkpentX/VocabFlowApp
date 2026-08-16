"use client";

import React, { useState } from "react";
import { GrammarDiagnosticAnswer, GrammarDiagnosticQuestion, DiagnosticLevel, scoreGrammarDiagnostic } from "@/domain/entities/grammar-diagnostic";
import QuizItem from "@/presentation/components/features/practice/QuizItem";
import GrammarDiagnosticResult from "@/presentation/components/features/grammar/GrammarDiagnosticResult";

interface GrammarDiagnosticQuizProps {
    questions: GrammarDiagnosticQuestion[];
    level: DiagnosticLevel;
    sessionId: string | null;
    onRetake: () => void;
}

function GrammarDiagnosticQuiz({ questions, level, sessionId, onRetake }: GrammarDiagnosticQuizProps) {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<GrammarDiagnosticAnswer[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    function handleAnswer(isCorrect: boolean) {
        const nextAnswers = [...answers, { ruleKey: questions[index].ruleKey, isCorrect }];
        setAnswers(nextAnswers);

        if (index === questions.length - 1) {
            setIsFinished(true);
        } else {
            setIndex(index + 1);
        }
    }

    if (isFinished) {
        return (
            <GrammarDiagnosticResult
                result={scoreGrammarDiagnostic(answers, level)}
                sessionId={sessionId}
                onRetake={onRetake}
            />
        );
    }

    const progress = (index / questions.length) * 100;

    return (
        <>
            <p className="text-center text-xs text-[rgb(103,126,119)] mb-2 tabular-nums">
                {index + 1} / {questions.length}
            </p>
            <div className="bg-[rgb(236,239,231)] rounded-xl h-2 mb-8">
                <div
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-600 h-2 rounded-xl transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <QuizItem quizData={questions[index]} onAnswer={handleAnswer} />
        </>
    );
}

export default GrammarDiagnosticQuiz;
