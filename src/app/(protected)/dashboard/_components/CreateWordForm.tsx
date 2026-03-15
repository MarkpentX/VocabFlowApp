'use client'
import React from 'react';
import toast from 'react-hot-toast';
import z from 'zod';
import {CreateWordSchema} from "@/features/words/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateWord} from "@/features/words/types";
import {createWordAction} from "@/app/(protected)/dashboard/actions";

function CreateWordForm() {
    const {register, handleSubmit, formState} = useForm<z.infer<typeof CreateWordSchema>>({
        resolver: zodResolver(CreateWordSchema)
    });

    async function onSubmit(data: CreateWord) {
        console.log('data', data);
        const result = await createWordAction(data)
        if (!result.error) {
            toast.success(result.message!)
        }
        if (result.error){
            toast.error(result.message!)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>
                <label htmlFor="infinitive">Enter infinitive:</label>
                <input id="infinitive" type="text" {...register("infinitive")}/>
                <span>{formState.errors.infinitive?.message}</span>
            </p>

            <p>
                <label htmlFor="meaning">Enter meaning:</label>
                <input id="meaning" type="text" {...register("meaning")}/>
                <span>{formState.errors.meaning?.message}</span>
            </p>

            <p>
                <label htmlFor="tag">Enter tag:</label>
                <input id="tag" type="text" {...register("tag", { required: false })}/>
                <span>{formState.errors.tag?.message}</span>
            </p>

            <button type="submit">Create word</button>
        </form>
    );
}

export default CreateWordForm;