export function slugEncode(slug: string): string {
    return encodeURIComponent(slug.replaceAll(' ', '-'));
}

export function slugDecode(slug: string): string {
    return decodeURIComponent(slug).replaceAll('-', ' ');
}