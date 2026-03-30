"use client"

import {useForm} from "react-hook-form";
import {z} from "zod";
import {AnswerSchema} from "@/features/words/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {quizDataItem} from "@/features/quiz/types";

interface QuizItemProps {
    quizData: quizDataItem
    onNextQuestion: () => void
    addCorrect: () => void
}

function QuizItem({quizData, onNextQuestion, addCorrect}: QuizItemProps) {
    const {register, handleSubmit, resetField} = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema)
    });

    async function onSubmit(answer: string) {
        console.log(answer)

        if (answer === quizData.correct){
            toast.success("Correct!")
            addCorrect()
        } else {
            toast.error('correct: ' + quizData.correct)
        }
        onNextQuestion();
    }


    return (
        <div className="p-6 bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-xl">
            <h3 className="font-bold text-3xl mb-6.5">{quizData.question}</h3>
            <div className="grid grid-cols-1 gap-2">
                {quizData.answers.map((answer) => (
                    <button onClick={() => onSubmit(answer)} className="text-[rgb(18,33,28)] text-left text-sm rounded-md bg-[rgb(248,249,245)] border border-[rgb(226,229,220)] py-3 px-4 hover:bg-gray-200" key={answer}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuizItem;