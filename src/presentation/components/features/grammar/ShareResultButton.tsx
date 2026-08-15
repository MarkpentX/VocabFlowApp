"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { createSharedGrammarResultAction } from "@/presentation/actions/grammar-actions";

interface ShareResultButtonProps {
    ruleKeys: string[];
    questionsCount: number;
    correctCount: number;
    maxCombo: number;
}

function ShareResultButton({ ruleKeys, questionsCount, correctCount, maxCombo }: ShareResultButtonProps) {
    const t = useTranslations("grammar");
    const locale = useLocale();
    const [pending, setPending] = useState(false);
    const [shared, setShared] = useState(false);

    async function handleShare() {
        setPending(true);
        const result = await createSharedGrammarResultAction({ ruleKeys, questionsCount, correctCount, maxCombo });
        setPending(false);

        if (!result.isSuccess) {
            toast.error(t("share.error"));
            return;
        }

        const url = `${window.location.origin}/${locale}/results/${result.data.id}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: t("share.shareTitle"), url });
                setShared(true);
                return;
            } catch {
                // user cancelled the native share sheet — fall through to clipboard copy
            }
        }

        try {
            await navigator.clipboard.writeText(url);
            toast.success(t("share.linkCopied"));
            setShared(true);
        } catch {
            toast.error(t("share.error"));
        }
    }

    return (
        <button
            type="button"
            disabled={pending}
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-[rgb(37,177,95)] border border-[rgb(37,177,95)] bg-white cursor-pointer w-full transition-transform duration-150 hover:scale-[1.02] hover:bg-green-50 active:scale-95 disabled:opacity-60"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            {shared ? t("share.shared") : t("share.button")}
        </button>
    );
}

export default ShareResultButton;
