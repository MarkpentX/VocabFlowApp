'use client'
import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateUserSchema} from "@/features/auth/schemas";
import {CreateUserData} from "@/features/auth/types";
import {createUserAction} from "@/features/auth/controllers/createUserAction";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";

function SignInForm() {
    const {register, handleSubmit, formState, resetField} = useForm<CreateUserData>({
        resolver: zodResolver(CreateUserSchema)
    });

    async function onSubmit(data: CreateUserData) {
        const result = await createUserAction(data)
        if (result.isSuccess){
            toast.success("Successfully!");
            redirect("/dashboard")
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
                <label className="text-[rgb(18,33,28)] font-dMSans text-sm font-bold mb-1" htmlFor="username">Username:</label>
                <input className="h-10 border-1 border-[rgb(226,229,220)] text-sm text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md" placeholder="Username:" id="username" type="text" {...register("username")}/>
                <span>{formState.errors.username?.message}</span>
            </p>

            <p className="flex flex-col">
                <label htmlFor="password" className="text-[rgb(18,33,28)] font-dMSans text-sm font-bold mb-1">Password:</label>
                <input className="h-10 border-1 border-[rgb(226,229,220)] text-sm  text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md" placeholder="Passwrod:" id="password" type="password" {...register("password")}/>
                <span>{formState.errors.password?.message}</span>
            </p>

            <button className="bg-[rgb(37,177,95)] rounded-xl font-bold text-white py-2.5 text-sm" type="submit">Continue</button>
        </form>
    );
}

export default SignInForm;