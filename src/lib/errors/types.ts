export enum ActionErrorType {
    VALIDATION_ERROR="VALIDATION_ERROR",
    DB_ERROR="DB_ERROR",
}

export type ActionError = {type: ActionErrorType.VALIDATION_ERROR; message: string} |
    {type: ActionErrorType.DB_ERROR; message: string;}