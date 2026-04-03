import { signIn } from "@/auth";
import { CreateUserData } from "@/features/auth/types";
import { trimObject } from "@/lib/string-utils";
import { handleValidation } from "@/core/handleValidation";
import { CreateUserSchema } from "@/features/auth/schemas";

export async function createUser(data: CreateUserData) {
    const trimmedData: CreateUserData = trimObject(data);
    handleValidation(CreateUserSchema, trimmedData);

    const result = await signIn("credentials", {
        ...trimmedData,
        redirect: false, // важно
    });

    return result; // { error, status, ok, url }
}