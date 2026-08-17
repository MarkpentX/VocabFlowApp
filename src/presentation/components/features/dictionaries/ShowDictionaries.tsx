import React from 'react';
import { Link } from "@/i18n/navigation";
import { DeleteForm } from "@/presentation/components/features/dictionaries/DeleteForm";
import { slugEncode } from "@/lib/slug-utils";
import { getDictionariesAction, deleteDictionaryAction } from "@/presentation/actions/dictionary-actions";
import { getTranslations } from "next-intl/server";
import FeatureDuck from "@/presentation/components/features/practice/FeatureDuck";

async function ShowDictionaries() {
    const t = await getTranslations("dictionaries");
    const actionResult = await getDictionariesAction()

    if (!actionResult.isSuccess){
        return (
            <div>{t("loadError")}</div>
        )
    }

    if (actionResult.data.length === 0){
        return (
            <>
                <div className="flex flex-col gap-4 py-16 justify-center items-center">
                    <FeatureDuck src="/duck_with_kids.lottie" size={112} />

                    <p className="text-md text-[rgb(103,126,119)]">{t("noDictionariesYet")}</p>

                    <Link href="/add-word" className="bg-[rgba(37,177,95,0.9)] text-white text-sm border-1 border-[rgb(226,229,220)] py-2.5 px-4 rounded-xl">{t("addWord")}</Link>
                </div>
            </>
        )
    }

    return (
        <ul className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full">
            {actionResult.data.map((dictionary, index) => (
                <li className="grid grid-cols-2 animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-6 rounded-xl" key={index}>
                    <Link className="flex flex-col text-black text-lg" href={`/dictionary/${slugEncode(dictionary.title)}`}>
                        {dictionary.title}
                        <span className="text-sm text-[rgb(103,126,119)]">{t("wordCount", {count: dictionary.wordsCount})}</span>
                    </Link>
                    <DeleteForm id={dictionary.id} deleteAction={deleteDictionaryAction} />
                </li>
            ))}
        </ul>
    );
}

export default ShowDictionaries;
