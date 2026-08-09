import { DomainError, DomainErrorType } from "@/domain/errors/types";

export const errors = {
    validation(message = "Invalid schema"): DomainError {
        return { type: DomainErrorType.VALIDATION_ERROR, message };
    },
    db(message = "Database error"): DomainError {
        return { type: DomainErrorType.DB_ERROR, message };
    },
    notFound(message = "Not found"): DomainError {
        return { type: DomainErrorType.NOT_FOUND, message };
    },
    translation(message = "Translation failed"): DomainError {
        return { type: DomainErrorType.TRANSLATION_ERROR, message };
    },
    auth(message = "Not authenticated"): DomainError {
        return { type: DomainErrorType.AUTH_ERROR, message };
    },
};
