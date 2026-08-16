"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { DiagnosticLevel, GrammarDiagnosticQuestion } from "@/domain/entities/grammar-diagnostic";
import GrammarDiagnosticStart from "@/presentation/components/features/grammar/GrammarDiagnosticStart";
import GrammarDiagnosticQuiz from "@/presentation/components/features/grammar/GrammarDiagnosticQuiz";
import { generateGrammarDiagnosticAction } from "@/presentation/actions/grammar-actions";
import { startPracticeSessionAction } from "@/presentation/actions/practice-session-actions";

function GrammarDiagnosticFlow() {
    const t = useTranslations("grammar");
    const [questions, setQuestions] = useState<GrammarDiagnosticQuestion[] | null>(null);
    const [level, setLevel] = useState<DiagnosticLevel | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    async function handleStart(selectedLevel: DiagnosticLevel) {
        setPending(true);
        const result = await generateGrammarDiagnosticAction(selectedLevel);

        if (!result.isSuccess || result.data.length === 0) {
            setPending(false);
            toast.error(t("diagnostic.loadError"));
            return;
        }

        const session = await startPracticeSessionAction(result.data.length);
        setPending(false);

        setLevel(selectedLevel);
        setQuestions(result.data);
        setSessionId(session.isSuccess ? session.data.id : null);
    }

    if (questions && level) {
        return (
            <GrammarDiagnosticQuiz
                questions={questions}
                level={level}
                sessionId={sessionId}
                onRetake={() => setQuestions(null)}
            />
        );
    }

    return <GrammarDiagnosticStart onStart={handleStart} pending={pending} />;
}

export default GrammarDiagnosticFlow;
