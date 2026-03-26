import {ErrorControllerResult, SuccessControllerResult} from "@/lib/types/controller-result";
import {isAppError} from "@/lib/errors/type-guard";

export function handleActionFailure(message: string = "An error occurred"): ErrorControllerResult {
    return {
        isSuccess: false,
        message
    }
}

export function handleActionSuccess<T = void>(data?: T): SuccessControllerResult<T> {
    if (data === undefined) {
        return {isSuccess: true} as SuccessControllerResult<T>;
    }
    return {
        isSuccess: true,
        data
    } as SuccessControllerResult<T>;
}

export function handleActionError(err: unknown, fallbackMessage = "Unexpected error"): ReturnType<typeof handleActionFailure> {
    if (isAppError(err)) {
        return handleActionFailure(err.message);
    }
    return handleActionFailure(fallbackMessage);
}
