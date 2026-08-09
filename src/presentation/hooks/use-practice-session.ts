"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Word } from "@/domain/entities/word";
import { StreakUpdateResult } from "@/domain/entities/streak";
import { recordPracticeCompletionAction } from "@/presentation/actions/streak-actions";

export const MAX_HEARTS = 3;
const COMBO_TOAST_THRESHOLD = 3;

export interface PracticeSession {
    index: number;
    progress: number;
    isFinished: boolean;
    failed: boolean;
    hearts: number;
    combo: number;
    maxCombo: number;
    correctCount: number;
    questionsCount: number;
    streakResult: StreakUpdateResult | null;
    onAnswer: (isCorrect: boolean) => void;
    resetSession: () => void;
}

export function usePracticeSession(words: Word[]): PracticeSession {
    const t = useTranslations("practice");

    const [index, setIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [failed, setFailed] = useState(false);
    const [hearts, setHearts] = useState(MAX_HEARTS);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [streakResult, setStreakResult] = useState<StreakUpdateResult | null>(null);

    const prevComboRef = useRef(0);
    const recordedRef = useRef(false);

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
        recordPracticeCompletionAction().then((result) => {
            if (result.isSuccess) {
                setStreakResult(result.data);
            }
        });
    }, [isFinished]);

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

        const isLastWord = index === words.length - 1;

        if (nextHearts <= 0) {
            setFailed(true);
            setIsFinished(true);
            setIndex(0);
        } else if (isLastWord) {
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
        setHearts(MAX_HEARTS);
        setCombo(0);
        setMaxCombo(0);
        setStreakResult(null);
        prevComboRef.current = 0;
        recordedRef.current = false;
    }

    const progress = (index / words.length) * 100;

    return {
        index,
        progress,
        isFinished,
        failed,
        hearts,
        combo,
        maxCombo,
        correctCount,
        questionsCount: words.length,
        streakResult,
        onAnswer,
        resetSession,
    };
}
