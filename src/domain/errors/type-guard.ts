import { DomainError } from "@/domain/errors/types";

export function isDomainError(error: unknown): error is DomainError {
    return (
        typeof error === "object" &&
        error !== null &&
        "type" in error &&
        "message" in error
    );
}
