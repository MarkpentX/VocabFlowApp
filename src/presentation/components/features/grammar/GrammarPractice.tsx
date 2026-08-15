"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { QuizQuestion } from "@/domain/entities/quiz";
import PracticeResult from "@/presentation/components/features/practice/PracticeResult";
import QuizItem from "@/presentation/components/features/practice/QuizItem";
import HeartsBar from "@/presentation/components/features/practice/HeartsBar";
import { useGrammarPracticeSession } from "@/presentation/hooks/use-grammar-practice-session";
import { generateGrammarSessionAction } from "@/presentation/actions/grammar-actions";
import ShareResultButton from "@/presentation/components/features/grammar/ShareResultButton";

const QUESTIONS_PER_ROUND = 12;

interface GrammarPracticeProps {
    ruleKey: string;
    ruleTitle: string;
}

function GrammarPractice({ ruleKey, ruleTitle }: GrammarPracticeProps) {
    const t = useTranslations("grammar");
    const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
    const [loading, setLoading] = useState(true);
    const session = useGrammarPracticeSession(questions ?? [], { ruleKeyForProgress: ruleKey });

    async function loadQuestions() {
        setLoading(true);
        const result = await generateGrammarSessionAction([ruleKey], QUESTIONS_PER_ROUND);
        setLoading(false);

        if (!result.isSuccess || result.data.length === 0) {
            toast.error(t("loadError"));
            return;
        }

        setQuestions(result.data);
    }

    useEffect(() => {
        loadQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ruleKey]);

    async function handlePlayAgain() {
        await loadQuestions();
        session.resetSession();
    }

    if (loading || !questions) {
        return <p className="text-center text-[rgb(103,126,119)] py-10">{t("loading")}</p>;
    }

    if (session.isFinished) {
        return (
            <div className="flex flex-col gap-3">
                <PracticeResult
                    onPlayAgain={handlePlayAgain}
                    correctCount={session.correctCount}
                    questionsCount={session.questionsCount}
                    failed={session.failed}
                    maxCombo={session.maxCombo}
                    streakResult={session.streakResult}
                    coinsAward={session.coinsAward}
                    backHref={`/grammar/${ruleKey}`}
                    backLabel={t("backToLesson")}
                />
                <ShareResultButton
                    ruleKeys={[ruleKey]}
                    questionsCount={session.questionsCount}
                    correctCount={session.correctCount}
                    maxCombo={session.maxCombo}
                />
            </div>
        );
    }

    return (
        <>
            <h2 className="text-center text-sm text-[rgb(103,126,119)] mb-2 font-dMSans">{ruleTitle}</h2>
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

export default GrammarPractice;
