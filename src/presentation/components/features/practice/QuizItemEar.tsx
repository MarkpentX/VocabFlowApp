"use client"

import { Word } from "@/domain/entities/word";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerSchema } from "@/domain/validation/word.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import SoundButton from "@/presentation/components/features/words/SoundButton";

interface QuizItemEarProps {
    word: Word
    onAnswer: (isCorrect: boolean) => void
}

function QuizItemEar({word, onAnswer}: QuizItemEarProps) {
    const t = useTranslations("practice");
    const {register, handleSubmit, resetField} = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema)
    });

    async function onSubmit(data: z.infer<typeof AnswerSchema>) {
        const isCorrect = data.answer.toLowerCase().trim() === word.meaning.toLowerCase();
        if (isCorrect){
            toast.success(t("correct"))
        } else {
            toast.error(t("correctAnswerWas", {answer: word.meaning.toLowerCase()}))
        }
        onAnswer(isCorrect);
        resetField("answer");
    }

    return (
        <div className="p-6 bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-xl">
            <SoundButton word={word.infinitive} lang="en" className="flex mx-auto items-center justify-center mt-4 mb-4 p-6 rounded-full border border-[rgba(37,177,95,0.3)] bg-[rgb(248,249,245)]"/>
            <p className="text-sm text-[rgb(103,126,119)] mb-4 text-center">{t("listenAndWrite")}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="rounded-md p-2 bg-[rgb(248,249,245)] border-1 border-[rgb(226,229,220)] mb-6">
                    <label htmlFor="answer"></label>
                    <input
                        type="text"
                        placeholder={t("writeWordHeardPlaceholder")}
                        id="answer"
                        className="border-none focus:border-none focus:ring-0 outline-none w-full bg-transparent"
                        {...register("answer")}
                    />
                </p>
                <button className='bg-[rgba(37,177,95,0.9)] p-3 text-center text-white w-full text-sm rounded-xl font-dMSans' type="submit">{t("check")}</button>
            </form>
        </div>
    );
}

export default QuizItemEar;
