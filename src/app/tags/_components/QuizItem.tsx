"use client"

import {DbWord} from "@/features/words/types";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {AnswerSchema} from "@/features/words/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

interface QuizItemProps {
    word: DbWord
    onNextQuestion: () => void
}

function QuizItem({word, onNextQuestion}: QuizItemProps) {
    const {register, handleSubmit, formState, resetField} = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema)
    });

    async function onSubmit(data: z.infer<typeof AnswerSchema>) {
        console.log(data.answer)

        if (data.answer.toLowerCase().trim() === word.meaning.toLowerCase()){
            toast.success("Correct Answer!")
            onNextQuestion()
        } else {
            toast.error("UnCorrect Answer!")
            onNextQuestion()
        }

        resetField("answer");
    }

    return (
        <>
            <h3>{word.infinitive}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>
                    <label htmlFor="answer">Enter meaning</label>
                    <input type="text" id="answer" {...register("answer")}/>
                    <span>{formState.errors.answer?.message}</span>
                </p>
                <button type="submit">Next</button>
            </form>
        </>
    );
}

export default QuizItem;