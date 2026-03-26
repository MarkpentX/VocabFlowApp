import {ActionError, ActionErrorType} from "@/lib/errors/types";

export const errors = {
    validation(message="Invalid schema"): ActionError {
        return {type: ActionErrorType.VALIDATION_ERROR, message};
    },
    db(message="Database error"): ActionError {
        return {type: ActionErrorType.DB_ERROR, message};
    }
}