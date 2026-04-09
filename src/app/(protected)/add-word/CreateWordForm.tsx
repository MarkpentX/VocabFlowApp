'use client'

import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateWordSchema } from "@/features/words/schemas";
import { CreateWord } from "@/features/words/types";
import { createWordAction } from "@/features/words/controllers/createWordAction";

function CreateWordForm() {

    const {
        register,
        handleSubmit,
        formState,
        resetField,
        watch,
        setValue
    } = useForm<z.infer<typeof CreateWordSchema>>({
        resolver: zodResolver(CreateWordSchema),
        defaultValues: {
            infinitive: "",
            meaning: "",
            tag: "",
            language: "ru"
        }
    });

    const word = watch("infinitive");
    const language = watch("language");

    const cache = useRef<Record<string, string>>({});

    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!word || word.trim().length < 2) {
                setValue("meaning", "");
                return;
            }

            const cacheKey = `${word}-${language}`;

            if (cache.current[cacheKey]) {
                setValue("meaning", cache.current[cacheKey]);
                return;
            }

            try {
                setIsTranslating(true);

                const res = await fetch("/api/translate", {
                    method: "POST",
                    body: JSON.stringify({
                        text: word,
                        target: language
                    })
                });

                const data = await res.json();

                cache.current[cacheKey] = data.translation;
                setValue("meaning", data.translation);

            } catch {
                console.error("Translation error");
            } finally {
                setIsTranslating(false);
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [word, language, setValue]);

    async function onSubmit(data: CreateWord) {
        const result = await createWordAction(data);

        if (result.isSuccess) {
            toast.success("The word has been created!");
            resetField("infinitive");
            resetField("meaning");
            // resetField("tag"); // если нужно сбрасывать тег тоже
        } else {
            toast.error(result.message ?? "An error occurred");
        }
    }

    return (
        <form
            className="mt-10 flex flex-col gap-4 bg-white border border-[rgb(226,229,220)] drop-shadow-sm rounded-xl p-6 min-w-md mx-auto max-md:min-w-[300px]"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p className="flex flex-col">
                <label className="text-sm font-bold mb-1">Translate to</label>
                <select
                    className="h-10 border border-[rgb(226,229,220)] bg-[rgb(248,249,245)] rounded-md px-3"
                    {...register("language")}
                >
                    <option value="ru">Russian</option>
                    <option value="uk">Ukrainian</option>
                    <option value="en">English</option>
                </select>
            </p>

            <p className="flex flex-col">
                <label className="text-sm font-bold mb-1" htmlFor="infinitive">Word</label>
                <input
                    className="h-10 border border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md"
                    placeholder="e.g. apple"
                    id="infinitive"
                    type="text"
                    {...register("infinitive")}
                />
                <span className="text-red-500 text-xs">{formState.errors.infinitive?.message}</span>
            </p>

            <p className="flex flex-col relative">
                <label className="text-sm font-bold mb-1" htmlFor="meaning">Meaning / Translation</label>
                <input
                    className="h-10 border border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md"
                    placeholder={isTranslating ? "Translating..." : "translation"}
                    id="meaning"
                    type="text"
                    {...register("meaning")}
                />
                <span className="text-red-500 text-xs">{formState.errors.meaning?.message}</span>
            </p>

            <p className="flex flex-col">
                <label className="text-sm font-bold mb-1" htmlFor="tag">Tag</label>
                <input
                    className="h-10 border border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md"
                    id="tag"
                    placeholder="e.g fruits"
                    type="text"
                    {...register("tag")}
                />
                <span className="text-red-500 text-xs">{formState.errors.tag?.message}</span>
            </p>

            <button
                className="bg-[rgb(37,177,95)] rounded-xl font-bold text-white py-2.5 text-sm"
                type="submit"
            >
                Save word
            </button>
        </form>
    );
}

export default CreateWordForm;