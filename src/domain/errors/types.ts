export enum DomainErrorType {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    DB_ERROR = "DB_ERROR",
    NOT_FOUND = "NOT_FOUND",
    TRANSLATION_ERROR = "TRANSLATION_ERROR",
    AUTH_ERROR = "AUTH_ERROR",
}

export type DomainError =
    | { type: DomainErrorType.VALIDATION_ERROR; message: string }
    | { type: DomainErrorType.DB_ERROR; message: string }
    | { type: DomainErrorType.NOT_FOUND; message: string }
    | { type: DomainErrorType.TRANSLATION_ERROR; message: string }
    | { type: DomainErrorType.AUTH_ERROR; message: string };
