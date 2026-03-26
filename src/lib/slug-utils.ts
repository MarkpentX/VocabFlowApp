export function slugEncode(slug: string): string {
    return slug.replaceAll(' ', '-');
}

export function slugDecode(slug: string): string {
    return slug.replaceAll('-', ' ');
}