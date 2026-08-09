import {
    ErrorControllerResult,
    SuccessControllerResult,
} from "@/application/shared/controller-result";
import { isDomainError } from "@/domain/errors/type-guard";

export function handleActionFailure(
    message: string = "An error occurred"
): ErrorControllerResult {
    return {
        isSuccess: false,
        message,
    };
}

export function handleActionSuccess<T = void>(
    data?: T
): SuccessControllerResult<T> {
    if (data === undefined) {
        return { isSuccess: true } as SuccessControllerResult<T>;
    }
    return {
        isSuccess: true,
        data,
    } as SuccessControllerResult<T>;
}

export function handleActionError(
    err: unknown,
    fallbackMessage = "Unexpected error"
): ReturnType<typeof handleActionFailure> {
    if (isDomainError(err)) {
        return handleActionFailure(err.message);
    }
    return handleActionFailure(fallbackMessage);
}
