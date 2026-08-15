"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { QuizQuestion } from "@/domain/entities/quiz";
import { GrammarRuleSummary } from "@/application/use-cases/grammar/get-grammar-rules";
import RulePicker from "@/presentation/components/features/grammar/RulePicker";
import GrammarExamQuiz from "@/presentation/components/features/grammar/GrammarExamQuiz";
import { generateGrammarSessionAction } from "@/presentation/actions/grammar-actions";

const QUESTIONS_PER_RULE = 4;

interface GrammarExamFlowProps {
    rules: GrammarRuleSummary[];
}

function GrammarExamFlow({ rules }: GrammarExamFlowProps) {
    const t = useTranslations("grammar");
    const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
    const [selectedRuleKeys, setSelectedRuleKeys] = useState<string[]>([]);
    const [pending, setPending] = useState(false);

    async function handleStart(ruleKeys: string[]) {
        setPending(true);
        const result = await generateGrammarSessionAction(ruleKeys, QUESTIONS_PER_RULE);
        setPending(false);

        if (!result.isSuccess || result.data.length === 0) {
            toast.error(t("exam.loadError"));
            return;
        }

        setSelectedRuleKeys(ruleKeys);
        setQuestions(result.data);
    }

    if (questions) {
        return <GrammarExamQuiz questions={questions} ruleKeys={selectedRuleKeys} onChangeRules={() => setQuestions(null)} />;
    }

    return <RulePicker rules={rules} onStart={handleStart} pending={pending} />;
}

export default GrammarExamFlow;
