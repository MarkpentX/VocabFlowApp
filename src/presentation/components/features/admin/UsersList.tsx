import React from 'react';
import { getUsersAction } from "@/presentation/actions/admin-actions";
import { getTranslations } from "next-intl/server";

async function UsersList() {
    const t = await getTranslations("admin");
    const users = await getUsersAction()

    if (!users.isSuccess){
        return (
            <div>{t("loadUsersError")}</div>
        )
    }

    return (
        <ul className="flex flex-col gap-2 max-w-2xl mx-auto mt-6">
            {users.data.map((user) => (
                <li key={user.id} className="flex flex-col sm:flex-row sm:justify-between gap-1 bg-white border border-[rgb(226,229,220)] rounded-xl px-4 py-3 text-sm">
                    <span className="truncate">{user.username ?? user.name ?? user.id}</span>
                    <span className="text-[rgb(103,126,119)] truncate">{user.email}</span>
                </li>
            ))}
        </ul>
    );
}

export default UsersList;
