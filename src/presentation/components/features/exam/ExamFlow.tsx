"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { DictionaryWithWordsCount } from "@/domain/entities/dictionary";
import { Word } from "@/domain/entities/word";
import DictionaryPicker from "@/presentation/components/features/exam/DictionaryPicker";
import ExamQuiz from "@/presentation/components/features/exam/ExamQuiz";
import { getExamWordsAction } from "@/presentation/actions/exam-actions";

interface ExamFlowProps {
    dictionaries: DictionaryWithWordsCount[];
}

function ExamFlow({ dictionaries }: ExamFlowProps) {
    const t = useTranslations("exam");
    const [words, setWords] = useState<Word[] | null>(null);
    const [pending, setPending] = useState(false);

    async function handleStart(dictionaryIds: string[]) {
        setPending(true);
        const result = await getExamWordsAction(dictionaryIds);
        setPending(false);

        if (!result.isSuccess || result.data.length === 0) {
            toast.error(t("loadError"));
            return;
        }

        setWords(result.data);
    }

    if (words) {
        return <ExamQuiz words={words} onChangeDictionaries={() => setWords(null)}/>;
    }

    return <DictionaryPicker dictionaries={dictionaries} onStart={handleStart} pending={pending}/>;
}

export default ExamFlow;
