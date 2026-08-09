export function trimObject<T extends object>(data: T): T {
    const result = { ...data };

    (Object.keys(result) as (keyof T)[]).forEach((key) => {
        const value = result[key];
        if (typeof value === "string") {
            result[key] = value.trim() as T[typeof key];
        }
    });

    return result;
}
