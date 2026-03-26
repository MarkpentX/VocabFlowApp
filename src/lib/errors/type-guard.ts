import {ActionError} from "@/lib/errors/types";

export function isAppError(error: unknown): error is ActionError {
    return (
        typeof error === "object" &&
        error !== null &&
        "type" in error &&
        "message" in error
    );
}