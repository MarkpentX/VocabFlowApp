import {DbUser} from "@/features/admin/types";
import {ControllerResult} from "@/lib/types/controller-result";
import {getUsers} from "@/features/admin/use-cases/getUsers";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";

export async function getUsersAction(count: number = 50): Promise<ControllerResult<DbUser[]>>{
    try{
        const users = await getUsers(count)
        return handleActionSuccess(users);
    } catch (error) {
        return handleActionError(error);
    }
}