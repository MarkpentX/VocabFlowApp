"use client";

import { useForm } from "react-hook-form";
import React from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { ControllerResult } from "@/application/shared/controller-result";

interface DeleteFormProps {
    id: string;
    deleteAction: (id: string) => Promise<ControllerResult>;
}

export function DeleteForm({ id, deleteAction }: DeleteFormProps) {
    const t = useTranslations("common");
    const { register, handleSubmit } = useForm<{ id: string }>();

    async function onSubmit() {
        const result = await deleteAction(id);
        if (!result.isSuccess) {
            toast.error(t("deleteError"));
        } else {
            toast.success(t("deleteSuccess"));
        }
    }

    return (
        <form className="justify-self-end row-span-2 self-center items-center" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" value={id} {...register("id")} />
            <button type="submit" className="p-2 -m-2 rounded-full hover:bg-red-50 active:scale-95 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" className="lucide text-red-500 lucide-trash2 w-6 h-6">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
            </button>
        </form>
    );
}
