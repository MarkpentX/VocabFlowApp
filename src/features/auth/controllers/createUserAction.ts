'use server'
import {CreateUserData} from "@/features/auth/types";
import {createUser} from "@/features/auth/use-cases/createUser";
import {handleActionError, handleActionSuccess} from "@/lib/actionResult";
import {ControllerResult} from "@/lib/types/controller-result";

export async function createUserAction(data: CreateUserData):Promise<ControllerResult>{
    try {
        const user = await createUser(data)
        console.log(user)
        return handleActionSuccess();
    } catch (error) {
        return handleActionError(error);
    }
}