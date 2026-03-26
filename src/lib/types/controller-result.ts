export type ControllerResult<T = void> =
    | SuccessControllerResult<T>
    | ErrorControllerResult;

export type SuccessControllerResult<T = void> =
    T extends void
        ? { isSuccess: true }
        : { isSuccess: true; data: T };

export type ErrorControllerResult = {
    isSuccess: false;
    message?: string;
};