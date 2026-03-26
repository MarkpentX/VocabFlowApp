// export type CaseResult<T = unknown> = {
//     error: boolean
//     message?: string
//     data?: T
// }
//
// export function handleCaseError<T = unknown>(message: string = "Error"): CaseResult<T> {
//     return {
//         error: true,
//         message
//     }
// }
//
// export function handleCaseSuccess<T>(data?: T, message?: string): CaseResult<T> {
//     return {
//         error: false,
//         message,
//         data
//     }
// }

export type CaseResultError = {
    error: true
    message: string
}

export type CaseResultSuccess<T> = {
    error: false
    data: T
}

export function handleCaseError(message: string = "Error"): CaseResultError {
    return {
        error: true,
        message
    }
}

export function handleCaseSuccess<T>(data: T): CaseResultSuccess<T> {
    return {
        error: false,
        data
    }
}
