'use client'
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema } from "@/domain/validation/user.schema";
import { NewUserInput } from "@/domain/entities/user";
import { registerUserAction } from "@/presentation/actions/auth-actions";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

function SignInForm() {
    const t = useTranslations("auth");
    const router = useRouter();
    const { register, handleSubmit, formState } = useForm<NewUserInput>({
        resolver: zodResolver(CreateUserSchema)
    });

    async function onSubmit(data: NewUserInput) {
        const result = await registerUserAction(data)

        if (result.isSuccess) {
            toast.success(t("signInSuccess"));
            router.push("/dashboard")
        } else if (result.message === "incorrect_password") {
            toast.error(t("incorrectPassword"));
        } else {
            toast.error(t("genericError"));
        }
    }

    return (
        <form className="mt-10 flex flex-col gap-4 bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black rounded-xl p-6 w-full max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <p className="flex flex-col">
                <label className="text-[rgb(18,33,28)] font-dMSans text-sm font-bold mb-1" htmlFor="username">{t("usernameLabel")}</label>
                <input className="h-11 border-1 border-[rgb(226,229,220)] text-base text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md" placeholder={t("usernameLabel")} id="username" type="text" autoComplete="username" {...register("username")}/>
                <span>{formState.errors.username?.message}</span>
            </p>

            <p className="flex flex-col">
                <label htmlFor="password" className="text-[rgb(18,33,28)] font-dMSans text-sm font-bold mb-1">{t("passwordLabel")}</label>
                <input className="h-11 border-1 border-[rgb(226,229,220)] text-base text-[rgb(18,33,28)] bg-[rgb(248,249,245)] px-3 py-2 rounded-md" placeholder={t("passwordLabel")} id="password" type="password" autoComplete="current-password" {...register("password")}/>
                <span>{formState.errors.password?.message}</span>
            </p>

            <button className="bg-[rgb(37,177,95)] rounded-xl font-bold text-white py-2.5 text-sm" type="submit">{t("continueButton")}</button>
        </form>
    );
}

export default SignInForm;
