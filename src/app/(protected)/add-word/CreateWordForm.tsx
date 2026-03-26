'use client'
import React from 'react';
import toast from 'react-hot-toast';
import z from 'zod';
import {CreateWordSchema} from "@/features/words/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateWord} from "@/features/words/types";
import {createWordAction} from "@/features/words/controllers/createWordAction";

function CreateWordForm() {
    const {register, handleSubmit, formState, resetField} = useForm<z.infer<typeof CreateWordSchema>>({
        resolver: zodResolver(CreateWordSchema)
    });

    async function onSubmit(data: CreateWord) {
        const result = await createWordAction(data)
        if (result.isSuccess) {
            toast.success("The word has been created!");
            resetField("infinitive")
            resetField("meaning")
        } else {
            toast.error(result.message ?? "An error occurred");
        }
    }

    return (
        <form className="mt-10 flex flex-col gap-4 bg-[rgb(255,255,255)]
        border-[rgb(226,229,220)]
        drop-shadow-sm shadow-black rounded-xl p-6
        min-w-md mx-auto max-md:min-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
            <p className="flex flex-col">
                <label className="text-[rgb(18,33,28)] font-dMSans text-sm font-bold mb-1" htmlFor="infinitive">Word</label>
                <input className="h-10 border-1 border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md" placeholder="e.g. apple" id="infinitive" type="text" {...register("infinitive")}/>
                <span>{formState.errors.infinitive?.message}</span>
            </p>

            <p className="flex flex-col">
                <label htmlFor="meaning" className="text-[rgb(18,33,28)] font-dMSans text-sm font-bold mb-1">Meaning / Translation</label>
                <input className="h-10 border-1 border-[rgb(226,229,220)] text-sm  text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md" placeholder="e.g. яблоко" id="meaning" type="text" {...register("meaning")}/>
                <span>{formState.errors.meaning?.message}</span>
            </p>

            <p className="flex flex-col">
                <label className="text-[rgb(18,33,28)] font-dMSans text-sm font-bold mb-1" htmlFor="tag">Tag</label>
                <input className="h-10 border-1 border-[rgb(226,229,220)]  text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md" id="tag" placeholder="e.g fruits" type="text" {...register("tag", { required: false })}/>
                <span>{formState.errors.tag?.message}</span>
            </p>

            <button className="bg-[rgb(37,177,95)] rounded-xl font-bold text-white py-2.5 text-sm" type="submit">Save word</button>
        </form>
    );
}

export default CreateWordForm;