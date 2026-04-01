import {CreateUserData} from "@/features/auth/types";
import {trimObject} from "@/lib/string-utils";
import {handleValidation} from "@/core/handleValidation";
import {CreateUserSchema} from "@/features/auth/schemas";
import {signIn} from "@/auth";

export async function createUser(data: CreateUserData){
    const trimmedData: CreateUserData = trimObject(data);

    handleValidation(CreateUserSchema, trimmedData);

    await signIn("credentials", {
        ...trimmedData,
        redirect: false,
    })
}