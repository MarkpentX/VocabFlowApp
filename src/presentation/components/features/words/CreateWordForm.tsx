'use client'

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { CreateWordSchema } from "@/domain/validation/word.schema";
import { NewWordInput, WORD_LANGUAGES } from "@/domain/entities/word";
import { createWordAction } from "@/presentation/actions/word-actions";

type TranslationStatus = "idle" | "loading" | "success" | "error";

function CreateWordForm() {
    const t = useTranslations("words");

    const {
        register,
        handleSubmit,
        formState,
        resetField,
        watch,
        setValue
    } = useForm<NewWordInput>({
        resolver: zodResolver(CreateWordSchema),
        defaultValues: {
            infinitive: "",
            meaning: "",
            tag: "",
            meaningLang: "ru"
        }
    });

    const word = watch("infinitive");
    const meaningLang = watch("meaningLang");

    const [translationStatus, setTranslationStatus] = useState<TranslationStatus>("idle");

    useEffect(() => {
        if (!word || word.trim().length < 2) {
            setValue("meaning", "");
            setTranslationStatus("idle");
            return;
        }

        const controller = new AbortController();

        const timeout = setTimeout(async () => {
            try {
                setTranslationStatus("loading");

                const res = await fetch("/api/translate", {
                    method: "POST",
                    body: JSON.stringify({
                        text: word,
                        source: "en",
                        target: meaningLang
                    }),
                    signal: controller.signal
                });

                const data = await res.json();

                if (!res.ok || !data.translation) {
                    setTranslationStatus("error");
                    return;
                }

                setValue("meaning", data.translation, { shouldValidate: true });
                setTranslationStatus("success");
            } catch (err) {
                if ((err as Error).name !== "AbortError") {
                    setTranslationStatus("error");
                }
            }
        }, 400);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [word, meaningLang, setValue]);

    async function onSubmit(data: NewWordInput) {
        const result = await createWordAction(data);

        if (result.isSuccess) {
            toast.success(t("createdSuccess"));
            resetField("infinitive");
            resetField("meaning");
            setTranslationStatus("idle");
        } else {
            toast.error(result.message ?? t("createdError"));
        }
    }

    return (
        <form
            className="mt-10 flex flex-col gap-4 bg-white border border-[rgb(226,229,220)] drop-shadow-sm rounded-xl p-6 w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p className="flex flex-col">
                <label className="text-sm font-bold mb-1">{t("translateToLabel")}</label>
                <select
                    className="h-10 border border-[rgb(226,229,220)] bg-[rgb(248,249,245)] rounded-md px-3"
                    {...register("meaningLang")}
                >
                    {WORD_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{t(`languages.${lang}`)}</option>
                    ))}
                </select>
            </p>

            <p className="flex flex-col">
                <label className="text-sm font-bold mb-1" htmlFor="infinitive">{t("wordLabel")}</label>
                <input
                    className="h-10 border border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md"
                    placeholder={t("wordPlaceholder")}
                    id="infinitive"
                    type="text"
                    {...register("infinitive")}
                />
                <span className="text-red-500 text-xs">{formState.errors.infinitive?.message}</span>
            </p>

            <p className="flex flex-col relative">
                <label className="text-sm font-bold mb-1" htmlFor="meaning">{t("meaningLabel")}</label>
                <input
                    className="h-10 border border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md"
                    placeholder={translationStatus === "loading" ? t("translatingPlaceholder") : t("meaningPlaceholder")}
                    id="meaning"
                    type="text"
                    {...register("meaning")}
                />
                {translationStatus === "error" && (
                    <span className="text-amber-600 text-xs mt-1">{t("translationError")}</span>
                )}
                <span className="text-red-500 text-xs">{formState.errors.meaning?.message}</span>
            </p>

            <p className="flex flex-col">
                <label className="text-sm font-bold mb-1" htmlFor="tag">{t("tagLabel")}</label>
                <input
                    className="h-10 border border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md"
                    id="tag"
                    placeholder={t("tagPlaceholder")}
                    type="text"
                    {...register("tag")}
                />
                <span className="text-red-500 text-xs">{formState.errors.tag?.message}</span>
            </p>

            <button
                className="bg-[rgb(37,177,95)] rounded-xl font-bold text-white py-2.5 text-sm"
                type="submit"
            >
                {t("saveButton")}
            </button>
        </form>
    );
}

export default CreateWordForm;
