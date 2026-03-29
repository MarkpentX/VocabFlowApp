import React from 'react';
import {getUsersAction} from "@/features/admin/controllers/getUsersAction";

async function UsersList() {
    const users = await getUsersAction()

    if (!users.isSuccess){
        return (
            <div>Error to get users </div>
        )
    }

    return (
        <div>
        </div>
    );
}

export default UsersList;