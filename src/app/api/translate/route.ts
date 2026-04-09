import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { text, target } = await req.json();

    if (!text) {
        return NextResponse.json({ translation: "" });
    }

    try {
        const res = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                text
            )}&langpair=en|${target}`
        );

        const data = await res.json();

        return NextResponse.json({
            translation: data.responseData.translatedText,
        });
    } catch {
        return NextResponse.json({
            translation: "",
        });
    }
}