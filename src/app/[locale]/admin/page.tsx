import React, { Suspense } from 'react';
import { useTranslations } from "next-intl";
import UsersList from "@/presentation/components/features/admin/UsersList";

function Page() {
    const t = useTranslations("admin");

    return (
        <main className="px-6 py-8">
            <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
            <Suspense fallback={null}>
                <UsersList/>
            </Suspense>
        </main>
    );
}

export default Page;
