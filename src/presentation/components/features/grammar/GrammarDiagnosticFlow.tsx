"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { DiagnosticLevel, GrammarDiagnosticQuestion } from "@/domain/entities/grammar-diagnostic";
import GrammarDiagnosticStart from "@/presentation/components/features/grammar/GrammarDiagnosticStart";
import GrammarDiagnosticQuiz from "@/presentation/components/features/grammar/GrammarDiagnosticQuiz";
import { generateGrammarDiagnosticAction } from "@/presentation/actions/grammar-actions";

function GrammarDiagnosticFlow() {
    const t = useTranslations("grammar");
    const [questions, setQuestions] = useState<GrammarDiagnosticQuestion[] | null>(null);
    const [level, setLevel] = useState<DiagnosticLevel | null>(null);
    const [pending, setPending] = useState(false);

    async function handleStart(selectedLevel: DiagnosticLevel) {
        setPending(true);
        const result = await generateGrammarDiagnosticAction(selectedLevel);
        setPending(false);

        if (!result.isSuccess || result.data.length === 0) {
            toast.error(t("diagnostic.loadError"));
            return;
        }

        setLevel(selectedLevel);
        setQuestions(result.data);
    }

    if (questions && level) {
        return <GrammarDiagnosticQuiz questions={questions} level={level} onRetake={() => setQuestions(null)} />;
    }

    return <GrammarDiagnosticStart onStart={handleStart} pending={pending} />;
}

export default GrammarDiagnosticFlow;
