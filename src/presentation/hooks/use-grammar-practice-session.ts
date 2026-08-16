"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { QuizQuestion } from "@/domain/entities/quiz";
import { StreakUpdateResult } from "@/domain/entities/streak";
import { PracticeCoinsAward } from "@/domain/entities/coins";
import { recordPracticeCompletionAction } from "@/presentation/actions/streak-actions";
import { startPracticeSessionAction, completePracticeSessionAction } from "@/presentation/actions/practice-session-actions";
import { recordGrammarAttemptAction } from "@/presentation/actions/grammar-actions";

export const MAX_HEARTS = 3;
const COMBO_TOAST_THRESHOLD = 3;

export interface GrammarPracticeSession {
    index: number;
    progress: number;
    isFinished: boolean;
    failed: boolean;
    hearts: number;
    maxHearts: number;
    combo: number;
    maxCombo: number;
    correctCount: number;
    questionsCount: number;
    streakResult: StreakUpdateResult | null;
    coinsAward: PracticeCoinsAward | null;
    sessionId: string | null;
    onAnswer: (isCorrect: boolean) => void;
    resetSession: () => void;
}

interface UseGrammarPracticeSessionOptions {
    awardsCoins?: boolean;
    maxHearts?: number;
    ruleKeyForProgress?: string;
}

export function useGrammarPracticeSession(
    questions: QuizQuestion[],
    options: UseGrammarPracticeSessionOptions = {}
): GrammarPracticeSession {
    const { awardsCoins = true, maxHearts = MAX_HEARTS, ruleKeyForProgress } = options;
    const t = useTranslations("practice");

    const [index, setIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [failed, setFailed] = useState(false);
    const [hearts, setHearts] = useState(maxHearts);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [streakResult, setStreakResult] = useState<StreakUpdateResult | null>(null);
    const [coinsAward, setCoinsAward] = useState<PracticeCoinsAward | null>(null);

    const prevComboRef = useRef(0);
    const recordedRef = useRef(false);
    const sessionIdRef = useRef<string | null>(null);

    // Server-issued proof that a round with this many questions actually started —
    // required to redeem coins on completion, so the award endpoint can't be farmed
    // by calling it directly without ever playing.
    function startSession() {
        sessionIdRef.current = null;
        if (questions.length === 0) {
            return;
        }
        startPracticeSessionAction(questions.length).then((result) => {
            if (result.isSuccess) {
                sessionIdRef.current = result.data.id;
            }
        });
    }

    useEffect(() => {
        startSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions]);

    useEffect(() => {
        if (combo >= COMBO_TOAST_THRESHOLD && combo > prevComboRef.current) {
            toast.success(t("comboMessage", { count: combo }), { icon: "🔥" });
        }
        prevComboRef.current = combo;
    }, [combo, t]);

    useEffect(() => {
        if (!isFinished || recordedRef.current) {
            return;
        }
        recordedRef.current = true;

        const isPerfect = !failed && questions.length > 0 && correctCount === questions.length;
        const sessionId = sessionIdRef.current;

        if (ruleKeyForProgress) {
            recordGrammarAttemptAction({
                ruleKey: ruleKeyForProgress,
                attempts: questions.length,
                correct: correctCount,
                bestStreak: maxCombo,
            });
        }

        recordPracticeCompletionAction().then((result) => {
            if (!result.isSuccess) {
                return;
            }
            setStreakResult(result.data);

            if (awardsCoins && isPerfect && sessionId) {
                completePracticeSessionAction(sessionId, result.data.currentStreak).then((coinsResult) => {
                    if (coinsResult.isSuccess) {
                        setCoinsAward(coinsResult.data);
                    }
                });
            }
        });
    }, [isFinished, failed, correctCount, questions.length, awardsCoins, maxCombo, ruleKeyForProgress]);

    function onAnswer(isCorrect: boolean) {
        let nextHearts = hearts;
        let nextCombo = combo;

        if (isCorrect) {
            setCorrectCount((c) => c + 1);
            nextCombo = combo + 1;
            setCombo(nextCombo);
            setMaxCombo((m) => Math.max(m, nextCombo));
        } else {
            nextCombo = 0;
            setCombo(0);
            nextHearts = Math.max(0, hearts - 1);
            setHearts(nextHearts);
        }

        const isLastQuestion = index === questions.length - 1;

        if (nextHearts <= 0) {
            setFailed(true);
            setIsFinished(true);
            setIndex(0);
        } else if (isLastQuestion) {
            setIsFinished(true);
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    function resetSession() {
        setIndex(0);
        setCorrectCount(0);
        setIsFinished(false);
        setFailed(false);
        setHearts(maxHearts);
        setCombo(0);
        setMaxCombo(0);
        setStreakResult(null);
        setCoinsAward(null);
        prevComboRef.current = 0;
        recordedRef.current = false;
        startSession();
    }

    const progress = questions.length === 0 ? 0 : (index / questions.length) * 100;

    return {
        index,
        progress,
        isFinished,
        failed,
        hearts,
        maxHearts,
        combo,
        maxCombo,
        correctCount,
        questionsCount: questions.length,
        streakResult,
        coinsAward,
        sessionId: sessionIdRef.current,
        onAnswer,
        resetSession,
    };
}
