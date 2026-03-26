export function trimObject<T extends Record<string, string | number | boolean | null | undefined>>(data: T): {
    [K in keyof T]: T[K]
} {
    const result = {} as { [K in keyof T]: T[K] }

    for (const key in data) {
        const value = data[key]

        result[key] = typeof value === "string" ? (value.trim() as T[typeof key]) : value
    }

    return result
}