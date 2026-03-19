export type ActionResult = {
    error: boolean,
    message?: string,
}

export function handleActionError(message: string = "Error"){
    return {
        error: true,
        message: message,
    }
}

export function handleActionSuccess(message?: string){
    return {
        error: false,
        message: message,
    }
}