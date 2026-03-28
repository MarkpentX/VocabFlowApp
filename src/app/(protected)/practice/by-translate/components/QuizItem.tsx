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
    const {register, handleSubmit, resetField} = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema)
    });

    async function onSubmit(data: z.infer<typeof AnswerSchema>) {
        console.log(data.answer)

        if (data.answer.toLowerCase().trim() === word.meaning.toLowerCase()){
            toast.success("Correct!")
        } else {
            toast.error('correct: ' + word.meaning.toLowerCase())
        }
        onNextQuestion();
        resetField("answer");
    }


    return (
        <div className="p-6 bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-xl">
            <h3 className="font-bold text-3xl mb-6.5">{word.infinitive}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="rounded-md p-2 bg-[rgb(248,249,245)] border-1 border-[rgb(226,229,220)] mb-6">
                    <label htmlFor="answer"></label>
                    <input
                        type="text"
                        placeholder="Write a translation:"
                        id="answer"
                        className="border-none focus:border-none focus:ring-0 outline-none w-full bg-transparent"
                        {...register("answer")}
                    />
                    {/*<span>{formState.errors.answer?.message}</span>*/}
                </p>
                <button className='bg-[rgba(37,177,95,0.9)] p-3 text-center text-white w-full text-sm rounded-xl font-dMSans' type="submit">Сheck</button>
            </form>
        </div>
    );
}

export default QuizItem;