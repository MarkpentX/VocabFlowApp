import {ZodObject, ZodRawShape} from "zod";
import {errors} from "@/lib/errors/factory";

export function handleValidation<T extends ZodRawShape>(schema: ZodObject<T>, data: { [K in keyof T]: unknown }): void {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw errors.validation(result.error.issues[0]?.message ?? "Validation Error")
    }
}