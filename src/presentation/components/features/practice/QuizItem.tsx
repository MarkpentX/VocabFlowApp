"use client"

import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { QuizQuestion } from "@/domain/entities/quiz";

interface QuizItemProps {
    quizData: QuizQuestion
    onAnswer: (isCorrect: boolean) => void
}

function QuizItem({quizData, onAnswer}: QuizItemProps) {
    const t = useTranslations("practice");

    function onSubmit(answer: string) {
        const isCorrect = answer === quizData.correct;
        if (isCorrect){
            toast.success(t("correct"))
        } else {
            toast.error(t("correctAnswerWas", {answer: quizData.correct}))
        }
        onAnswer(isCorrect);
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
