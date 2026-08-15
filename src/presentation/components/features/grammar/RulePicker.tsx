"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GrammarRuleSummary } from "@/application/use-cases/grammar/get-grammar-rules";
import { MIN_GRAMMAR_EXAM_RULES } from "@/domain/entities/grammar";

interface RulePickerProps {
    rules: GrammarRuleSummary[];
    onStart: (ruleKeys: string[]) => void;
    pending: boolean;
}

function RulePicker({ rules, onStart, pending }: RulePickerProps) {
    const t = useTranslations("grammar");
    const [selected, setSelected] = useState<Set<string>>(new Set());

    function toggle(key: string) {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    }

    const canStart = selected.size >= MIN_GRAMMAR_EXAM_RULES;

    return (
        <div className="max-w-2xl mx-auto w-full">
            <h2 className="text-center text-[rgb(103,126,119)] font-dMSans text-sm mb-1">{t("exam.pickerTitle")}</h2>
            <p className="text-center text-xs text-[rgb(103,126,119)] mb-6">
                {t("exam.minRules", { count: MIN_GRAMMAR_EXAM_RULES })}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {rules.map((rule) => {
                    const isSelected = selected.has(rule.key);
                    return (
                        <li key={rule.key}>
                            <button
                                type="button"
                                onClick={() => toggle(rule.key)}
                                className={
                                    isSelected
                                        ? "w-full flex items-center justify-between text-left p-4 rounded-xl border-2 border-[rgb(37,177,95)] bg-green-50 transition"
                                        : "w-full flex items-center justify-between text-left p-4 rounded-xl border border-[rgb(226,229,220)] bg-[rgb(255,255,255)] hover:bg-gray-50 transition"
                                }
                            >
                                <span>
                                    <span className="block text-black">{t(`rules.${rule.key}.title`)}</span>
                                    <span className="block text-xs text-[rgb(103,126,119)]">{rule.level}</span>
                                </span>
                                <motion.span
                                    animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-5 h-5 shrink-0 rounded-full bg-[rgb(37,177,95)] flex items-center justify-center text-white text-xs"
                                >
                                    ✓
                                </motion.span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            <button
                type="button"
                disabled={!canStart || pending}
                onClick={() => onStart(Array.from(selected))}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white bg-[rgba(37,177,95,0.95)] cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
                {t("exam.start")}
            </button>
        </div>
    );
}

export default RulePicker;
