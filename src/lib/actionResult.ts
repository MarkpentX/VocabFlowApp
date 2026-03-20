export type ActionResult = {
    error: boolean,
    message: string,
}

export function handleActionError(message: string = "Error"): ActionResult {
    return {
        error: true,
        message: message,
    }
}

export function handleActionSuccess(message: string): ActionResult {
    return {
        error: false,
        message: message,
    }
}