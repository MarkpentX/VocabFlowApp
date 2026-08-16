"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { WritingPrompt, WritingScore } from "@/domain/entities/level-test";
import { scoreLevelTestWritingAction } from "@/presentation/actions/level-test-actions";

interface WritingTaskProps {
    prompt: WritingPrompt;
    onSubmit: (score: WritingScore | null) => void;
}

function WritingTask({ prompt, onSubmit }: WritingTaskProps) {
    const t = useTranslations("levelTest");
    const [text, setText] = useState("");
    const [pending, setPending] = useState(false);
    const wordCount = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
    const reachedTarget = wordCount >= prompt.minWords;

    async function handleSubmit() {
        setPending(true);
        const result = await scoreLevelTestWritingAction(text, prompt.minWords);
        setPending(false);
        onSubmit(result.isSuccess ? result.data : null);
    }

    return (
        <div className="max-w-2xl mx-auto w-full">
            <p className="text-center text-xs font-semibold text-[rgb(103,126,119)] uppercase tracking-wide mb-2">
                {t("sections.writing")}
            </p>

            <div className="mb-4 p-5 bg-[rgb(248,249,245)] border border-[rgb(226,229,220)] rounded-xl">
                <p className="text-sm text-[rgb(18,33,28)] leading-relaxed">{prompt.prompt}</p>
                <p className="text-xs text-[rgb(103,126,119)] mt-2">{t("writing.minWords", { count: prompt.minWords })}</p>
            </div>

            <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={12}
                placeholder={t("writing.placeholder")}
                className="w-full border border-[rgb(226,229,220)] rounded-xl p-4 text-sm text-[rgb(18,33,28)] bg-white resize-y focus:outline-none focus:ring-2 focus:ring-[rgb(37,177,95)]"
            />

            <div className="flex justify-end items-center mt-2 mb-5">
                <span className={reachedTarget ? "text-xs text-[rgb(37,177,95)] font-semibold tabular-nums" : "text-xs text-[rgb(103,126,119)] tabular-nums"}>
                    {t("writing.wordCount", { count: wordCount })}
                </span>
            </div>

            <p className="text-xs text-[rgb(103,126,119)] mb-5">{t("writing.disclaimer")}</p>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => onSubmit(null)}
                    className="flex-1 px-4 py-2.5 rounded-md text-[rgb(103,126,119)] border border-[rgb(226,229,220)] bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    {t("writing.skip")}
                </button>
                <button
                    type="button"
                    disabled={pending || wordCount === 0}
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-white bg-[rgba(37,177,95,0.95)] cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                    {t("writing.submit")}
                </button>
            </div>
        </div>
    );
}

export default WritingTask;
